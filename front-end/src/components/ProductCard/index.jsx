import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import context from '../../context/AppContext';

export default function ProductCard({ id, name, price, urlImage }) {
  const { bagItens, setBagItens } = useContext(context);

  const [quantity, setQuantity] = useState(0);
  const priceFormatted = `R$ ${price}`.replace('.', ',');

  const updateItens = (newQuantity) => {
    const bagFiltered = bagItens.filter((item) => item.id !== id);
    if (newQuantity > 0) {
      let newItem;
      const itemFound = bagItens.find((item) => item.id === id);
      if (!itemFound) {
        newItem = { id, name, price, urlImage, quantityItens: newQuantity };
      } else {
        newItem = { ...itemFound, quantityItens: newQuantity };
      }

      setBagItens([...bagFiltered, newItem]);
      setQuantity(newQuantity);
    } else {
      setBagItens(bagFiltered);
      setQuantity(0);
    }
  };

  function incrementQuantity() {
    const newQuantity = quantity + 1;
    updateItens(newQuantity);
  }

  function decrementQuantity() {
    const newQuantity = quantity - 1;
    updateItens(newQuantity);
  }

  return (
    <div>
      <div data-testid={ `customer_products__element-card-price-${id}` }>
        {priceFormatted}
      </div>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <div data-testid={ `customer_products__element-card-title-${id}` }>
        {name}
      </div>

      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        disabled={ quantity <= 0 }
        onClick={ decrementQuantity }
      >
        -
      </button>
      <input
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        onChange={ ({ target: { value } }) => {
          console.log(value);
          const int = parseInt;
          updateItens(int(value));
        } }
        value={ quantity }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ incrementQuantity }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
};
