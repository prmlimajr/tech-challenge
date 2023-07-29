import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as repositoryAPI from '../../api/RepositoryAPI';

class RepositoryList extends Component {
  componentDidMount() {
    repositoryAPI.getRepositories();
  }

  render() {
    const { repositories } = this.props;

    return (
      <ul className='sidebar-nav'>
        {repositories.map(repository => {
          return (
            <li key={repository.id} className='sidebar-brand'>
              <span>{repository.name}</span>
            </li>
          )
        })}
      </ul>
    )
  }
}

RepositoryList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = store => ({
  repositories: store.repositoryState.repositories,
});

export default connect(mapStateToProps)(RepositoryList);
