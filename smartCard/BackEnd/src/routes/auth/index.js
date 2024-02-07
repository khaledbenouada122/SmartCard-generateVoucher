const router = require("express").Router();
const admin = require("../../controllers/admin/index");
module.exports = (app) => {
  router.post("/", admin.add);
  router.get("/", admin.getAllAdmins);

  app.use("/api/connexion", router);
};
