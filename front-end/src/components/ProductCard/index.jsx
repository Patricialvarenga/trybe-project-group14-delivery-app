import React from 'react';

export default function ProductCard() {
  return (
    <div>
      <div data-testid="customer_products__element-card-price-" />
      <img data-testid="customer_products__img-card-bg-image-" src="" alt="" />
      <div data-testid="customer_products__element-card-title-" />

      <button
        data-testid="customer_products__button-card-rm-item-"
        type="button"
      >
        -
      </button>
      <div data-testid="customer_products__input-card-quantity-">0</div>
      <button
        data-testid="customer_products__button-card-add-item-"
        type="button"
      >
        +
      </button>
    </div>
  );
}
