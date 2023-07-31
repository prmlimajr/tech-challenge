import React from 'react';
import PropTypes from 'prop-types';

export function CommitCard({ commit }) {
  return (
    <div>
      <div className="avatar">
        {commit.avatar && <img alt={commit.author} className="img-author" src={commit.avatar} />}
      </div>

      <div className="commit-details">
        <p>
          {commit.message}
        </p>
        <small className="text-muted">
          {commit.author}
          {' '}
          authored
          {' '}
          on
          {' '}
          {commit.repository}
          {' '}
          at
          {' '}
          {commit.date}
        </small>
      </div>
    </div>
  )
}

CommitCard.propTypes = {
  commit: PropTypes.object.isRequired,
};
