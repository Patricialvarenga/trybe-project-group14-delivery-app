import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const mockBag = [{
  id: 1,
  name: 'Cerveja Stella 250ml',
  price: 3.50,
  quantityItens: 4,
}, {
  id: 2,
  name: 'Cerveja Skol 450ml',
  price: 4.50,
  quantityItens: 5,
}, {
  id: 3,
  name: 'Cerveja Kaiser 450ml',
  price: 4,
  quantityItens: 7,
}];
export default function Provider({ children }) {
  const [userData, setUserData] = useState({});
  const [bagItens, setBagItens] = useState(mockBag);
  const [token, setToken] = useState('');
  const [totalPrice, setTotalPrice] = useState();
  const context = {
    userData,
    setUserData,
    bagItens,
    setBagItens,
    token,
    setToken,
    totalPrice,
    setTotalPrice,
  };
  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes
    .oneOfType([PropTypes
      .arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
