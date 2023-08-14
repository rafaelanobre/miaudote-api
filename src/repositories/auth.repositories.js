import { db } from "../database/database.connection.js";

export async function getUserByEmailCpf(email,cpf){
    return db.query(`
            SELECT email, cpf FROM users WHERE email = $1 OR cpf = $2
        `, [email, cpf]);
}

export async function newUser(name, email, cpf, cellphone, password, photo){
    return db.query(`
            INSERT INTO users (name, email, cpf, cellphone, password, photo)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [name, email, cpf, cellphone, password, photo]);
}

export async function getUserByEmail(email){
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}