const router = require('express').Router();
const  managementOrganisation = require('../controllers/organisation')
module.exports = app =>{
    router.post('/',managementOrganisation.add)
    router.get('/',managementOrganisation.getAllorganisations)
    router.get('/:id',managementOrganisation.getOrganisationById)
    router.delete('/:id',managementOrganisation.deleteOrganisation)
    app.use('/api/v1/organisation', router);
  
}