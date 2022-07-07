import Link from 'next/link';
import React, { useState } from 'react';

type Props = {
  maxPage: number;
  baseHref: string;
};

const PageInput = ({ baseHref, maxPage }: Props) => {
  const [page, setPage] = useState('');
  const [inputError, setInputError] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputError('');
    const pageNum = parseInt(e.target.value);
    if (pageNum < 1) {
      setInputError('Page must be at least 1');
      setPage('1');
      return;
    }
    if (pageNum > maxPage) {
      setInputError(`Page must be smaller than ${maxPage}`);

      setPage(`${maxPage}`);
      return;
    }

    setPage(e.target.value);
  };

  return (
    <form>
      <input
        type='number'
        min={1}
        max={maxPage}
        value={page}
        onChange={handleChange}
      />
      <Link href={`${baseHref}${page}`}>
        <button type='submit' onClick={() => setInputError('')}>
          Go to page
        </button>
      </Link>
      {inputError && <span style={{ color: 'red' }}>{inputError}</span>}
    </form>
  );
};

export default PageInput;
