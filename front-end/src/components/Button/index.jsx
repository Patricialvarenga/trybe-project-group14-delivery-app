import { React } from 'react';
import PropTypes from 'prop-types';

export default function Button({ children, id, disabled, onClick }) {
  return (
    <button
      type="button"
      data-testid={ id }
      disabled={ disabled }
      onClick={ onClick }
    >
      { children }
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
  onClick: undefined,
};

Button.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes
    .oneOfType([PropTypes
      .arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
