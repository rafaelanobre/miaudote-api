import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { getUserByEmail, getUserByEmailCpf, newUser } from "../repositories/auth.repositories.js";

export async function signUp(req,res){
    const {name, email, photo, cpf, cellphone, password} = req.body;
    try{
        const encryptedPassword = bcrypt.hashSync(password,10);

        const existUser = await getUserByEmailCpf(email,cpf);

        if (existUser.rowCount > 0) {
            const conflictingField = existUser.rows[0].email === email ? 'email' : 'cpf';
            return res.status(409).send({ message:`Esse ${conflictingField} já está cadastrado.`});
        }

        const photoUrl = photo ? photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOXP1taARF2obxe0_eECJ8tVs9NEsoRoHhiQ&usqp=CAU";

        await newUser(name, email, cpf, cellphone, encryptedPassword, photoUrl);

        res.sendStatus(201);
    }catch(err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export async function signIn(req,res){
    const {email, password} = req.body;
    try{
        const { rows: [user]} = await getUserByEmail(email);
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