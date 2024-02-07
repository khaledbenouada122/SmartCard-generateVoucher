const db = require('../../models/index')
const avantage = db.avantage;
const product = db.product
exports.addPromo = async (req, res) => {
  const { purcent, point } = req.body;

  try {
    if (!purcent) {
      return res.status(400).json({
        msg: "Something is Empty",
      });
    }

    const newpromotion = await avantage.create({
      purcent: purcent,
      point: point,
    });

    res.status(201).send({
      status: "true",
      message: "avantage of product  created Succesuflly",
      data: { newpromotion },
    });
  } catch (error) {
    res.status(500).send({ message: `something went wrong${error}` });
  }
};
