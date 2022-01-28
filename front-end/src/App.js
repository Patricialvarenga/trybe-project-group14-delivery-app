import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';

import {
  Admin,
  Products,
  Checkout,
  CustomerDetails,
  CustomerOrdersDetails,
  Login,
  Register,
  SellerOrders,
  SellerOrdersDetails,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/products" element={ <Products /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/admin" element={ <Admin /> } />
        <Route path="/checkout" element={ <Checkout /> } />
        <Route path="/customerdetails" element={ <CustomerDetails /> } />
        <Route path="/customerordersdetails" element={ <CustomerOrdersDetails /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/sellerorders" element={ <SellerOrders /> } />
        <Route path="/sellerordersdetails" element={ <SellerOrdersDetails /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
