const router = require('express').Router();
const  managementFamily = require('../../controllers/partner/family')
module.exports = app =>{
    router.post('/',managementFamily.add)
    router.get('/',managementFamily.getAllfamilies)
    router.get('/:id',managementFamily.getFamilyById)
    //router.delete('/:id',managementCategories.deleteCategorie)
    
   



    app.use('/api/v1/family', router);
   
}