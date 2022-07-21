import { Messages } from '../../types/message.types';
import { MMSBody } from '../../types/mms.types';
import { SMSBody } from '../../types/sms.types';

export type PaginatedResponse<MessagesType> = {
  next: {
    page: number;
  };
  previous: {
    page: number;
  };
  messages: MessagesType;
  maxPage: number;
};

export const paginateResponse = (
  messages: Messages<SMSBody, MMSBody>,
  paginationLimit: number,
  page = 1
) => {
  const paginatedResponse = {} as PaginatedResponse<typeof messages>;

  const maxPage = Math.ceil(messages.length / paginationLimit);
  const startIndex = (page - 1) * paginationLimit;
  const endIndex = page * paginationLimit;
  const paginatedMessages = messages.slice(startIndex, endIndex);

  if (startIndex > 0) {
    paginatedResponse.previous = {
      page: page - 1,
    };
  }
  if (endIndex < messages.length) {
    paginatedResponse.next = {
      page: page + 1,
    };
  }

  paginatedResponse.messages = paginatedMessages;
  paginatedResponse.maxPage = maxPage;

  return paginatedResponse;
};

