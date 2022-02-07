import React from 'react';
import PropTypes from 'prop-types';

export default function TableListSaller(props) {
  const { index, id, name, price, quantityItens } = props;

  function formatPrice(number) {
    let result = number;
    if (typeof number === 'number') {
      result = number.toFixed(2);
    }

    return result.replace('.', ',');
  }

  return (
    <table>
      <thead>
        <tr>
          <td>Item</td>
          <td>Descrição</td>
          <td>Quantidade</td>
          <td>Valor Unitário</td>
          <td>Sub-total</td>
          {/* { (screen === 'checkout') && <td>Remover Item</td> } */}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            data-testid={
              `seller_order_details__element-order-table-item-number-${index}`
            }
          >
            { id }
          </td>
          <td
            data-testid={
              `seller_order_details__element-order-table-name-${index}`
            }
          >
            { name }
          </td>
          <td
            data-testid={ `seller_order_details__element-order-table-quantity-${index}` }
          >
            { quantityItens }
          </td>
          <td
            data-testid={
              `seller_order_details__element-order-table-unit-price-${index}`
            }
          >
            { formatPrice(price) }
          </td>
          <td
            data-testid={
              `seller_order_details__element-order-table-sub-total-${index}`
            }
          >
            R$:
            { formatPrice(price * quantityItens) }
          </td>
        </tr>
      </tbody>
    </table>
  );
}

TableListSaller.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantityItens: PropTypes.number.isRequired,
};
