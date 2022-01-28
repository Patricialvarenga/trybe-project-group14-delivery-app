import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Admin,
  Checkout,
  CustomerDetails,
  CustomerOrders,
  Login,
  Register,
  Seller,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/admin" element={ <Admin /> } />
        <Route path="/checkout" element={ <Checkout /> } />
        <Route path="/customerdetails" element={ <CustomerDetails /> } />
        <Route path="/customerorders" element={ <CustomerOrders /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/seller" element={ <Seller /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
