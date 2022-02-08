const { Op } = require('sequelize');
const md5 = require('md5');
const { ApiError: { NewError } } = require('../../global/error/apiError');
const { user } = require('../../database/models');
const auth = require('../../global/middlewares/auth');
const { USER__EXIST_409 } = require('../../global/error/messages');

const register = async (infoUser) => {
  const userExist = await user.findOne({
    where: { [Op.or]: [{ email: infoUser.email }, { name: infoUser.name }] } });

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

module.exports = register;