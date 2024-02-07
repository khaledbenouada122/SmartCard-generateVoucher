const router = require('express').Router();
const  managementRoles = require('../controllers/roles')
module.exports = app =>{
    router.post('/',managementRoles.add)
    router.get('/',managementRoles.getAllRoles)
    router.get('/:id',managementRoles.getRolesByid)
    
   



    app.use('/api/v1/role', router);
  
}