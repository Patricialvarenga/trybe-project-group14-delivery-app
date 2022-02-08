import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBarSeller from '../../components/NavBarSeller';
import AppContext from '../../context/AppContext';
import TableListSaller from '../../components/TableListSaller';

export default function CustomerOrdersDetails() {
  const [order, setOrder] = useState({
    status: '',
    products: [],
    seller: {
      id: 0,
      name: '',
      email: '',
      role: '',
    },
  });
  const { token } = useContext(AppContext);
  const { id } = useParams();
  console.log(order.status);
  const renderOrder = useCallback(
    async () => {
      try {
        const Authorization = 'Authorization';
        axios.defaults.headers.common[Authorization] = token;
        const { data } = await axios.get(`http://localhost:3001/sales/details/${id}`);
        const newValue = Number(data.totalPrice).toFixed(2).replace('.', ',');
        console.log(data);
        setOrder({ ...data,
          status: data.status,
          products: [...data.products],
          seller: {
            ...data.seller,
          },
          totalPrice: newValue,
        });
      } catch (response) {
        console.log(response);
      }
    }, [id, token],
  );

  const dataTes = 'seller_order_details__element-order-details-label-delivery-status';

  useEffect(() => {
    renderOrder();
  }, [renderOrder]);

  return (
    <div>
      <NavBarSeller />
      <div>
        <p
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          { `Pedido: ${order.id}` }
        </p>
        <p
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          { `${moment(order.saleDate).format('DD/MM/YYYY')}` }
        </p>
        <p
          data-testid={ dataTes }
        >
          { `${order.status}` }
        </p>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
        >
          Preparar pedido
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          disabled={ order.status !== 'Preparando' }
        >
          Saiu para entrega
        </button>
      </div>
      {
        order.products.map((item, index) => (
          <div key={ index }>
            <TableListSaller
              index={ index }
              id={ item.id }
              name={ item.name }
              price={ item.price }
              quantityItens={ item.salesProduct.quantity }
            />
          </div>
        ))
      }
      <div
        type="button"
        data-testid="seller_order_details__element-order-total-price"
      >
        { order.totalPrice }
      </div>
    </div>
  );
}
