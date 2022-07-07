import { NextApiRequest, NextApiResponse } from "next";
import { formatMessages } from "../../helpers/api/messages.helper";
import { convertXML, readXML } from "../../helpers/api/xml.helper";
import { Messages } from "../../types/message.types";
import { MMSBody } from "../../types/mms.types";
import { SMSBody } from "../../types/sms.types";

interface Data {
    messages: Messages<SMSBody, MMSBody>
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

   const xml = readXML('romeo-juliet-messages.xml', false);
   const converted = convertXML(xml);
   const formattedMessages = formatMessages(converted, 'Romeo', 'Julia');

  return res.status(200).json({ messages: formattedMessages });
}
