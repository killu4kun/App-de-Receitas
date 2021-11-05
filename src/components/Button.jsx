import React from 'react';
import PropTypes from 'prop-types';

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

Button.defaultProps = {
	dataTestId: undefined,
	text: undefined,
};

Button.propTypes = {
	dataTestId: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	text: PropTypes.string,
};

export default Button;
