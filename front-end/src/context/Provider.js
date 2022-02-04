import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function Provider({ children }) {
  const [userData, setUserData] = useState({});
  const [bagItens, setBagItens] = useState([]);
  const [token, setToken] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
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
