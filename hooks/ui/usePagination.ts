import { useMemo } from 'react';

export const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = (
  currentPage: number,
  maxPage: number,
  siblingCount = 0
) => {
  const paginationRange = useMemo(() => {
    const totalPagePills = siblingCount + 5;

    if (totalPagePills >= maxPage) {
      return range(1, maxPage);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, maxPage);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < maxPage - 2;

    const firstPageIndex = 1;
    const lastPageIndex = maxPage;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, '...', maxPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(maxPage - rightItemCount + 1, maxPage);
      return [firstPageIndex, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
  }, [currentPage, maxPage, siblingCount]);

  return paginationRange;
};
