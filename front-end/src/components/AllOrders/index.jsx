import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function AllOrders(props) {
  const { id, status, date, totalValue, screen } = props;

  return (
    <Link to={ `/customer/orders/${id}` }>
      <div>
        <div
          data-testid={ `customer_${screen}__element-order-id-${id}` }
        >
          { `Pedido: 00${id}` }
        </div>
        <div
          type="button"
          data-testid={ `customer_${screen}__element-delivery-status-${id}` }
        >
          { status }
        </div>
        <div
          data-testid={ `customer_${screen}__element-order-date-${id}` }
        >
          { moment(date).format('DD/MM/YYYY') }
        </div>
        <div
          data-testid={ `customer_${screen}__element-card-price-${id}` }
        >
          { totalValue }
        </div>
      </div>
    </Link>
  );
}

AllOrders.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  screen: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  totalValue: PropTypes.number.isRequired,
};
