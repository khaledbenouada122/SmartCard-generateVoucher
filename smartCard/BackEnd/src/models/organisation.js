module.exports = (sequelize, Sequelize) => {
  const organisation = sequelize.define("organisation", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    label: {
      type: Sequelize.TEXT,
      required: true,
    },

    logo: {
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
  return organisation;
};
