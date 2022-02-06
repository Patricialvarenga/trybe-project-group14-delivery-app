import React, { useCallback, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
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

  // test de PR
  const navigate = useNavigate();

  const [inputCheckout, setInputCheckout] = useState({
    deliveryAddress: '',
    deliveryNumber: '',
    sellerId: '2',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = {
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        products: [...bagItens],
        ...inputCheckout,
      };
      const Authorization = 'Authorization';
      axios.defaults.headers.common[Authorization] = token;
      const { data: { id } } = await axios.post('http://localhost:3001/sales', data);

      Swal.fire({
        title: 'Pronto! :D',
        html: 'Pedido finalizado com sucesso',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      return navigate(`/customer/orders/${id}`);
    } catch ({ message }) {
      Swal.fire({
        title: 'Error!',
        html: `<p>${message}</p>`,
        icon: 'warning',
        showConfirmButton: false,
        timer: 2000,
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
            onClick={ ({ target }) => setInputCheckout({
              ...inputCheckout, sellerId: target.value,
            }) }
            name="sellerId"
          >
            P.Vendedora Responsável:
            <option value="2">Fulana Pereira</option>

          </select>
          <label htmlFor="deliveryAddress">
            Endereço
            <input
              data-testid="customer_checkout__input-address"
              name="deliveryAddress"
              type="text"
              onChange={ ({ target }) => setInputCheckout({
                ...inputCheckout, deliveryAddress: target.value,
              }) }
            />
          </label>
          <label htmlFor="Número">
            Número
            <input
              data-testid="customer_checkout__input-addressNumber"
              name="deliveryNumber"
              type="text"
              onChange={ ({ target }) => setInputCheckout({
                ...inputCheckout, deliveryNumber: target.value,
              }) }
            />
          </label>
          <button
            data-testid="customer_checkout__button-submit-order"
            disabled={ totalPrice <= 0 }
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
