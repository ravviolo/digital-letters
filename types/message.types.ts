export type Message<MessageBody> = {
  author: string;
  date: string;
  body: MessageBody;
};

export type Messages<TBody, UBody> = (Message<TBody> | Message<UBody>)[];

export type NormalizedMessage<MessageBody> = {
  body: MessageBody;
  date: number;
  type: 1 | 2;
};

export type MessageWithAuthor<MessageBody> = Omit<
  NormalizedMessage<MessageBody>,
  'type'
> & {
  author: string;
};

export type NormalizedMessages<TBody, UBody> = (
  | NormalizedMessage<TBody>
  | NormalizedMessage<UBody>
)[];
