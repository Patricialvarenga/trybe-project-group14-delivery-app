import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function AllOrdersSeller(props) {
  const { id, status, date, totalValue, street, number } = props;

  return (
    <Link to={ `/seller/orders/${id}` }>
      <div>
        <div
          data-testid={ `seller_orders__element-order-id-${id}` }
        >
          { `Pedido: 00${id}` }
        </div>
        <div
          type="button"
          data-testid={ `seller_orders__element-delivery-status-${id}` }
        >
          { status }
        </div>
        <div
          data-testid={ `seller_orders__element-order-date-${id}` }
        >
          { moment(date).format('DD/MM/YYYY') }
        </div>
        <div
          data-testid={ `seller_orders__element-card-price-${id}` }
        >
          { totalValue }
        </div>
        <div
          data-testid={ `seller_orders__element-card-address-${id}` }
        >
          { `Rua: ${street}, N: ${number}` }
        </div>
      </div>
    </Link>
  );
}

AllOrdersSeller.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  totalValue: PropTypes.string.isRequired,
};
