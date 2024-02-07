
module.exports = (sequelize, Sequelize) => {
    const admin = sequelize.define(
      "admin",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        
        fullname: {
          type: Sequelize.TEXT,
          required: true,
        },
        phone: {
            type: Sequelize.TEXT,
            required: true,
          },
        mail: {
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
    return admin;
  };
  