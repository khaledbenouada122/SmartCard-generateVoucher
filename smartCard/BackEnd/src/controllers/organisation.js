const { getPagination, getPagingData } = require("../helpres/pagination");
const db = require("../models");
const organisation = db.organisation;
const categories = db.categories;
const Op = db.Sequelize.Op;

exports.add = async (req,res) =>{
    const {label,categorieId } = req.body
    try{
        if (!label || ! categorieId) {
            return res.status(400).json({
              msg: "Something is Empty",
            });
          }
          const newOrganisation =  await organisation.create({
                label : label,
    

          })  
          res.status(201).send({
            status: "true",
            message: "Sucess",
            data: {newOrganisation} ,
          });
        } catch (error) {
          res.status(500).json({ message: `Something wont wrong: ${error.message}` });
        }
       

}
exports.getAllorganisations = async (req, res) => {
    const { page, size } = req.query;
  
    const { offset, limit } = getPagination(page, size);
    try {
      const { count, rows } = await organisation.findAndCountAll({
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
            model: categories,
            required: false,
          },
        ],
      });
      const data = getPagingData(page, limit, rows, count);
      res.status(201).json({
        etat: "true",
        status: "Sucess",
        message: "List of organisations retrieved successfully",
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: "false",
        message: `error retriving List of users ${error}`,
      });
    }
  };
  exports.getOrganisationById = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await organisation.findByPk(id, {
      
        include: [
          {
            model: categories,
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
  

  exports.deleteOrganisation = async (req, res) => {
    const id = req.params.id;
  
    try {
      await organisation.update(
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
      const organisationDeleted = await organisation.findByPk(id);
      if (organisationDeleted) {
        res.status(200).json({
          status:"true",
           message: `organisation deleted successuffly ` });
      }
    } catch (error) {
      res.status(500).json({
        status: "false",
        message: `error delete organisation : ${error}`,
      });
    }
  };