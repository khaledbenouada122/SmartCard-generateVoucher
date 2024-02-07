const router = require('express').Router();
const  managementProducts = require('../../controllers/product/product')
module.exports = app =>{
    router.post('/',managementProducts.addProduct)
    router.get('/',managementProducts.getAllproducts)
    router.get('/:id',managementProducts.getProductById)    // getByIdPartner
    router.get('/partner/:userId',managementProducts.getProductByidPartner)
    router.delete('/:id',managementProducts.deleteProducts) 
    router.put('/:id',managementProducts.updateProduct)
    router.patch('/:id/updateAmount',managementProducts.makePromoForProduct)
    app.use('/api/v1/product', router);
  
}