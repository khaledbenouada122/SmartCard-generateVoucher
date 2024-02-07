module.exports = (sequelize, Sequelize) => {
  const avantage = sequelize.define("avantage", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    purcent: {
      type: Sequelize.TEXT,
      required: true,
    },
    point: {
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
  return avantage;
};
