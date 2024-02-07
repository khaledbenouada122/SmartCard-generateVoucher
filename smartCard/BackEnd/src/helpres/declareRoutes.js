const express = require("express");
const rolesRouter = require("../routes/roles");
const categoriesRouter = require("../routes/categories");
const organisationRouter = require("../routes/organisation");
const familyRouter = require("../routes/partner/family");
const partnerRouter = require("../routes/partner/partner");
const adminRouter = require("../routes/admin");
const userRouter = require("../routes/user");
const rangeRouter = require("../routes/product/range")
const promoRouter = require("../routes/product/avantage")
const productRouter = require("../routes/product/product")
const genrateRouter = require("../routes/genrateVoucher/index")
function declareRoutes(app) {
  app.use(express.json());
  rolesRouter(app);
  categoriesRouter(app);
  organisationRouter(app);
  familyRouter(app);
  partnerRouter(app);
  adminRouter(app)
  genrateRouter(app)
  userRouter(app);
  rangeRouter(app)
  productRouter(app)
  promoRouter(app)
}

module.exports = declareRoutes;
