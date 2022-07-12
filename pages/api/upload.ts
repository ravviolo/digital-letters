import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import formidable from 'formidable';
import { convertXML, deleteXML, readXML } from '../../helpers/api/xml.helper';
import { formatMessages } from '../../helpers/api/messages.helper';
import { paginateResponse } from '../../helpers/api/http.helper';

interface ResponseData {
  status: string
}
interface FormFields {
  senderName: string;
  receiverName: string;
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
        if (error) return reject({error, filename: backupFile.newFilename, message: 'Something went wrong'});
        const senderName = fields.senderName as string;
        const receiverName = fields.receiverName as string;
        resolve({
          fields: { receiverName, senderName },
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

    return res.status(201).json({ status: 'success' });
  } catch (error:any) {
      deleteXML(error.filename)
      return res.status(500).json({status: error.message})
  }
});

export default router.handler();

export const config = {
  api: {
    bodyParser: false,
  },
};
