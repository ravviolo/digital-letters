import { PAGINATION_LIMIT } from '../../constants';
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
  page = 1
) => {
  const paginatedResponse = {} as PaginatedResponse<typeof messages>;

  const maxPage = Math.ceil(messages.length / PAGINATION_LIMIT);
  const startIndex = (page - 1) * PAGINATION_LIMIT;
  const endIndex = page * PAGINATION_LIMIT;
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

