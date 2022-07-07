export type SMSElement = {
  attributes: SMSAttributes;
};
export type SMSAttributes = {
  protocol: number;
  address: number;
  date: number;
  type: 1 | 2;
  subject: string;
  body: string;
  toa: string;
  sc_toa: string;
  service_center: string;
  read: number;
  status: number;
  locked: number;
  date_sent: number;
  sub_id: string;
  readable_date: string;
  contact_name: string;
};

export type SMSBody = {
  text: string;
  imgSrc: null;
};
