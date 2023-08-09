import bcrypt from "bcrypt";
import { db } from "../database/database.connection.js";
import Jwt from "jsonwebtoken";

export async function signUp(req,res){
    const {name, email, cpf, cellphone, password} = req.body;
    try{
        const encryptedPassword = bcrypt.hashSync(password,10);

        const existUser = await db.query(`
            SELECT email, cpf FROM users WHERE email = $1 OR cpf = $2
        `, [email, cpf]);

        if (existUser.rowCount > 0) {
            const conflictingField = existUser.rows[0].email === email ? 'email' : 'cpf';
            return res.status(409).send({ message:`Esse ${conflictingField} já está cadastrado.`});
        }

        await db.query(`
            INSERT INTO users (name, email, cpf, cellphone, password)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [name, email, cpf, cellphone, encryptedPassword]);

        res.sendStatus(201);
    }catch(err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export async function signIn(req,res){
    const {email, password} = req.body;
    try{
        const { rows: [user]} = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
        if (!user) return res.status(404).send({message:"Usuário não encontrado"});

        const correctPassword = bcrypt.compareSync(password, user.password)
        if (!correctPassword) return res.status(401).send({message:"Senha incorreta"});

        const token = Jwt.sign({ id: user.id }, process.env.SECRET_JWT || "chaveSecreta", { expiresIn: 86400 });
        res.status(200).send({token});
    }catch(err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}