import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions/ActionTypes';

const renderField = ({
  input, placeholder, className, type, meta: {touched, error, invalid},
}) => (
    <div>
      <input
        {...input}
        placeholder={placeholder}
        className={`${className} ${touched && invalid ? 'is-invalid' : ''}`}
        type={type}
      />
      {touched
        && ((error && (
          <div className="invalid-feedback">
            {error}
          </div>
        )))
      }
    </div>
  );

renderField.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

const RepoCreateForm = (props) => {
  const {
    successMessage, errorMessage, handleSubmit, pristine, submitting,
  } = props;

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.repositoryState);

  const handleCloseMessage = () => {
    dispatch({ type: types.CLOSE_MESSAGE});
  }

  return (
    <div>
      {successMessage
        && (
          <div className="alert alert-success spaced" role="alert">
            {successMessage}

            <span onClick={() => handleCloseMessage()} className='clickable'>close</span>
          </div>
        )}

      {errorMessage
        && (
          <div className="alert alert-danger spaced" role="alert">
            {errorMessage}

            <span onClick={() => handleCloseMessage()} className='clickable'>close</span>
          </div>
        )}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-10">
            <Field
              name="name"
              placeholder="Enter the repository name, must match {user}/{repo}"
              className="form-control"
              component={renderField}
              type="text"
            />
          </div>
          <div className="col-2">
            <button disabled={pristine || submitting || loading} className="btn btn-block btn-primary" type="submit">
              {loading ? 'Loading' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

RepoCreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired
};

const validate = (values) => {
  const {username} = document.getElementById('main').dataset;
  const errors = {};
  if (!values.name || !values.name.startsWith(`${username}/`)) {
    errors.name = `Repository must belong to you (eg: ${username}/repo-name)`;
  }
  return errors;
};

export default reduxForm({
  form: 'repoCreate',
  validate,
})(RepoCreateForm);
