import { React } from 'react';
import PropTypes from 'prop-types';

export default function Button({ children, id }) {
  return <button type="button" data-testid={ id }>{ children }</button>;
}

Button.propTypes = {
  children: PropTypes
    .oneOfType([PropTypes
      .arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  id: PropTypes.string.isRequired,
};
