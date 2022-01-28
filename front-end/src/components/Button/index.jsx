import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ id, children }) {
  return (
    <button type="submit" data-testid={ id }>
      {children}
    </button>
  );
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
