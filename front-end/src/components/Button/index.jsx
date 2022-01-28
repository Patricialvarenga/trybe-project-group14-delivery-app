import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ id, type, children }) {
  const condition = type === 'button';

  return (
    <button type={ condition ? 'button' : 'submit' } data-testid={ id }>
      {children}
    </button>
  );
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
