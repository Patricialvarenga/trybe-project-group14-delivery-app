const { CREATED } = require('http-status-codes').StatusCodes;
const registerByAdm = require('../../../service/users/registerByAdm');

module.exports = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;

    const newAdm = await registerByAdm({ email, password, name, role });

    return res.status(CREATED).json(newAdm);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
