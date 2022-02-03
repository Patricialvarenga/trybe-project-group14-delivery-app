const { ApiError: { NewError } } = require('../../global/error/apiError');
const { user } = require('../../database/models');
const { USER_NOT_EXIST_404 } = require('../../global/error/messages');

const findAllSellers = async () => {
  const usersExist = await user.findAll({ where: { role: 'seller' } });
  if (!usersExist) return NewError(USER_NOT_EXIST_404);

  const users = usersExist.map(({ name, email, role }) => ({ name, email, role }));

  return users;
};

module.exports = { findAllSellers };