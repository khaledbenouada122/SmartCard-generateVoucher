const { getPagination, getPagingData } = require("../../helpres/pagination");
const db = require("../../models");
const { isValidId } = require("../../helpres/testById");
const product = db.product;
const ranges = db.range;
const partner = db.partner;
const Op = db.Sequelize.Op;
const range = db.range;
const categories = db.categories;
exports.addProduct = async (req, res) => {
  const {
    label,
    title,
    description,
    size,
    status,
    color,
    quantity,
    photo,
    price,
    promo,
    purcentPromo,
    userId,
    rangeId,
  } = req.body;

  try {
    if (!label || !title || !price) {
      return res.status(400).json({
        msg: "Something is Empty",
      });
    }

    const newProduct = await product.create({
      label: label,
      title: title,
      description: description,
      size: size,
      status: status,
      color: color,
      quantity: quantity,
      photo: photo,
      price: price,
      promo: promo,
      purcentPromo: purcentPromo,
      userId: userId,
      rangeId: rangeId,
    });

    res.status(201).send({
      status: "true",
      message: "product created Succesuflly",
      data: { newProduct },
    });
  } catch (error) {
    res.status(500).send({ message: `something went wrong${error}` });
  }
};
exports.getAllproducts = async (req, res) => {
  const { page, size } = req.query;

  const { offset, limit } = getPagination(page, size);
  try {
    const { count, rows } = await product.findAndCountAll({
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
          model: ranges,
          required: false,
        },
        {
          model: partner,
          required: false,
        },
      ],
    });
    const data = getPagingData(page, limit, rows, count);
    res.status(201).json({
      etat: "true",
      status: "Sucess",
      message: "List of products retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: `error retriving List of products ${error}`,
    });
  }
};
// get products by partner :
exports.getProductByidPartner = async (req, res) => {
  try {
    const userId = req.params.userId;
    const rangeId = req.query.rangeId;

    // Validate IDs
    const existRangeId = await isValidId(range, rangeId);
    const existUserId = await isValidId(partner, userId);

    if (existRangeId) {
      return res.status(400).send({
        status: "false",
        message: "Identifiant de gamme est incorrect",
      });
    }

    if (existUserId) {
      return res.status(400).send({
        status: "false",
        message: "UserID est incorrect",
      });
    }

    // Check for missing parameters
    if (!rangeId || !userId) {
      return res.status(400).send({
        status: "false",
        message: "Some parameters are missing",
      });
    }

    // Retrieve products
    const data = await product.findAndCountAll({
      where: {
        userId: userId,
        rangeId: rangeId,
        deleted: 0,
      },
      include: [
        {
          model: ranges,
          required: false,
        },
        {
          model: partner,
          required: false,
        },
      ],
    });

    if (data.count > 0) {
      return res.status(201).send({
        status: "true",
        message: "Products retrieved successfully",
        data,
      });
    } else {
      return res.status(200).send({
        status: "true",
        message: "List of products is empty",
      });
    }
  } catch (error) {
    console.error(
      `Error in getProduct By idPartner: ${error.message || error}`
    );
    return res.status(500).send({
      status: "false",
      message: `Internal Server Error: ${error.message || error}`,
    });
  }
};

exports.deleteProducts = async (req, res) => {
  const id = req.params.id;

  try {
    await product.update(
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
    const productDeleted = await product.findByPk(id);
    if (productDeleted) {
      res.status(200).json({
        status: "true",
        message: `products deleted successuffly `,
        data: productDeleted,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: `error delete product : ${error}`,
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        staus: "false",
        message: `id is empty`,
      });
    }
    const updateProduct = await product.findOne({
      where: { id: id },
    });

    if (!updateProduct) {
      res.status(400).json({
        status: "false",
        message: "failed when getting product",
      });
    }
    const updating = await updateProduct.update({
      label: req.body.label || updateProduct.label,
      title: req.body.title || updateProduct.title,
      description: req.body.description || updateProduct.description,
      size: req.body.size || updateProduct.size,
      status: req.body.status || updateProduct.status,
      color: req.body.color || updateProduct.color,
      quantity: req.body.quantity || updateProduct.quantity,
      photo: req.body.photo || updateProduct.photo,
      price: req.body.price || updateProduct.price,
      promo: req.body.promo || updateProduct.promo,
      purcentPromo: req.body.purcentPromo || updateProduct.purcentPromo,
    });

    res.status(200).send({
      status: "true",
      message: "product updated successfully",
      updating,
    });
  } catch (error) {
    res.status(500).send({
      status: "false",
      message: "internal Server",
      error: `${error}`,
    });
  }
};
// get product By Id
exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await product.findByPk(id);
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
//  promo for produt and change the status  : status 1 :intialPrice , status 2 :promo
exports.makePromoForProduct = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      res.status(400).send({
        status: "false",
        message: "missing id product",
      });
    } else {
      const updateProduct = await product.findOne({
        where: { id: id },
      });
      //  status 1 :prix intial l, status 2 , with promos
     const updating = await updateProduct.update({
        price: req.body.price || updateProduct.price,
        promo: req.body.promo || updateProduct.promo,
        purcentPromo: req.body.purcentPromo || updateProduct.purcentPromo,
        status: "2",
      });

      res.status(201).send({
        status: "true",
        message: "product updated successfully",
        updating,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "false",
      message: "internal Server",
      error: `${error}`,
    });
  }
};
