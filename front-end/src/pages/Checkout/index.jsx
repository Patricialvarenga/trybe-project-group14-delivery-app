import React, { useCallback, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import AppContext from '../../context/AppContext';
import TableList from '../../components/TableList';

function Checkout() {
  const {
    token,
    bagItens,
    setBagItens,
    totalPrice,
    setTotalPrice,
  } = useContext(AppContext);

  const [inputCheckout, setInputCheckout] = useState({
    deliveryAddress: '',
    deliveryNumber: '',
    sellerId: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const Authorization = 'Authorization';
      axios.defaults.headers.common[Authorization] = token;
      await axios.post('http://localhost:3000/sales', {
        products: [...inputCheckout],
        totalPrice,
      });
      Swal.fire({
        title: 'Pronto! :D',
        html: 'Pedido finalizado com sucesso',
        icon: 'sucess',
        showConfirmButton: false,
        timer: 1500,
      });
      return <Navigate to="/order-details" />;
    } catch ({ message }) {
      Swal.fire({
        title: 'Error!',
        html: `<p>${message}</p>`,
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  function handleRemoveItem(id) {
    const removeItem = bagItens.filter((item) => item.id !== id);

    if (removeItem.length <= 0) {
      setTotalPrice(0);
    }

    return setBagItens(removeItem);
  }

  function handleChange({ target }) {
    const { name, value } = target;

    setInputCheckout({
      ...inputCheckout,
      [name]: value,
    });
  }

  const allPrice = useCallback(async () => {
    try {
      const calcTotal = [];
      bagItens.map(({ price, quantityItens }) => {
        const calc = price * quantityItens;
        return calcTotal.push(calc);
      });
      const reducer = calcTotal.reduce((acc, cur) => acc + cur);
      setTotalPrice(reducer);
    } catch (error) {
      console.log(error);
    }
  }, [bagItens, setTotalPrice]);

  useEffect(() => {
    allPrice();
  }, [allPrice]);

  return (
    <div>
      <NavBar />
      <div>
        <h3>Finalizar pedido</h3>
        {bagItens.map((item, index) => (
          <div key={ item.id }>
            <TableList
              screen="checkout"
              index={ index }
              id={ index + 1 }
              name={ item.name }
              price={ item.price }
              quantityItens={ item.quantityItens }
            />
            <button
              data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              onClick={ () => handleRemoveItem(item.id) }
              type="button"
            >
              Remover
            </button>
          </div>
        ))}
        <div data-testid="customer_checkout__element-order-total-price">
          { totalPrice.toFixed(2).replace('.', ',') }
        </div>
      </div>
      <h3>Detalhes e Endereço para Entrega</h3>
      <div>
        <form action="POST" onSubmit={ (e) => handleSubmit(e) }>
          <select
            data-testid="customer_checkout__select-seller"
            onChange={ handleChange }
          >
            P.Vendedora Responsável:
            <option value="1">Elias Forte</option>
          </select>
          <label htmlFor="deliveryAddress">
            Endereço
            <input
              data-testid="customer_checkout__input-address"
              name="deliveryAddress"
              type="text"
              onClick={ handleChange }
            />
          </label>
          <label htmlFor="Número">
            Número
            <input
              data-testid="customer_checkout__input-addressNumber"
              name="deliveryNumber"
              type="text"
              onClick={ handleChange }
            />
          </label>
          <button
            data-testid="customer_checkout__button-submit-order"
            type="submit"
          >
            Finalizar o pedido
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
