const db = require("../models");
const categories = db.categories;
const Op = db.Sequelize.Op;

exports.add = async (req, res) => {
  const { categorie, code } = req.body;
  

  try {
    if (!categorie || !code) {
      return res.status(400).json({
        msg: "Something is Empty",
      });
    }

    const newCategorie = await categories.create({
     categorie: categorie,
      code: code,
    });

    res.status(201).send({
      status: "sucess",
      message: "Categorie created Succesuflly",
      data: { newCategorie },
    });
  } catch (error) {
    res.status(500).send({ message: `something went wrong${error}` });
  }
};
exports.getAllCategories = async (req, res) => {
    try {
      const { id, categorie,code } = req.query;
      const { count, rows } = await categories.findAndCountAll({
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
  
        count: categories,
        data: rows,
  
        message: "List of categories retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "false",
        message: `error retriving List of categories ${error}`,
      });
    }
  };
  exports.getCategorieByid = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await categories.findByPk(id, {
        where: ["categorie","code"],
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
  exports.deleteCategorie= async (req, res) => {
    const id = req.params.id;
  
    try {
      await categories.update(
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
      const categorieDelete = await categories.findByPk(id, {});
      if (categorieDelete) {
        res
          .status(200)
          .send({ message: `categorie with ${id} deleted successuffly ` });
      }
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: `error delete card ${error}`,
      });
    }
  };