import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function Provider({ children }) {
  const [userData, setUserData] = useState({});
  const [bagItems, setBagItems] = useState([]);
  const [token, setToken] = useState('');
  const context = {
    userData,
    setUserData,
    bagItems,
    setBagItems,
    token,
    setToken,
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
