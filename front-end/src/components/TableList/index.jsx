import React from 'react';
import PropTypes from 'prop-types';

export default function TableList(props) {
  const { screen, index, id, name, price, quantityItens } = props;

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
              `customer_${screen}__element-order-table-item-number-${index}`
            }
          >
            { id }
          </td>
          <td
            data-testid={
              `customer_${screen}__element-order-table-name-${index}`
            }
          >
            { name }
          </td>
          <td
            data-testid={ `customer_${screen}__element-order-table-quantity-${index}` }
          >
            { quantityItens }
          </td>
          <td
            data-testid={
              `customer_${screen}__element-order-table-unit-price-${index}`
            }
          >
            { formatPrice(price) }
          </td>
          <td
            data-testid={
              `customer_${screen}__element-order-table-sub-total-${index}`
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

TableList.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  screen: PropTypes.string.isRequired,
  quantityItens: PropTypes.number.isRequired,
};
