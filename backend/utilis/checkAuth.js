import jwt from 'jsonwebtoken';


export default (req, res, next) =>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token){
        try {
            const decoded = jwt.verify(token, 'secret');

            req.userId = decoded._id;
            next();
        } catch (error) {
            res.status(400).json({
                message:"отказано"
            })
        }
    }else{
        res.status(400).json({
                message:"отказано"
            })
    }
}