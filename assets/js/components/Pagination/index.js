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
    <nav aria-label="..." className='right-aligned'>
      <ul className="pagination">
        <li className={commits.previous ? "page-item" : "page-item disabled"}>
          <span
            className={commits.previous ? "page-link" : "page-link blocked"}
            tabindex="-1"
            onClick={() => commits.previous ? handleSelectPage('prev') : null}
          >
            Previous
          </span>
        </li>

        {pageNumbers.map(pageNumber => {
          return (
            <li key={pageNumber} className={pageNumber == page ? 'page-item active' : 'page-item'}>
              <span
                className='page-link'
                onClick={() => handleSelectPage(pageNumber)}
              >
                {pageNumber}

                {pageNumber == page && <span class="sr-only">(current)</span>}
              </span>
            </li>
          )
        })}

        <li className={commits.next ? "page-item" : "page-item disabled"}>
          <span
            className={commits.next ? "page-link" : "page-link blocked"}
            onClick={() => commits.next ? handleSelectPage('next') : null}
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  )
}
