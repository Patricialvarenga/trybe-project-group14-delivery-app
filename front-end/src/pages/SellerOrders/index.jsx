import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import NavBarSeller from '../../components/NavBarSeller';
import AllOrdersSeller from '../../components/AllOrdersSeller';

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(AppContext);

  const renderOrders = useCallback(
    async () => {
      try {
        const Authorization = 'Authorization';
        axios.defaults.headers.common[Authorization] = token;
        const { data } = await axios.get('http://localhost:3001/sales/');
        setOrders(data);
      } catch (response) {
        console.log(response);
      }
    }, [token],
  );

  useEffect(() => {
    renderOrders();
  }, [renderOrders]);

  return (
    <div>
      <NavBarSeller />
      { orders.length && orders.map((order) => (
        <AllOrdersSeller
          key={ order.id }
          totalValue={ Number(order.totalPrice).toFixed(2).replace('.', ',') }
          date={ order.saleDate }
          status={ order.status }
          id={ order.id }
          number={ order.deliveryNumber }
          street={ order.deliveryAddress }
        />
      ))}
    </div>
  );
}
