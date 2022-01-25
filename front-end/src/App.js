import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
