import React from 'react';
import PropTypes from 'prop-types';

<<<<<<< HEAD
const Button = ({ dataTestId, onClick, text }) => {
	return (
		<button
			onClick={ onClick }
			data-testis={ dataTestId }
      type="button"
		>
			{text}
		</button>
	);
}
=======
const Button = ({ dataTestId, onClick, text, disabled }) => (
  <button
    onClick={ onClick }
    data-testid={ dataTestId }
    type="button"
    disabled={ disabled }
  >
    {text}
  </button>
);
>>>>>>> 82f101f555f6a53fc924268a086a1d3a5792efc2

Button.defaultProps = {
  dataTestId: undefined,
  text: undefined,
  disabled: false,
};

Button.propTypes = {
  dataTestId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
