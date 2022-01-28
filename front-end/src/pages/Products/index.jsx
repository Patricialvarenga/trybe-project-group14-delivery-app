import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import ProductCard from '../../components/ProductCard';

export default function Products({ total }) {
  const totalFormatted = `R$ ${total}`.replace('.', ',');
  const label = `Ver Carrinho ${totalFormatted}`;

  const [products, setProducts] = useState([]);

  function getDrinks() {
    api.get('http://localhost:3000', token)
      .then((data) => setProducts(data))
      .catch(console.err);
  }

  function generateProductCards() {
    return (
      products.map(({ title, price, image }, key) => {
        const props = { title, price, image };
        return <ProductCard key={ key } { ...props } />;
      })
    );
  }

  useEffect(() => {
    getDrinks();
  }, []);

  if (products.length <= 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div>
        { generateProductCards() }
      </div>
      <Button id="customer_products__checkout-bottom-value">
        { label }
      </Button>
    </div>
  );
}

Products.propTypes = {
  total: PropTypes.number.isRequired,
};
