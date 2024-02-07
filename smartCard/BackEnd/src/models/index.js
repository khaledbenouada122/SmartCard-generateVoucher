const dbConfig = require("../config/db");
const Sequelize = require("sequelize");
const organisation = require("./organisation");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  logging: console.log,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// declare the role schema
db.roles = require("./roles")(sequelize, Sequelize);
db.categories = require("./categories")(sequelize, Sequelize);
db.organisation = require("./organisation")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
// gestion partner
db.family = require("./partner/family")(sequelize, Sequelize);
db.partner = require("./partner/partner")(sequelize, Sequelize);
// gestion admin : 
db.admin =require("./admin/index")(sequelize,Sequelize)
//gestion product 
db.range = require("./product/range")(sequelize,Sequelize)
db.product = require("./product/product")(sequelize,Sequelize)
db.avantage = require("./product/avantage")(sequelize,Sequelize)
db.voucher = require("./voucher/voucher")(sequelize,Sequelize)

// relation between organisation and categories
db.organisation.belongsTo(db.categories, {
  foreignKey: "categorieId",
});
db.categories.hasMany(db.organisation, {
  foreignKey: "categorieId",
});

// relation between organisation and user

db.user.belongsTo(db.organisation, {
  foreignKey: "organisationId",
});

db.organisation.hasMany(db.user, {
  foreignKey: "organisationId",
});
// relation  between user and role
db.user.belongsTo(db.roles, {
  foreignKey: "roleId",
});
db.roles.hasMany(db.user, {
  foreignKey: "roleId",
});
// relation between partner and role
db.partner.belongsTo(db.roles, {
  foreignKey: "roleId",
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
db.roles.hasMany(db.partner, {
  foreignKey: "roleId",
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
// relation between partner and family
db.partner.belongsTo(db.family, {
  foreignKey: "familyId",
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
db.family.hasMany(db.partner, {
  foreignKey: "familyId",
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
// relation between adminUser and role 
db.admin.belongsTo(db.roles, {
  foreignKey: "roleId",
});
db.roles.hasMany(db.admin, {
  foreignKey: "roleId",
});

// relation betwwen the product and ranges :
db.product.belongsTo(db.range,{
  foreignKey:"rangeId"
})
db.range.hasMany(db.product,{
  foreignKey:"rangeId"
})
// relation between products and partner 
//userId is the partnerId : connected user
db.product.belongsTo(db.partner,{
  foreignKey:"userId"
})
db.partner.hasMany(db.product,{
  foreignKey:"userId"
})


// relation between voucher and products 
db.voucher.hasMany(db.product,{
  foreignKey:"voucherId"
});
db.product.belongsTo(db.voucher,{
  foreignKey:"voucherId"
});
module.exports = db;
