import {
  Box,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { Messages } from "../../types/message.types";
import { MMSBody } from "../../types/mms.types";
import { SMSBody } from "../../types/sms.types";
import MessagesList from '../messages/MessagesList';
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

type Props = {
  messages: Messages<SMSBody, MMSBody> | null;
  maxPage: number;
  page: number | null;
  baseHref: string;
};

const Dashboard = ({messages, maxPage, page, baseHref}: Props) => {
  const sidebar = useDisclosure();

  return (
    <Box
      as='section'
      bg={useColorModeValue('gray.50', 'gray.700')}
      minH='100vh'
    >
      <Sidebar sidebar={sidebar} />
      <Box>
        <Navbar
          baseHref={baseHref}
          maxPage={maxPage}
          currentPage={page}
          openSidebar={sidebar.onOpen}
        />
      </Box>
      <Box as='main' pt={20} pb={8} px={{ base: 6, lg: 8 }}>
        {messages && <MessagesList messages={messages} />}
      </Box>
    </Box>
  );
}

export default Dashboard
