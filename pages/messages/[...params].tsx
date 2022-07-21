import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PageInput from '../../components/pagination/PageInput';
import Pagination from '../../components/pagination/Pagination';
import {
  getMessagesByPage,
  getMessagesInfoDoc,
} from '../../helpers/firebase/firestore';
import { firestore } from '../../lib/firebase/firebaseApp';
import { Messages } from '../../types/message.types';
import { MMSBody } from '../../types/mms.types';
import { SMSBody } from '../../types/sms.types';

const Dashboard: NextPage = () => {
  const [maxPage, setMaxPage] = useState(0);
  const [messages, setMessages] = useState<null | Messages<SMSBody, MMSBody>>(
    null
  );

  const router = useRouter();
  const uid = router.query.params && (router.query.params[0] ?? null);
  const messagesID = router.query.params && (router.query.params[1] ?? null);
  const page = router.query.page ? parseInt(router.query.page as string) : null;

  const baseHref = router.asPath.replace(/\d+$/gm, '');
  console.log(baseHref)

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

  return (
    <main>
      <h1>Example Messages</h1>
      <div>
        <Link href='/'>Home</Link>
      </div>
      <nav>
        <Pagination
          maxPage={maxPage}
          currentPage={page || 1}
          baseHref={baseHref}
        />
        <PageInput maxPage={maxPage} baseHref={baseHref} />
      </nav>

      <ul>
        {messages?.map((message, idx) => (
          <div key={idx}>
            <h5>{message.author}</h5>
            <span>{message.date}</span>
            {message.body.text && <div>{message.body.text}</div>}
            {message.body.imgSrc && (
              <Image
                src={message.body.imgSrc}
                alt=''
                height={400}
                width={300}
              />
            )}
          </div>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
