import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({ key, title, price, image }) {
  const [setQuantity, quantity] = useState(0);
  const priceFormatted = `R$ ${price}`.replace('.', ',');

  function incrementQuantity() {
    setQuantity(quantity + 1);
  }

  function decrementQuantity() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <div>
      <div data-testid={ `customer_products__element-card-price-${key}` }>
        { priceFormatted }
      </div>
      <img
        data-testid={ `customer_products__img-card-bg-image-${key}` }
        src={ image }
        alt={ title }
      />
      <div data-testid={ `customer_products__element-card-title-${key}` }>{title}</div>

      <button
        data-testid={ `customer_products__button-card-rm-item-${key}` }
        type="button"
        onClick={ decrementQuantity }
      >
        -
      </button>
      <div data-testid={ `customer_products__input-card-quantity-${key}` }>
        { quantity }
      </div>
      <button
        data-testid={ `customer_products__button-card-add-item-${key}` }
        type="button"
        onClick={ incrementQuantity }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  key: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};
