
module.exports = (sequelize, Sequelize) => {
    const product = sequelize.define(
      "product",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        
        label: {
          type: Sequelize.TEXT,
          required: true,
        },
        title: {
          type: Sequelize.TEXT,
          required: true,
        },
        description: {
          type: Sequelize.TEXT,
          required: true, 
        },
        size: {
            type: Sequelize.TEXT,
            required: true,
          },
          status: {
            type: Sequelize.TEXT,
            required: true,
            defaultValue:'0'
          },
          color: {
            type: Sequelize.TEXT,
            required: true,
            defaultValue:'0'
          },
          quantity: {
            type: Sequelize.INTEGER,
            required: true,
            defaultValue:'0'    
          },
          photo: {
            type: Sequelize.TEXT,
            required: false,
            defaultValue:'0'
          },
          price: {
            type: Sequelize.FLOAT,
            required: true,
            defaultValue:'0'
          },
          promo: {
            type: Sequelize.FLOAT,
            required: false,
           
          },
          purcentPromo: {
            type: Sequelize.FLOAT,
            required: false,
           
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
    return product;
  };
  