const router = require('express').Router();
const  managementRange = require('../../controllers/product/range')
module.exports = app =>{
    router.post('/',managementRange.addRange)
    router.get('/',managementRange.getAllRanges)
    router.get('/:id',managementRange.getRangesById)
    router.delete('/:id',managementRange.deleteRanges)
    
   



    app.use('/api/v1/range', router);
  
}