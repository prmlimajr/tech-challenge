import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';

const CommitListContainer = () => {
  useEffect(() => {
    commitAPI.getCommits();
  }, []);

  const { commits } = useSelector(state => state.commitState);

  return <CommitList commits={commits} />
}

CommitListContainer.propTypes = {
  commits: PropTypes.object.isRequired,
};

export default CommitListContainer;
