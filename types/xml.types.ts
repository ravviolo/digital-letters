import { SMSElement } from './sms.types';
import { MMSElement } from './mms.types';

export type XMLConverted = {
  _declaration: {
    attributes: {
      version: number;
      encoding: 'UTF-8';
      standalone: string;
    };
  };
  _comment: string[];
  smses: {
    attributes: {
      count: number;
      backup_set: string;
      backup_date: number;
      type: string;
    };
    sms: SMSElement[];
    mms: MMSElement[];
  };
};
