module.exports = (sequelize, Sequelize) => {
  const voucher = sequelize.define("voucher", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    partnaireId: {
      type: Sequelize.UUID,
      required: true,
    },
    organisationId: {
      type: Sequelize.UUID,
      required: true,
    },
    productId: {
      type: Sequelize.UUID,
      required: true,
    },
    extractPurecent: {
      type: Sequelize.TEXT,
      required: true,
    },
    code: {
      type: Sequelize.TEXT,
      required: true,
    },
    PromPrice: {
      type: Sequelize.TEXT,
      required: true,
    },

    createdBy: {
      type: Sequelize.UUID,
    },
    updatedBy: {
      type: Sequelize.UUID,
    },
    deletedBy: {
      type: Sequelize.UUID,
    },
    deleted: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });
  return voucher;
};
