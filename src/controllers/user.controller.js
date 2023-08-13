import { db } from "../database/database.connection.js";

export async function getUserInfo(req,res){
    const userId = req.userId;
    try{
        const { rows: [userInfo] } = await db.query(`
            SELECT
                u.name AS "userName",
                u.email,
                u.cpf,
                u.cellphone,
                (
                    SELECT json_agg(
                        json_build_object(
                            'petId', p.id,
                            'registeredAt', p."registeredAt",
                            'petName', p.name,
                            'categoryId', p."categoryId",
                            'photo', p.photo,
                            'available', p.available,
                            'city', p.city,
                            'state', p.state
                        )
                        ORDER BY p."registeredAt" DESC
                    )
                    FROM pets AS p
                    WHERE u.id = p."ownerId"
                ) AS pets
            FROM users AS u
            WHERE u.id = $1
        `, [userId]);

        if (!userInfo) {
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }

        res.status(200).send(userInfo);
    }catch(err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}