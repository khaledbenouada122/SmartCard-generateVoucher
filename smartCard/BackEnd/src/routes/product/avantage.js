const router = require('express').Router();
const  managementAvantage = require('../../controllers/product/avantage')
module.exports = app =>{
    router.post('/',managementAvantage.addPromo)

    app.use('/api/v1/promo', router);
  
}