const router = require('express').Router();
const  managementPartner = require('../../controllers/partner/partner')
module.exports = app =>{
    router.post('/',managementPartner.add)
    router.get('/',managementPartner.getAllPartner)
    router.get('/:id',managementPartner.getPartnerById)
    router.delete('/:id',managementPartner.deletePartner)
    router.put('/:id',managementPartner.updatePartner)
    
    app.use('/api/v1/partner', router);
   
}