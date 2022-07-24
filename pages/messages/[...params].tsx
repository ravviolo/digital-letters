import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  getMessagesByPage,
  getMessagesInfoDoc,
} from '../../helpers/firebase/firestore';
import { firestore } from '../../lib/firebase/firebaseApp';
import { Messages } from '../../types/message.types';
import { MMSBody } from '../../types/mms.types';
import { SMSBody } from '../../types/sms.types';
import Dashboard from '../../components/dashboard/Dashboard';


const UserMessages: NextPage = () => {
  const [maxPage, setMaxPage] = useState(0);
  const [messages, setMessages] = useState<null | Messages<SMSBody, MMSBody>>(
    null
  );

  const router = useRouter();
  const uid = router.query.params && (router.query.params[0] ?? null);
  const messagesID = router.query.params && (router.query.params[1] ?? null);
  const page = router.query.page ? parseInt(router.query.page as string) : null;

  const baseHref = router.asPath.replace(/\d+$/gm, '');

  useEffect(() => {
    (async () => {
      if (messagesID) {
        const messagesInfoDoc = await getMessagesInfoDoc(firestore, messagesID);
        if (messagesInfoDoc) {
          setMaxPage(messagesInfoDoc.maxPage);
        }
      }
    })();
  }, [messagesID]);

  useEffect(() => {
    (async () => {
      if (messagesID && page) {
        const querySnapshot = await getMessagesByPage(
          firestore,
          messagesID,
          page
        );
        const { messages } = querySnapshot.docs[0].data();
        setMessages(messages);
      }
    })();
  }, [messagesID, page]);

 /* todo: 
      - Display list of messages to which user has access
      - Show link to upload when there's no messages
      - Show loading skeleton when fetching
  */

  return <Dashboard messages={messages} baseHref={baseHref} maxPage={maxPage} page={page} />;
};

export default UserMessages;
