import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import AppContext from '../../context/AppContext';
import AllOrders from '../../components/AllOrders';

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
      <NavBar />
      { orders.length && orders.map((order) => (
        <AllOrders
          key={ order.id }
          totalValue={ Number(order.totalPrice).toFixed(2).replace('.', ',') }
          date={ order.saleDate }
          status={ order.status }
          screen="orders"
          id={ order.id }
        />
      ))}
    </div>
  );
}
