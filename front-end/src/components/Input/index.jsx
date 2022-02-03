import { React } from 'react';
import PropTypes from 'prop-types';

export default function Input({ type, id, children, onChange }) {
  return (
    <label htmlFor={ id }>
      { children }
      <input type={ type } data-testid={ id } onChange={ onChange } />
    </label>
  );
}

Input.defaultProps = {
  onChange: undefined,
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  children: PropTypes
    .oneOfType([PropTypes
      .arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
