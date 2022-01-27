import { React } from 'react';
import PropTypes from 'prop-types';

export default function Input({ type, id, children }) {
  return (
    <label htmlFor={ id }>
      { children }
      <input type={ type } id={ id } />
    </label>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes
    .oneOfType([PropTypes
      .arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
