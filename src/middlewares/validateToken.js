import Jwt from "jsonwebtoken";

export default function validateToken(req,res,next){
    try{
        const { authorization } = req.headers;
        const token = authorization?.replace("Bearer ", "");

        if(!token) res.status(401).send('O token não foi enviado corretamente.');

        const decoded = Jwt.verify(token, process.env.SECRET_JWT  || "chaveSecreta");
        req.userId = decoded.id;
        next();
    }catch(error){
        return res.status(401).send({message:'Token inválido.'});
    }
}