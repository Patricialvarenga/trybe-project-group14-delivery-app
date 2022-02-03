import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  Admin,
  Checkout,
  CustomerDetails,
  Drinks,
  Login,
  Register,
  SellerOrders,
  SellerOrdersDetails,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/admin" element={ <Admin /> } />
        <Route path="/customer/products" element={ <Drinks /> } />
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
