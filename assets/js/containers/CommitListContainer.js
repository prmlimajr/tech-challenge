import React, { useEffect } from 'react';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';

const CommitListContainer = () => {
  useEffect(() => {
    commitAPI.getCommits(1);
  }, []);

  return <CommitList />
}

export default CommitListContainer;
