import React from 'react';
import PropTypes from 'prop-types';

export default function TableList(props) {
  const { key, price, quantityItens, name, screen, id } = props;
  return (
    <table>
      <thead>
        <tr>
          <td>Item</td>
          <td>Descrição</td>
          <td>Quantidade</td>
          <td>Valor Unitário</td>
          <td>Sub-total</td>
          <td>Remover Item</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            data-testid={
              `customer_${screen}__element-order-table-item-number-${key}`
            }
          >
            {
              id
            }
          </td>
          <td
            data-testid={
              `customer_${screen}__element-order-table-name-${key}`
            }
          >
            {
              name
            }
          </td>
          <td
            data-testid={ `customer_${screen}__element-order-table-quantity-${key}` }
          >
            {
              quantityItens
            }
          </td>
          <td
            data-testid={
              `customer_${screen}__element-order-table-unit-price-${key}`
            }
          >
            {
              price
            }
          </td>
          <td
            data-testid={
              `customer_${screen}__element-order-table-sub-total-${key}`
            }
          >
            R$:
            {price * quantityItens}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

TableList.propTypes = {
  id: PropTypes.number.isRequired,
  key: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  screen: PropTypes.string.isRequired,
  quantityItens: PropTypes.number.isRequired,
};
