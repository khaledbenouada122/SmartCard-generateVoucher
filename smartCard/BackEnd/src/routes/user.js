const router = require('express').Router();
const  managementUsers = require('../controllers/user')
module.exports = app =>{
    router.post('/',managementUsers.add)
    router.get('/',managementUsers.getAllUseres)
    router.get('/:id',managementUsers.getUserById)
    router.delete('/:id',managementUsers.deleteUser)
    router.put('/:id',managementUsers.updateUser,)
    
   



    app.use('/api/v1/users', router);
  
}