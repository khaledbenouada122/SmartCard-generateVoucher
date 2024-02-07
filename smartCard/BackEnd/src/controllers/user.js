const db = require("../models");
const {
  getPagination,
  getPagingData,
} = require("../../src/helpres/pagination");
const user = db.user;
const organisation = db.organisation;
const role = db.roles;
const Op = db.Sequelize.Op;
exports.add = async (req, res) => {
  const { firstName, surName, age, organisationId } = req.body;

  try {
    if (!firstName || !surName || !age || !organisationId) {
      return res.status(400).json({
        status: "false",
        message: "Something is Empty",
      });
    }
    const newUser = await user.create({
      firstName: firstName,
      surName: surName,
      age: age,
      organisationId: organisationId,
      roleId: "d15464eb-2a09-42d6-9493-c89f50a29ff2",
    });
    res.status(201).send({
      status: "true",
      message: "Sucess",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: `Something wont wrong: ${error.message}` });
  }
};
exports.getAllUseres = async (req, res) => {
  const { data, page, size, firstName, available } = req.query;
  // const conditionName = firstName ? { firstName: { [Op.eq]: firstName } } : null;
  const { offset, limit } = getPagination(page, size);
  try {
    const { count, rows } = await user.findAndCountAll({
      where: {
        [Op.and]: [
          {
            deleted: 0,
          },
        ],
      },
      limit,
      offset,
      include: [
        {
          model: organisation,
          required: false,
          //   where: { deleted: 0,code: '10' }
        },

        {
          model: role,

          attribute: ["role"],
        },
      ],
    });
    const data = getPagingData(page, limit, rows, count);
    res.status(201).json({
      etat: "true",
      status: "Sucess",
      message: "List of users retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: `error retriving List of users ${error}`,
    });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await user.findByPk(id, {
      where: user,
      include: [
        {
          model: organisation,
          required: false,
          //   where: { deleted: 0,code: '10' }
        },

        {
          model: role,

          attribute: ["role"],
        },
      ],
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
exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await user.update(
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
    const userDelete = await user.findByPk(id);
    if (userDelete) {
      res.status(200).send({ message: `user deleted successuffly ` });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `error delete user : ${error}`,
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        staus: "false",
        message: `id is empty`,
      });
    }
    const updateUser = await user.findOne({
      where: { id: id },
    });

    if (!updateUser) {
      res.status(400).json({
        status: "false",
        message: "failed when getting user",
      });
    }
    const updating = await updateUser.update(
        {
          firstName: req.body.firstName || updateUser.firstName,
          surName: req.body.surName || updateUser.surName,
          age:req.body.age || updateUser.age
        },
      );
      
    res.status(200).send({
      status: "true",
      message: "user updated successfully",
      updating,
    });
  } catch (error) {
    res.status(500).send({
      status: "false",
      message: "internal Server",
      error : `${error}`
    });
  }
};
