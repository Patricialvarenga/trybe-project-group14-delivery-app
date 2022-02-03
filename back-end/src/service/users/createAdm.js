const md5 = require('md5');
const { ApiError: { NewError } } = require('../../global/error/apiError');
const { user } = require('../../database/models');
const auth = require('../../global/middlewares/auth');
const { USER__EXIST_409 } = require('../../global/error/messages');

const createAdm = async (infoUser) => {
    const passwordMd5 = md5(infoUser.password);
    const userExist = await user.findOne({
      where: { email: infoUser.email, password: passwordMd5 } });
    if (userExist) return NewError(USER__EXIST_409);
    delete userExist.password;
    const authToken = auth.createToken(userExist);
    return {
      ...userExist.dataValues,
      token: authToken,
    };
  };

  module.exports = createAdm;