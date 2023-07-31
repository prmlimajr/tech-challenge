import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import * as commitAPI from '../../api/CommitAPI';

export function Pagination() {
  const [pageNumbers, setPageNumbers] = useState([]);

  const { commits } = useSelector(state => state.commitState);
  const { page } = useSelector(state => state.selectedPageState);

  useEffect(() => {
    const total = Math.ceil(commits.count / 10);

    const pages = [];

    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }

    setPageNumbers(pages);
  }, [commits]);

  const handleSelectPage = (target) => {
    if (target === 'prev' && commits.previous) {
      commitAPI.getCommits(page - 1);
    } else if (target === 'next' && commits.next) {
      commitAPI.getCommits(page + 1);
    } else {
      commitAPI.getCommits(target);
    }
  }

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
      <span
        onClick={() => commits.previous ? handleSelectPage('prev') : null}
        className={commits.previous ? 'clickable' : 'blocked'}
      >
        {'<'}
      </span>

      {pageNumbers.map(pageNumber => {
        return (
          <div
            key={pageNumber}
            className={pageNumber == page ? 'page-container-selected' : 'page-container'}
          >
            <span
              onClick={() => handleSelectPage(pageNumber)}
              className={pageNumber == page ? 'page-selected' : 'page'}
            >
              {pageNumber}
            </span>
          </div>
        )
      })}

      <span
        onClick={() => commits.next ? handleSelectPage('next') : null}
        className={commits.next ? 'clickable' : 'blocked'}
      >
        {'>'}
      </span>
    </div>
  )
}
