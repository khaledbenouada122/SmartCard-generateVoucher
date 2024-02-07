
module.exports = (sequelize, Sequelize) => {
  const roles = sequelize.define(
    "roles",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      
      role: {
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
      
    },
   
  );
  return roles;
};
