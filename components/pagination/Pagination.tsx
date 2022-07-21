import Link from 'next/link';
import { usePagination } from '../../hooks/usePagination';

type Props = {
  currentPage: number;
  maxPage: number;
  baseHref: string;
};

const Pagination = ({ currentPage, maxPage, baseHref }: Props) => {
  const siblingCount = 0;
  const paginationRange = usePagination(currentPage, maxPage, siblingCount);

  const nextHref = `${baseHref}${currentPage === maxPage ? maxPage : currentPage + 1}`
  const prevHref = `${baseHref}${currentPage === 1 ? 1 : currentPage - 1}`

  return (
    <div>
      <Link href={prevHref}>
        <a style={currentPage === 1 ? disabledStyle : {}}>Prev</a>
      </Link>
      {paginationRange?.map((page, idx) => {
        if (page === '...') return <span key={idx}>{page}</span>;
        return (
          <Link href={`${baseHref}${page}`} passHref key={idx}>
            <a style={page === currentPage ? activePageStyle : {}}>{page}</a>
          </Link>
        );
      })}
      <Link href={nextHref}>
        <a style={currentPage === maxPage ? disabledStyle : {}}>Next</a>
      </Link>
    </div>
  );
};

const activePageStyle = {
  color: 'orange',
};
const disabledStyle = {
  cursor: 'not-allowed',
};

export default Pagination;
