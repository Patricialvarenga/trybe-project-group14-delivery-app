import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';

import context from '../../context/AppContext';

import NavBar from '../../components/NavBar';
import Button from '../../components/Button';
import ProductCard from '../../components/ProductCard';

export default function Products() {
  const { token, bagItens, setTotalPrice, totalPrice } = useContext(context);

  const [products, setProducts] = useState([]);

  function getDrinks() {
    const config = { headers: { authorization: token } };

    axios
      .get('http://localhost:3001/products', config)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch(console.err);
  }

  function generateProductCards() {
    return products.map(({ id, name, price, urlImage }) => {
      const props = { id, name, price, urlImage };
      return <ProductCard key={ id } { ...props } />;
    });
  }

  const allPrice = useCallback(async () => {
    if (bagItens.length <= 0) {
      return setTotalPrice(0);
    }
    try {
      const calcTotal = [];
      bagItens.map(({ price, quantityItens }) => {
        const calc = price * quantityItens;
        return calcTotal.push(calc);
      });
      const reducer = calcTotal.reduce((acc, cur) => acc + cur);
      setTotalPrice(reducer);
    } catch (error) {
      console.log(error);
    }
  }, [bagItens, setTotalPrice]);

  useEffect(() => {
    allPrice();
  }, [allPrice]);

  useEffect(getDrinks, [token]);

  if (products.length <= 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <NavBar />
      <div>{generateProductCards()}</div>
      <Button
        type="button"
        disabled={ totalPrice <= 0 }
        id="customer_products__checkout-bottom-value"
      >
        {`Ver Carrinho R$ ${totalPrice.toFixed(2)}`}
      </Button>
    </div>
  );
}
