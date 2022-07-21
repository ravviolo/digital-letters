import Link from 'next/link';
import { useRef, useState } from 'react';
import { useAuth } from '../hooks/auth/useAuth';
import axios from 'axios';
import { useRouter } from 'next/router';

const Upload = () => {
  const senderRef = useRef<HTMLInputElement>(null);
  const receiverRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter()

  const { user } = useAuth();

  const handleUpload: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (user) {
      const senderName = senderRef.current?.value;
      const receiverName = receiverRef.current?.value;
      const { uid } = user;

      const axiosConfig = {
        headers: { 'content-type': 'multipart/form-data' },
      };
      if (senderName && receiverName && selectedFile) {
        const formData = new FormData();
        formData.append('senderName', senderName);
        formData.append('receiverName', receiverName);
        formData.append('backupFile', selectedFile, selectedFile.name);
        formData.append('uid', uid);

        try {
          setIsUploading(true);
          const { data: docID } = await axios.post(
            '/api/upload',
            formData,
            axiosConfig
          );
            router.push(`/messages/${user.uid}/${docID}?page=1`);
        } catch (err) {
          console.log(err);
        } finally {
          setIsUploading(false);
        }
      }
    }
  };

  return (
    <div>
      <nav>
        <Link href='/'>Home</Link>
      </nav>
      <h1>Upload xml backup file</h1>
      <form onSubmit={handleUpload} encType='multipart/form-data'>
        <div>
          <label htmlFor='sender-name'>Messages from: </label>
          <input
            type='text'
            id='sender-name'
            name='senderNamer'
            ref={senderRef}
          />
        </div>
        <div>
          <label htmlFor='receiver-name'>Messages to: </label>
          <input
            type='text'
            id='receiver-name'
            name='receiverNamer'
            ref={receiverRef}
          />
        </div>
        <div>
          <label htmlFor='backup-file'>Choose xml file: </label>
          <input
            type='file'
            id='backup-file'
            name='backupFile'
            accept='text/xml'
            onChange={(e) =>
              setSelectedFile(e.target.files && e.target.files[0])
            }
          />
        </div>
        <button type='submit' disabled={isUploading}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
