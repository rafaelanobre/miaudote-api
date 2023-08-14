import { db } from "../database/database.connection.js";

export async function selectAllPets(){
    return db.query(`
        SELECT id,name, photo, city, state FROM pets WHERE available=true ORDER BY "registeredAt" DESC`);
}

export async function insertNewPet(id, name, categoryId, description, characteristics, photo, cep, city, state){
    return db.query(`
        INSERT INTO pets
            ("ownerId", name, "categoryId", description, characteristics, photo, available, "zipCode", city, state) 
        VALUES ($1, $2, $3, $4, $5, $6, true, $7, $8, $9)
        RETURNING id`,
        [id, name, categoryId, description, characteristics, photo, cep, city, state]);
}

export async function searchPetAndOwnerById(id){
    return db.query(`
        SELECT
            p.*,
            u.name AS "ownerName",
            u.email AS "ownerEmail",
            u.cellphone AS "ownerCellphone"
        FROM pets AS p
        LEFT JOIN users AS u ON p."ownerId" = u.id
        WHERE p.id = $1
    `, [id]);
}

export async function searchPetById(id){
    return db.query(`
        SELECT * FROM pets WHERE id = $1`,
        [id]
    );
}

export async function updatePetAvailability(available, id){
    return db.query(`
            UPDATE pets SET available = $1 WHERE id = $2`,
            [available, id]
        );
}

export async function deletePetById(id){
    return db.query(`DELETE FROM pets WHERE id = $1`, [id]);
}