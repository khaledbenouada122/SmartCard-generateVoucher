const { generateCouponCode } = require("../../helpres/genrateCode");
const db = require("../../models");
const { voucher, product } = db;

exports.generateVoucher = async (req, res) => {
  try {
    const { partnaireId, organisationId, productId, extractPurecent } =
      req.body;
    if (!partnaireId || !organisationId || !productId || !extractPurecent) {
      return res.status(400).json({
        status: "failed",
        message: "Some required fields are empty",
      });
    }

    const couponCode = await generateCouponCode(extractPurecent);

    if (!couponCode) {
      return res.status(400).json({
        status: "failed",
        message: "Error generating coupon code",
      });
    }

    const foundProduct = await product.findByPk(productId);

    if (!foundProduct) {
      return res.status(400).json({
        status: "failed",
        message: "Product not found",
      });
    }

    const PromPrice = parseFloat(
      foundProduct.price -
        parseFloat(foundProduct.price * (parseFloat(extractPurecent) / 100))
    );

    const generatedVoucher = await voucher.create({
      partnaireId,
      organisationId,
      productId,
      extractPurecent,
      code: couponCode,
      PromPrice,
    }); 
   /* foundProduct.create({

    })*/

    

    return res.status(200).json({
      status: "success",
      message: "Voucher created successfully",
      data: generatedVoucher,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: `Internal Server Error: ${error.message}` });
  }
};
