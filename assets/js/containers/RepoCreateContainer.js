import React from 'react';
import PropTypes from 'prop-types';
import {connect, useSelector} from 'react-redux';
import * as repositoryAPI from '../api/RepositoryAPI';
import Form from '../components/RepoCreateForm';

const RepoCreateContainer = () => {
  const submit = (values, dispatch) => {
    const token = document.getElementById('main').dataset.csrftoken;
    const name = values.name.split('/')[1];
    const v = {...values, name};
    return repositoryAPI.createRepository(v, {'X-CSRFToken': token}, dispatch);
  };

  const { successMessage } = useSelector(state => state.repositoryState);

  return <Form onSubmit={submit} successMessage={successMessage} />
}

RepoCreateContainer.propTypes = {
  successMessage: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
  successMessage: store.repositoryState.successMessage
});

export default connect(mapStateToProps)(RepoCreateContainer);
