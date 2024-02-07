const db = require("../models");
const roles = db.roles;
const Op = db.Sequelize.Op;

exports.add = async (req, res) => {
  const { role } = req.body;

  try {
    if (!role) {
      return res.status(400).json({ msg: "Something is Empty" });
    }

    const newRole = await roles.create({
      role: role,
    });

    res.status(201).send({
      status: "sucess",
      message: "role created Succesuflly",
      data: { id: newRole.id, role: newRole.role },
    });
  } catch (error) {
    res.status(500).send({ message: `something went wrong${error}` });
  }
};
exports.getAllRoles = async (req, res) => {
  try {
    const { id, role } = req.query;
    const { count, rows } = await roles.findAndCountAll({
      where: {
        [Op.and]: [
          {
            deleted: 0,
          },
        ],
      },
    });
    res.status(201).json({
      status: "true",
      message: "Sucess",

      count: role,
      data: rows,

      message: "List of roles retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: `error retriving List of roles ${error}`,
    });
  }
};
exports.getRolesByid = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await roles.findByPk(id, {
      where: ["role"],
    });
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
