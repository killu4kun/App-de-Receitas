import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, dataTestId, name, onChange }) => (
  <input
    type={ type }
    data-testid={ dataTestId }
    name={ name }
    onChange={ onChange }
  />
);

Input.defaultProps = {
  dataTestId: undefined,
  onChange: undefined,
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default Input;
