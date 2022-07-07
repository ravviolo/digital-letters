export type MMSElement = {
  attributes: MMSAttributes;
  parts: {
    part: MMSPart[];
  };
  addrs: {
    addr: MMSAddr[];
  };
};

export type MMSAttributes = {
  date: number;
  snippet: string;
  block_type: number;
  ct_t: string;
  source: string;
  msg_box: 1 | 2;
  address: number;
  sub_cs: string;
  preview_type: number;
  mx_id: string;
  retr_st: string;
  d_tm: string;
  exp: string;
  locked: number;
  m_id: string;
  out_time: number;
  retr_txt: string;
  date_sent: number;
  read: number;
  rpt_a: string;
  ct_cls: string;
  timed: number;
  pri: number;
  sync_state: number;
  resp_txt: string;
  ct_l: string;
  sim_id: number;
  d_rpt: number;
  marker: number;
  file_id: string;
  _id: number;
  preview_data_ts: number;
  m_type: number;
  mx_extension: string;
  rr: number;
  favorite_date: number;
  sub: number;
  read_status: string;
  date_ms_part: number;
  seen: number;
  bind_id: number;
  mx_id_v2: string;
  advanced_seen: number;
  resp_st: string;
  text_only: number;
  need_download: number;
  st: string;
  retr_txt_cs: string;
  m_size: number;
  mx_status: number;
  tr_id: string;
  mx_type: number;
  deleted: number;
  m_cls: string;
  v: number;
  account: number;
  readable_date: string;
  contact_name: string;
};

export type MMSPart = {
  attributes: {
    seq: -1 | 0 | number;
    ct: 'application/smil' | 'text/plain' | 'image/jpeg' | 'image/gif' | string;
    name: string;
    chset: 'null' | string;
    cd: 'null' | string;
    fn: 'null' | string;
    cid: string;
    cl: string;
    ctt_s: 'null' | string;
    ctt_t: 'null' | string;
    text: string | 'null';
    data: string | 'null';
  };
};

type MMSAddr = {
  attributes: {
    address: number;
    type: number;
    charset: number;
  };
};

export type MMSBody = {
  text: string | null;
  imgSrc: string | null;
};
