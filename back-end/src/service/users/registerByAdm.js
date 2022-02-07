const md5 = require('md5');
const { ApiError: { NewError } } = require('../../global/error/apiError');
const { user } = require('../../database/models');
const auth = require('../../global/middlewares/auth');
const { USER__EXIST_409 } = require('../../global/error/messages');

const registerByAdm = async (infoUser) => {
  const userExist = await user.findOne({ where: { email: infoUser.email } });
    if (userExist) return NewError(USER__EXIST_409);
    const passwordMd5 = md5(infoUser.password);
    const newUser = { ...infoUser, password: passwordMd5 };
    const { dataValues } = await user.create(newUser);
    delete dataValues.password;
    const authToken = auth.createToken(dataValues);

    return {
      ...dataValues,
      token: authToken,
    };
  };

  module.exports = registerByAdm;