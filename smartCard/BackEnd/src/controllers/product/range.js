const { getPagination, getPagingData } = require("../../helpres/pagination");
const db = require("../../models");
const ranges = db.range;
const Op = db.Sequelize.Op;
exports.addRange = async (req, res) => {
  const { range, code } = req.body;

  try {
    if (!range || !code) {
      return res.status(400).json({
        msg: "Something is Empty",
      });
    }

    const newRange = await ranges.create({
      range: range,
      code: code,
    });

    res.status(201).send({
      status: "true",
      message: "range created Succesuflly",
      data: { newRange },
    });
  } catch (error) {
    res.status(500).send({ message: `something went wrong${error}` });
  }
};
exports.getAllRanges = async (req, res) => {
  const { page, size } = req.query;
  const { offset, limit } = getPagination(page, size);
  try {
    const { count, rows } = await ranges.findAndCountAll({
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
      message: "ranges getted Succesuflly",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: `error retriving List of ranges ${error}`,
    });
  }
};
exports.getRangesById = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await ranges.findByPk(id);
      if (data) {
        res.status(201).send({
          status: "true",
          message: "range retrived Sucessulffy",
          data,
        });
      } else {
        res.status(400).send({
          status: "false",
          message: "Bad Request wheb=n getting range",
        });
      }
    } catch (error) {
      res.status(500).send({
        status: false,
        message: error,
      });
    }
  };
  exports.deleteRanges = async (req, res) => {
    const id = req.params.id;
  
    try {
      await ranges.update(
        {
          deleted: 1,
        },
        {
          where: {
            id,
            deleted: 0,
          },
        }
      );
      const rangeDeleted = await ranges.findByPk(id);
      if (rangeDeleted) {
        res.status(200).json({
          status:"true",
           message: `range deleted successuffly `,
           rangeDeleted });
      }
    } catch (error) {
      res.status(500).json({
        status: "false",
        message: `error delete range : ${error}`,
      });
    }
  };