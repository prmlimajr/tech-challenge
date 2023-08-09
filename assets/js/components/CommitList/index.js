import React from 'react';
import { CommitCard } from '../CommitCard';
import { useSelector } from 'react-redux';
import { EmptyList } from '../EmptyList';

const CommitList = () => {
  const { commits } = useSelector(state => state.commitState);

  return (
    <div>

        <div>
          <div className="card card-outline-secondary my-4">
            <div className="card-header">
              Commit List
            </div>

            <div className="card-body">
              {commits.results.length !== 0 ? (
                commits.results.map((commit, index) => (
                  <React.Fragment>
                    <CommitCard key={index} commit={commit} />

                    {index !== commits.length - 1 && <hr />}
                  </React.Fragment>
                ))
              ) : (
                <EmptyList />
              )}
            </div>
          </div>
        </div>

    </div>
  );
};

export default CommitList;
