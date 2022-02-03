'use strict';

module.exports = {
  up: async (queryInterface) => {

    const data =  [
      {
        user_id: 3,
        seller_id: 2,
        total_price: 50.60,
        delivery_address: 'Rua Santa Maria - RJ - Rio de Janeiro',
        delivery_number: '305',
        status: 'Em Trânsito',
      },
      {
        user_id: 3,
        seller_id: 2,
        total_price: 2650.90,
        delivery_address: 'Rua Santo André - SP - São Paulo',
        delivery_number: '45',
        status: 'Pendente',
      },
      {
        user_id: 3,
        seller_id: 2,
        total_price: 150.30,
        delivery_address: 'Rua Santa Maria - RJ - Rio de Janeiro',
        delivery_number: '305',
        status: 'Entregue',
      },
      {
        user_id: 3,
        seller_id: 2,
        total_price: 720.30,
        delivery_address: 'Rua do João - SP - São Paulo',
        delivery_number: '2500',
        status: 'Preparando',
      }
    ];
    
    return queryInterface.bulkInsert('sales', data, {});
  },

  down: async (queryInterface) => await queryInterface.bulkDelete('sales', null, {})
     
};
