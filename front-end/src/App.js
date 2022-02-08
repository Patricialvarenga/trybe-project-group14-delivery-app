import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  Admin,
  Checkout,
  CustomerOrdersDetails,
  Products,
  Login,
  Register,
  SellerOrders,
  SellerOrdersDetails,
} from './pages';
import CustomerOrders from './pages/CustomerOrders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/admin/manage" element={ <Admin /> } />
        <Route path="/customer/products" element={ <Products /> } />
        <Route path="/customer/checkout" element={ <Checkout /> } />
        <Route path="/seller/orders" element={ <SellerOrders /> } />
        <Route path="/seller/orders/:id" element={ <SellerOrdersDetails /> } />
        <Route path="/customer/orders/" element={ <CustomerOrders /> } />
        <Route
          path="/customer/orders/:id"
          element={
            <CustomerOrdersDetails />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
