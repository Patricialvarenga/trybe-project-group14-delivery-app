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
    adress: '',
    number: '',
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
        ...inputCheckout,
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
          <select>
            P.Vendedora Responsável:
            <option value="2">Faluna Pereira</option>
          </select>
          <label htmlFor="adress">
            Endereço
            <input
              name="adress"
              type="text"
              value={ inputCheckout.adress }
              onClick={ ({ target }) => setInputCheckout({
                ...inputCheckout, adress: target.value }) }
            />
          </label>
          <label htmlFor="Número">
            Número
            <input
              name="number"
              type="text"
              value={ inputCheckout.number }
              onClick={ ({ target }) => setInputCheckout({
                ...inputCheckout, number: target.value }) }
            />
          </label>
          <button type="submit">Finalizar o pedido</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
