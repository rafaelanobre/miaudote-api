import { db } from "../database/database.connection.js";

export async function getUserInfo(req,res){
    const userId = req.userId;
    try{
        const { rows: [userInfo] } = await db.query(`
            SELECT
                u.name AS user_name,
                u.email,
                u.cpf,
                u.cellphone,
                json_agg(
                    json_build_object(
                        'registeredAt', p."registeredAt",
                        'petName', p.name,
                        'categoryId', p."categoryId",
                        'photo', p.photo,
                        'available', p.available,
                        'city', p.city,
                        'state', p.state
                    )
                ) AS pets
            FROM users AS u
            LEFT JOIN pets AS p ON u.id = p."ownerId"
            WHERE u.id = $1
            GROUP BY u.id, p."registeredAt"
            ORDER BY p."registeredAt" DESC
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