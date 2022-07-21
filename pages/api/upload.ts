import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import formidable from 'formidable';
import { convertXML, deleteXML, readXML } from '../../helpers/api/xml.helper';
import { formatMessages } from '../../helpers/api/messages.helper';
import { paginateResponse } from '../../helpers/api/http.helper';
import {
  addMessagesDataDoc,
  addMessagesDoc,
} from '../../helpers/firebase/firestore';
import { firestore } from '../../lib/firebase/firebaseApp';

interface ResponseData {
  // status: string;
}
interface FormFields {
  senderName: string;
  receiverName: string;
  uid: string;
}

const router = createRouter<NextApiRequest, NextApiResponse<ResponseData>>();

router.post(async (req, res) => {

  try {
    const { fields, backupFile } = await new Promise<{
      fields: FormFields;
      backupFile: formidable.File;
    }>((resolve, reject) => {
      const form = formidable({
        uploadDir: './data/uploads/temp',
        keepExtensions: true,
      });

      form.parse(req, (error, fields, files) => {
        if (error)
          return reject({
            error,
            filename: backupFile.newFilename,
            message: 'Something went wrong',
          });
        const senderName = fields.senderName as string;
        const receiverName = fields.receiverName as string;
        const uid = fields.uid as string;
        resolve({
          fields: { receiverName, senderName, uid },
          backupFile: files.backupFile as formidable.File,
        });
      });
    });

    const xml = readXML(backupFile.newFilename, true);
    deleteXML(backupFile.newFilename);
    const converted = convertXML(xml);
    const formattedMessages = formatMessages(
      converted,
      fields.senderName,
      fields.receiverName
    );

    const { maxPage } = paginateResponse(formattedMessages, 70);
    const title = `${fields.senderName}-${fields.receiverName}`;
    try {
      const docID = await addMessagesDoc(firestore, title, maxPage, fields.uid);

      let page = 1;
      while (page <= maxPage) {
        const { messages } = paginateResponse(formattedMessages, 70, page);
        try {
          await addMessagesDataDoc(firestore, docID, page, messages);

        } catch(err) {
          console.log(err)
        }
        page++;
      }
      return res.status(201).json(docID);
    } catch(error) {
      console.log(error)
      return res.json('Could not write data to database.')
    }



  } catch (error: any) {
    deleteXML(error.filename);
    return res.status(500).json(error.message);
  }
});

export default router.handler();

export const config = {
  api: {
    bodyParser: false,
  },
};
