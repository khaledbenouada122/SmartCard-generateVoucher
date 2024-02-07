const router = require('express').Router();
const  managementVoucher = require('../../controllers/genrateVoucher/index')
module.exports = app =>{
    router.post('/',managementVoucher.generateVoucher)
    /*router.get('/',managementCategories.getAllCategories)
    router.get('/:id',managementCategories.getCategorieByid)
    router.delete('/:id',managementCategories.deleteCategorie)*/
    
   



    app.use('/api/v1/genrate', router);
  
}