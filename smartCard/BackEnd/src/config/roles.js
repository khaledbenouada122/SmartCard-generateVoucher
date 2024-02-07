const Roles = {
  ADMIN :'ADMIN',
  USER : 'USER'
};
  
  const testByRole = (...roles) =>(req,res,next) => {
    const  role = roles.find(role => req.user.role.indexOf(role) != -1)
    if (!role) {
      return res.status(401).json({message : " Service not Authorized"})
    }
    next()

  }