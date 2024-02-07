const { getPagination, getPagingData } = require("../../helpres/pagination");
const db = require("../../models");
const Op = db.Sequelize.Op;
const familys = db.family;
// add family of partner
exports.add = async (req, res) => {
  const { family, code } = req.body;

  try {
    if (!family || !code) {
      return res.status(400).json({
        status: "true",
        msg: "Sucess",
      });
    }

    const newFamily = await familys.create({
      family: family,
      code: code,
    });

    res.status(201).send({
      status: "true",
      message: "Sucess",
      data: { newFamily },
    });
  } catch (error) {
    res.status(500).send({ message: `something went wrong${error}` });
  }
};
exports.getAllfamilies = async (req, res) => {
    const { page, size } = req.query;
    const { offset, limit } = getPagination(page, size);
    try {
      const { count, rows } = await familys.findAndCountAll({
        where: {
          [Op.and]: [
            {   
              deleted: 0,
            },
          ],
        },
        limit,
        offset,
      });
      const data = getPagingData(page, limit, rows, count);
      res.status(201).json({
        status: "true",
        message: "sucess",
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: "false",
        message: `error retriving List of users ${error}`,
      });
    }
  };
  exports.getFamilyById = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await familys.findByPk(id);
      if (data) {
        res.status(201).send({
          status: "true",
          message: "Sucess",
          data,
        });
      } else {
        res.status(400).send({
          status: "false",
          message: "failed",
        });
      }
    } catch (error) {
      res.status(500).send({
        status: false,
        message: error,
      });
    }
  };