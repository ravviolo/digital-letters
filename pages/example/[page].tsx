import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PageInput from '../../components/pagination/PageInput';
import Pagination from '../../components/pagination/Pagination';
import {
  PaginatedResponse,
  paginateResponse,
} from '../../helpers/api/http.helper';
import { formatMessages } from '../../helpers/api/messages.helper';
import { convertXML, readXML } from '../../helpers/api/xml.helper';
import { range } from '../../hooks/usePagination';
import { Messages } from '../../types/message.types';
import { MMSBody } from '../../types/mms.types';
import { SMSBody } from '../../types/sms.types';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ExampleMessages: NextPage<Props> = ({ messages, maxPage }) => {

  const router = useRouter();
  const page = router.query.page ? parseInt(router.query.page as string) : undefined;
  const baseHref = router.asPath.replace(/\d$/gm, '')

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
        <PageInput
          maxPage={maxPage}
          baseHref={baseHref}
        />
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

export default ExampleMessages;

type PageProps = PaginatedResponse<Messages<SMSBody, MMSBody>>;
type ContextParams = { page: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const xml = readXML('romeo-juliet-messages.xml', false);
  const converted = convertXML(xml);
  const formattedMessages = formatMessages(converted, 'Romeo', 'Juliet');
  const { maxPage } = paginateResponse(formattedMessages);

  const pages = range(1, maxPage);

  return {
    paths: pages.map((page) => ({ params: { page: String(page) } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, ContextParams> = async (
  context
) => {
  const page = context.params?.page;

  if (page) {
    const xml = readXML('romeo-juliet-messages.xml', false);
    const converted = convertXML(xml);
    const formattedMessages = formatMessages(converted, 'Romeo', 'Juliet');
    const response = paginateResponse(formattedMessages, parseInt(page));

    return {
      props: {
        ...response,
      },
    };
  }
  return {
    notFound: true,
  };
};
