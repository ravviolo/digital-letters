import {
  addDoc,
  collection,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore';
import { Messages } from '../../../types/message.types';
import { MMSBody } from '../../../types/mms.types';
import { SMSBody } from '../../../types/sms.types';

// Main collection reference
export const getRootCollection = (firestore: Firestore) =>
  collection(firestore, 'root');
export const getMessagesDataCollection = (
  firestore: Firestore,
  docID: string
) => collection(firestore, 'root', docID, 'messages_data');

// Write to db
export const addMessagesDoc = async (
  firestore: Firestore,
  title: string,
  maxPage: number,
  uid: string
) => {
  const docRef = await addDoc(getRootCollection(firestore), {
    title: title,
    maxPage: maxPage,
    users: [uid],
  });

  return docRef.id;
};

export const addMessagesDataDoc = async (
  firestore: Firestore,
  docID: string,
  page: number,
  messages: Messages<SMSBody, MMSBody>
) =>
  await addDoc(getMessagesDataCollection(firestore, docID), {
    page,
    messages,
  });

// Read from db
export const queryByPage = (
  firestore: Firestore,
  docID: string,
  page: number
) => {
  return query(
    getMessagesDataCollection(firestore, docID),
    where('page', '==', page)
  );
};

export const getMessagesByPage = async (
  firestore: Firestore,
  docID: string,
  page: number
) => {
  return await getDocs(queryByPage(firestore, docID, page));
};

export const getMessagesInfoDoc = async (
  firestore: Firestore,
  docID: string
) => {
  const infoDocRef = doc(firestore, 'root', docID);
  const infoDocSnap = await getDoc(infoDocRef);
  const messagesInfo = infoDocSnap.data();

  if (messagesInfo) {
    const { maxPage, title, users } = messagesInfo;
    return { maxPage, title, users };
  }
  return null;
};

