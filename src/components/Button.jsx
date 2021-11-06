import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ dataTestId, onClick, text, disabled }) => {
	return (
		<button
			onClick={ onClick }
			data-testid={ dataTestId }
			type="button"
			disabled={ disabled }
		>
			{text}
		</button>
	);
}

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
