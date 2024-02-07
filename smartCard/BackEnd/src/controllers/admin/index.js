const { getPagingData, getPagination } = require("../../helpres/pagination");
const db = require("../../models");
const Op = db.Sequelize.Op;
const admin = db.admin
const roles = db.roles
exports.add = async (req, res) => {
    const { fullname, phone,mail } = req.body;
  
    try {
      if (!fullname || !phone || !mail) {
        return res.status(400).json({
          status: "false",
          message: "somthing is empty",
        });
      }
  
      const newAdmin = await admin.create({
        fullname: fullname,
        phone: phone,
        mail:mail,
        roleId: "a4b9f643-81b6-4f62-8d5e-6a6417dbd068"
      });
  
      res.status(201).send({
        status: "true",
        message: "Sucess",
        data: { newAdmin },
      });
    } catch (error) {
      res.status(500).send({ message: `something went wrong${error}` });
    }
  };
  exports.getAllAdmins = async (req, res) => {
    const { page, size } = req.query;
  
    const { offset, limit } = getPagination(page, size);
    try {
      const { count, rows } = await admin.findAndCountAll({
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
            model: roles,
            required: false,
          },
        ],
      });
      const data = getPagingData(page, limit, rows, count);
      res.status(201).json({
        etat: "true",
        status: "Sucess",
        message: "List of admins  retrieved successfully",
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: "false",
        message: `error retriving List of admins ${error}`,
      });
    }
  };