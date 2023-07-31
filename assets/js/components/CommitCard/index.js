import React from 'react';
import PropTypes from 'prop-types';

export function CommitCard({ commit }) {
  const getNameInitials = () => {
    return `${commit.author.split(' ')[0].charAt(0)}${commit.author.split(' ')[1].charAt(0)}`
  }

  return (
    <div>
      <div className="avatar">
        {commit.avatar ? (
          <img
            alt={commit.author}
            className="img-author"
            src={commit.avatar}
          />
        ) : (
          <div className='missing-avatar'>
            <span>{getNameInitials()}</span>
          </div>
        )}
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
