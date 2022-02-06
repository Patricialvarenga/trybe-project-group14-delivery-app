import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function AllOrders(props) {
  const { id, status, date, totalValue } = props;
  const ids = {
    pedido: 'customer_orders__element-order-id-',
    status: 'customer_orders__element-delivery-status-',
    date: 'customer_orders__element-order-date-',
  };

  return (
    <div>
      <p
        data-testid={ `${ids.pedido}${id}` }
      >
        { `Pedido: 00${id}` }
      </p>
      <button
        type="button"
        onClick={ () => navigate(`/customer/orders/${id}`) }
        data-testid={ `${ids.status}${id}` }
      >
        { status }
      </button>
      <p
        date-testid={ `${ids.date}${id}` }
      >
        { moment(date).locale('pt-br').format('L') }
      </p>
      <p>{ totalValue }</p>
    </div>
  );
}

AllOrders.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  totalValue: PropTypes.number.isRequired,
};
