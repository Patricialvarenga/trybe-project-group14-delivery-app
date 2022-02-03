import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  Admin,
  Checkout,
  CustomerOrders,
  Drinks,
  Login,
  Register,
  Seller,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/admin/manage" element={ <Admin /> } />
        <Route path="/customer/products" element={ <Drinks /> } />
        <Route path="/checkout" element={ <Checkout /> } />
        <Route path="/customerorders" element={ <CustomerOrders /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/seller" element={ <Seller /> } />
        <Route path="/checkout" element={ <Checkout /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
