import React from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import AppContext from '../../context/AppContext';
import TableList from '../../components/TableList';

function Checkout() {
  const {
    bagItens,
    setBagItens,
    setTotalPrice,
    totalPrice,
    token,
  } = useContext(AppContext);

  const [inputCheckout, setInputCheckout] = useState({
    deliveryAddress: '',
    deliveryNumber: '',
    sallerId: '',
  });

  const handleRemoveItem = (id) => {
    const removeItem = bagItens.filter((item) => item.id !== id);
    return setBagItens(removeItem);
  };

  const handleSubmit = async (e) => {
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
  };

  const allPrice = useCallback(
    async () => {
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
    }, [bagItens, setTotalPrice],
  );

  useEffect(() => {
    allPrice();
  }, [allPrice]);

  return (
    <div>
      <NavBar user="Amanda" />
      <div>
        <h3>Finalizar pedido</h3>
        {
          bagItens.map((item, key) => (
            <div key={ key }>
              <TableList
                id={ item.id }
                screen="checkout"
                name={ item.name }
                key={ key }
                quantityItens={ item.quantityItens }
                price={ item.price }
              />
              <button
                data-testid={ `customer_checkout__element-order-table-remove-${key}` }
                type="button"
                onClick={ () => handleRemoveItem(item.id) }
              >
                Remover
              </button>
            </div>
          ))
        }
        <div data-testid="customer_checkout__element-order-total-price">
          { `Total: R$ ${totalPrice}` }
        </div>
      </div>
      <h3>Detalhes e Endereço para Entrega</h3>
      <div>
        <form action="POST" onSubmit={ (e) => handleSubmit(e) }>
          <select
            onChange={ ({ target }) => setInputCheckout({
              ...inputCheckout,
              sallerId: target.value,
            }) }
          >
            P.Vendedora Responsável:
            <option value="2">Faluna Pereira</option>
          </select>
          <label htmlFor="deliveryAddress">
            Endereço
            <input
              name="deliveryAddress"
              type="text"
              value={ inputCheckout.deliveryAddress }
              onClick={ ({ target }) => setInputCheckout({
                ...inputCheckout, deliveryAddress: target.value }) }
            />
          </label>
          <label htmlFor="Número">
            Número
            <input
              name="deliveryNumber"
              type="text"
              value={ inputCheckout.deliveryNumber }
              onClick={ ({ target }) => setInputCheckout({
                ...inputCheckout, deliveryNumber: target.value }) }
            />
          </label>
          <button type="submit">Finalizar o pedido</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
