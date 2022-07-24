import { MMSElement, MMSPart } from '../../types/mms.types';

export const normalizeMMSes = (
  mmsElements: MMSElement[],
  withImages: boolean
) =>
  mmsElements.map((mms) => {
    const { date, type } = getRootMMSInfo(mms);
    const MMSBody = getMMSPartData(mms, withImages);
    return {
      date,
      type,
      ...MMSBody,
    };
  });

const getRootMMSInfo = (rawMMS: MMSElement) => {
  const { date, msg_box } = rawMMS.attributes;
  return {
    date,
    type: msg_box,
  };
};

const getMMSPartData = (rawMMS: MMSElement, withImages: boolean) => {
  const {
    parts: { part },
  } = rawMMS;

  const text = getMMSText(part);

  // todo: Images stored as base64 strings are so long that Firestore complains about reaching maximum document size when writing to Firestore database. Consider creating custom database. For now images sent as MMS will be displayed only on the example page, for uploading user's backup file there will be no images, only text that was sent as MMS.

  let imgSrc: string | null = null;

  if (withImages) {
    imgSrc = getMMSImage(part);
  }
  
  return {
    body: {
      text,
      imgSrc,
    },
  };
};

const getMMSText = (MMSPartElements: MMSPart[]) => {
  const MMSTextElement = MMSPartElements.find(
    (partElement) => partElement.attributes.ct === 'text/plain'
  );
  if (MMSTextElement) {
    return MMSTextElement.attributes.text;
  }
  return null;
};

const getMMSImage = (MMSPartElements: MMSPart[]) => {
  const MMSImageElement = MMSPartElements.find(
    (partElement) => partElement.attributes.ct === 'image/jpeg'
  );
  if (MMSImageElement && MMSImageElement.attributes.data) {
    return getImageSrc(
      MMSImageElement.attributes.data,
      MMSImageElement.attributes.ct
    );
  }
  return null;
};

const getImageSrc = (dataEncodedBase64: string, dataType = 'image/jpeg') =>
  `data:${dataType};base64,${dataEncodedBase64}`;
