const { CREATED } = require('http-status-codes').StatusCodes;
const service = require('../../../service/users/createAdm');

module.exports = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;
    const newAdm = await service.createAdm({ email, password, name, role });
    return res.status(CREATED).json(newAdm);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
