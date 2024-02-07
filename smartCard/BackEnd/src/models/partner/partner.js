
module.exports = (sequelize, Sequelize) => {
    const partner = sequelize.define(
      "partner",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        
        company: {
          type: Sequelize.TEXT,
          required: true,
        },
        phone: {
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
        
      },
     
    );
    return partner;
  };
  