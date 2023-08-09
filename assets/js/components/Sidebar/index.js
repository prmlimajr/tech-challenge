import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRepositories } from '../../api/RepositoryAPI';
import { getCommits } from '../../api/CommitAPI';

const Sidebar = () => {
  const { repositories } = useSelector((state) => state.repositoryState)

  useEffect(() => {
    getRepositories();
  }, []);

  const handleResetFilters = () => {
    getCommits(1);
  }

  const handleFilter = (repository) => {
    getCommits(1, { repository });
  }

  return (
    <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
            <li className="sidebar-brand">
                <Link to="/" onClick={() => handleResetFilters()}>
                    Github Monitor
                </Link>
            </li>

            {repositories.map((repository, index) => {
              return (
                <li key={index} className='sidebar-brand'>
                  <Link to='/' onClick={() => handleFilter(repository.name)}>
                    {repository.name}
                  </Link>
                </li>
              )
            })}
        </ul>
    </div>
  )
}

export default Sidebar;
