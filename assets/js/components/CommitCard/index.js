import React from 'react';
import PropTypes from 'prop-types';
import { getCommits } from '../../api/CommitAPI';

export function CommitCard({ commit }) {
  const getNameInitials = () => {
    return `${commit.author.split(' ')[0].charAt(0)}${commit.author.split(' ')[1].charAt(0)}`
  }

  const handleClick = (type, filter) => {
    switch (type) {
      case 'author':
        getCommits(1, { author: filter });
        break;

      case 'repository':
        getCommits(1, { repository: filter });
        break;

      default:
        getCommits(1);
    }
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
        <small className="text-muted" onClick={() => handleClick('author', commit.author)}>
          {commit.author}
          {' '}
          authored
          {' '}
          on
          {' '}
          <span onClick={() => handleClick('repository', commit.repository)}>
            {commit.repository}
          </span>
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
