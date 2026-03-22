import jwt from "jsonwebtoken"

const  adminAuth = async (req,res,next) => {
    try {
        const {token} = req.headers;
        if(!token){
            return res.status(401).json({success: false, message: "Not Authorizes Login Again"});
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(token_decode !==  process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(403).json({success: false, message: "Not Authorizes Login Again"});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: error.message});

    }
}

export default adminAuth;