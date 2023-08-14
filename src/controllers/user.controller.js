import { userInfoAndPets } from "../repositories/user.repositories.js";

export async function getUserInfo(req,res){
    const userId = req.userId;
    try{
        const { rows: [userInfo] } = await userInfoAndPets(userId);

        if (!userInfo) {
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }

        res.status(200).send(userInfo);
    }catch(err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}