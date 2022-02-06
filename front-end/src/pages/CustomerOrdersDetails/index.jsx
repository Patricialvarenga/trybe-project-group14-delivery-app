import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavBar from '../../components/NavBar';
import AppContext from '../../context/AppContext';
import TableList from '../../components/TableList';

export default function CustomerOrdersDetails() {
  const [order, setOrder] = useState([]);
  console.log('state aqui', order);
  const { token } = useContext(AppContext);
  const { id } = useParams();
  const renderOrder = useCallback(
    async () => {
      try {
        const Authorization = 'Authorization';
        axios.defaults.headers.common[Authorization] = token;
        const data = await axios.get(`http://localhost:3001/sales/details/${id}`);
        setOrder(data.data);
      } catch (response) {
        console.log(response);
        Swal.fire(response);
      }
    }, [id, token],
  );

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
          { `Pedido 0${order.id}` }
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          { `P.Vend: ${order.seller.name}` }
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          { `${order.seller.name}` }
        </p>
        <p
          data-testid={ `
          customer_order_details__element-order-details-label-delivery-status` }
        >
          { `${moment(order.saleDate, 'DD/MM/YYYY')}` }
        </p>
        <p>{ `${order.status}` }</p>
        <button type="button">Marcar com entregue</button>
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
      <h3
        data-testid={ `
        customer_order_details__element-order-total-price-${order.id}` }
      >
        { order.totalPrice }
      </h3>
    </div>
  );
}
