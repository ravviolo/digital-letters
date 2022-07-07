import {
  Messages,
  MessageWithAuthor,
  NormalizedMessage,
  NormalizedMessages,
} from '../../types/message.types';
import { MMSBody } from '../../types/mms.types';
import { SMSBody } from '../../types/sms.types';
import { XMLConverted } from '../../types/xml.types';
import { normalizeMMSes } from './mms.helper';
import { normalizeSMSes } from './sms.helper';

export const formatMessages = (
  xmlData: XMLConverted,
  senderName: string,
  receiverName: string
): Messages<SMSBody, MMSBody> => {
  const rawSMSes = xmlData.smses.sms;
  const rawMMSes = xmlData.smses.mms;

  const normalizedSMSes = normalizeSMSes(rawSMSes);
  const normalizedMMSes = normalizeMMSes(rawMMSes);

  const normalizedMessages: NormalizedMessages<SMSBody, MMSBody> = [
    ...normalizedSMSes,
    ...normalizedMMSes,
  ];

  const withAuthors = setAuthors(normalizedMessages, senderName, receiverName);

  const sortedByDate = sortByDate(withAuthors);
  const withFormattedDate = sortedByDate.map((message) => {
    const { date, ...rest } = message;
    return {
      ...rest,
      date: formatDate(date, 'en-EN'),
    };
  });
  return withFormattedDate;
};

export const setAuthor = <MessageBody>(
  normalizedMessage: NormalizedMessage<MessageBody>,
  sender: string,
  receiver: string
): MessageWithAuthor<MessageBody> => {
  const { type, ...rest } = normalizedMessage;
  const author = type === 1 ? receiver : sender;
  /* Message type: 1 - message was received, 2 - message was sent */

  return { author, ...rest };
};

const setAuthors = (
  messages: NormalizedMessages<SMSBody, MMSBody>,
  senderName: string,
  receiverName: string
) =>
  messages.map((message) =>
    setAuthor<typeof message.body>(message, senderName, receiverName)
  );

export const formatDate = (milliseconds: number, locales: string) => {
  const date = new Date(milliseconds);

  const parseOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    minute: 'numeric',
    hour: 'numeric',
  };
  return date.toLocaleString(locales, parseOptions);
};

const sortByDate = (messages: MessageWithAuthor<SMSBody | MMSBody>[]) =>
  [...messages].sort(
    (currentMessage, nextMessage) => currentMessage.date - nextMessage.date
  );
