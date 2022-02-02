const md5 = require('md5');
const { ApiError: { NewError } } = require('../../global/error/apiError');
const { user } = require('../../database/models');
const auth = require('../../global/middlewares/auth');
const { USER_NOT_EXIST_404 } = require('../../global/error/messages');

const login = async (infoLogin) => {
  const passwordMd5 = md5(infoLogin.password);
  const userExist = await user.findOne({
    where: { email: infoLogin.email, password: passwordMd5 } });
  if (!userExist) return NewError(USER_NOT_EXIST_404);
  delete userExist.password;
  const authToken = auth.createToken(userExist);
  return {
    ...userExist.dataValues,
    token: authToken,
  };
};

module.exports = login;