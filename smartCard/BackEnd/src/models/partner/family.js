
module.exports = (sequelize, Sequelize) => {
    const family = sequelize.define(
      "family",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        
        family: {
          type: Sequelize.TEXT,
          required: true,
        },
        code: {
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
    return family;
  };
  