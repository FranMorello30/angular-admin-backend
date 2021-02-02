const jwt =  require('jsonwebtoken')

const validarJWT = (req,res,next) =>
{
    //leer token
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            msg:'no hay token en la peticion'
        })
    }

    try {

        const { uid } = jwt.verify(token,process.env.JWT_SECRET);

        //console.log(uid);

        req.uid = uid;

        
       
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg:'token no valido'
        }) 
    }

    next();
}
module.exports = {
    validarJWT
}