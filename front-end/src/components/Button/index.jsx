import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ id, type, children, disabled, onClick }) {
  const condition = type === 'button';

  return (
    <button
      type={ condition ? 'button' : 'submit' }
      data-testid={ id }
      disabled={ disabled }
      onClick={ onClick }
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
  onClick: undefined,
};

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
