const md5 = require('md5');
const { ApiError: { NewError } } = require('../../global/error/apiError');
const { user } = require('../../database/models');
const auth = require('../../global/middlewares/auth');
const { EMAIL_EXIST_409 } = require('../../global/error/messages');

const register = async (inforRegister) => {
  const userExist = await user.findOne({ where: { email: inforRegister.email } });
  if (userExist) return NewError(EMAIL_EXIST_409);
  const passwordMd5 = md5(inforRegister.password);
  const newUser = { ...inforRegister, password: passwordMd5 };
  const { dataValues } = await user.create(newUser);
  delete dataValues.password;

  return auth.createToken(dataValues);
};

module.exports = register;