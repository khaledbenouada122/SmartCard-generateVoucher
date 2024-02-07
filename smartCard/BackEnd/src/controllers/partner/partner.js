const { getPagination, getPagingData } = require("../../helpres/pagination");
const db = require("../../models");
const Op = db.Sequelize.Op;
const partner = db.partner;
const family = db.family;
const role = db.roles;
exports.add = async (req, res) => {
  const { company, phone, familyId } = req.body;

  try {
    if (!company || !phone || !familyId) {
      return res.status(400).json({
        staus: "false",
        message: "Something is Empty",
        
      });
    }

    const newParnter = await partner.create({
      company: company,
      phone: phone,
      familyId: familyId,
      roleId: "1053cd0e-1a3f-4de3-8bda-3b358e9cc10e",
    });

    res.status(201).send({
      status: "true",
      message: "sucess",
      data: { newParnter },
    });
  } catch (error) {
    res.status(500).send({ message: `something went wrong${error}` });
  }
};
exports.getAllPartner = async (req, res) => {
  const { page, size } = req.query;
  const { offset, limit } = getPagination(page, size);
  try {
    const { count, rows } = await partner.findAndCountAll({
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
          model: role,
          required: false,
          //   where: { deleted: 0,code: '10' }
        },

        {
          model: family,
          required: false,
        },
      ],
    });
    const data = getPagingData(page, limit, rows, count);
    res.status(201).json({
      status: "true",
      message: "Sucess",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: `Failed ${error}`,
    });
  }
};
exports.getPartnerById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await partner.findByPk(id, {
      include: [
        {
          model: family,
          required: false,
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
exports.deletePartner = async (req, res) => {
  const id = req.params.id;

  try {
    await partner.update(
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
    const partnerDelete = await partner.findByPk(id, {});
    if (partnerDelete) {
      res.status(200).send({ status: "true", message: "Sucess" });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `error delete partner ${error}`,
    });
  }
};
exports.updatePartner = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        staus: "false",
        message: `id is empty`,
      });
    }
    const updatePartners = await partner.findOne({
      where: { id: id },
    });

    if (!updatePartners) {
      res.status(400).json({
        status: "false",
        message: "failed when getting partner",
      });
    }
    const updating = await updatePartners.update(
        {
          company: req.body.company || updatePartners.company,
          phone: req.body.phone || updatePartners.phone,
        },
      );
      
    res.status(200).send({
      status: "true",
      message: "partner updated successfully",
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
