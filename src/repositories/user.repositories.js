import { db } from "../database/database.connection.js";

export async function userInfoAndPets(id) {
    return db.query(`
        SELECT
            u.name AS "userName",
            u.email,
            u.cpf,
            u.cellphone,
            (
                SELECT COALESCE(json_agg(
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
                ), '[]')
                FROM pets AS p
                WHERE u.id = p."ownerId"
            ) AS pets
        FROM users AS u
        WHERE u.id = $1
    `, [id]);
}
