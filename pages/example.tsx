import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Messages } from '../types/message.types';
import { MMSBody } from '../types/mms.types';
import { SMSBody } from '../types/sms.types';

const ExampleMessages: NextPage = () => {
  const [messages, setMessages] = useState<null | Messages<SMSBody, MMSBody>>(
    null
  );

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/example');
      const data = await response.json();
      setMessages(data.messages);
    })();
  }, []);

  return (
    <main>
      <h1>Example Messages</h1>
      <div>
        <Link href='/'>Home</Link>
      </div>

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

export default ExampleMessages;
