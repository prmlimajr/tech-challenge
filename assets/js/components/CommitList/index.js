import React from 'react';
import { CommitCard } from '../CommitCard';
import { useSelector } from 'react-redux';

const CommitList = () => {
  const { commits } = useSelector(state => state.commitState);
console.log({ commits })
  return (
    <div>
      {commits.results.length !== 0 && (
        <div>
          <div className="card card-outline-secondary my-4">
            <div className="card-header">
              Commit List
            </div>

            <div className="card-body">
              {commits.results.map((commit, index) => (
                <React.Fragment>
                  <CommitCard key={index} commit={commit} />

                  {index !== commits.length - 1 && <hr />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommitList;
