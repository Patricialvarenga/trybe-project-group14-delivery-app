import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import TableList from '../../components/TableList';
import NavBar from '../../components/NavBar';

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
  const renderOrder = useCallback(
    async () => {
      try {
        const Authorization = 'Authorization';
        axios.defaults.headers.common[Authorization] = token;
        const { data } = await axios.get(`http://localhost:3001/sales/details/${id}`);
        const newValue = Number(data.totalPrice).toFixed(2).replace('.', ',');
        console.log(data);
        setOrder({ ...data,
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

  const dataTes = 'customer_order_details__element-order-details-label-delivery-status';

  useEffect(() => {
    renderOrder();
  }, [renderOrder]);

  return (
    <div>
      <NavBar />
      <div>
        <p
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          { `Pedido: ${order.id}` }
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          { `P.Vend: ${order.seller.name}` }
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-order-date"
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
          disabled={ order.status !== 'Preparando' }
          data-testid="customer_order_details__button-delivery-check"
        >
          Marcar com entregue
        </button>
      </div>
      {
        order.products.map((item, index) => (
          <div key={ index }>
            <TableList
              screen="order_details"
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
        data-testid="customer_order_details__element-order-total-price"
      >
        { order.totalPrice }
      </div>
    </div>
  );
}
