import React, { useEffect } from 'react';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';

const CommitListContainer = () => {
  useEffect(() => {
    commitAPI.getCommits();
  }, []);

  return <CommitList />
}

export default CommitListContainer;
