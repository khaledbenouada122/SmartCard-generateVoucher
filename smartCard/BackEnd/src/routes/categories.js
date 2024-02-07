const router = require('express').Router();
const  managementCategories = require('../controllers/categories')
module.exports = app =>{
    router.post('/',managementCategories.add)
    router.get('/',managementCategories.getAllCategories)
    router.get('/:id',managementCategories.getCategorieByid)
    router.delete('/:id',managementCategories.deleteCategorie)
    
   



    app.use('/api/v1/categories', router);
  
}