import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  const { children } = props;
  return (
    <button type="button" { ...props }>
      { children }
    </button>
  );
}

Button.propTypes = {
  children: PropTypes
    .objectOf(PropTypes.any)
    .isRequired,
};
