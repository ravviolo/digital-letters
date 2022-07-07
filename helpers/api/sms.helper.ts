import { SMSElement } from '../../types/sms.types';

export const normalizeSMSes = (smsElements: SMSElement[]) =>
  smsElements.map((sms) => removeSMSMetadata(sms));

export const removeSMSMetadata = (smsElement: SMSElement) => {
  const { body, date, type } = smsElement.attributes;
  return {
    body: {
      text: body,
      imgSrc: null,
    },
    date,
    type,
  };
};
