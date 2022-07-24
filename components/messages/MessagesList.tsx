import { List } from "@chakra-ui/react";

import { Messages } from "../../types/message.types";
import { MMSBody } from "../../types/mms.types";
import { SMSBody } from "../../types/sms.types";
import MessageItem from "./MessageItem";

type Props = {
  messages: Messages<SMSBody, MMSBody>;
};

const MessagesList = ({messages}: Props) => {
  return (
    <List spacing={8}>
      {messages.map((message, idx) => (
        <MessageItem
          key={idx}
          author={message.author}
          date={message.date}
          text={message.body.text}
          imgSrc={message.body.imgSrc}
          isLast={idx + 1 === messages.length}
        />
      ))}
    </List>
  );
}

export default MessagesList
