import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';

import Dashboard from '../../../components/dashboard/Dashboard';
import {
  PaginatedResponse,
  paginateResponse,
} from '../../../helpers/api/http.helper';
import { formatMessages } from '../../../helpers/api/messages.helper';
import { convertXML, readXML } from '../../../helpers/api/xml.helper';
import { range } from '../../../hooks/ui/usePagination';
import { Messages } from '../../../types/message.types';
import { MMSBody } from '../../../types/mms.types';
import { SMSBody } from '../../../types/sms.types';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ExampleMessages: NextPage<Props> = ({ messages, maxPage }) => {

  const router = useRouter();
  const page = router.query.page ? parseInt(router.query.page as string) : undefined;
  const baseHref = router.asPath.replace(/\d+$/gm, '')

  return (
    <Dashboard baseHref={baseHref} maxPage={maxPage} messages={messages} page={page ?? 1}/>
  );

};

export default ExampleMessages;

type PageProps = PaginatedResponse<Messages<SMSBody, MMSBody>>;
type ContextParams = { page: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const xml = readXML('romeo-juliet-messages.xml', false);
  const converted = convertXML(xml);
  const formattedMessages = formatMessages(converted, 'Romeo', 'Juliet', true);
  const { maxPage } = paginateResponse(formattedMessages, 10);

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
    const formattedMessages = formatMessages(converted, 'Romeo', 'Juliet', true);
    const response = paginateResponse(formattedMessages,10, parseInt(page));

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

