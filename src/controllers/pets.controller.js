import { db } from "../database/database.connection.js";

export async function addNewPet(req,res){
    const{name, photo, category, description, characteristics, cep, city, state} = req.body;
    const id = req.userId;
    const categoryId = parseInt(category);
    try{
        const { rows: [newPet]}  = await db.query(`
        INSERT INTO pets
            ("ownerId", name, "categoryId", description, characteristics, photo, available, "zipCode", city, state) 
        VALUES ($1, $2, $3, $4, $5, $6, true, $7, $8, $9)
        RETURNING id`,
        [id, name, categoryId, description, characteristics, photo, cep, city, state])
        res.status(201).send({id: newPet.id, message:'Created'});
    }catch(err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export async function getPets(req,res){
    try{
        const {rows: pets} = await db.query(`
        SELECT id,name, photo, city, state FROM pets WHERE available=true ORDER BY "registeredAt" DESC`);
        if (pets.rowCount === 0) return res.status(204).send({message:'Todos os pets já foram adotados!'});
        res.status(200).send(pets);
    }catch(err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export async function getPetById(req,res){
    const {id} = req.params;
    try{
        const { rows: [petInfo] } = await db.query(`
            SELECT
                p.*,
                u.name AS "ownerName",
                u.email AS "ownerEmail",
                u.cellphone AS "ownerCellphone"
            FROM pets AS p
            LEFT JOIN users AS u ON p."ownerId" = u.id
            WHERE p.id = $1
        `, [id]);
        if (!petInfo) return res.status(404).send({message:'Não foi possível encontrar dados desse pet.'});
        res.status(200).send(petInfo);
    }catch(err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export async function editPet(req,res){
    const {id} = req.params;
    const {available} = req.body;
    try{
        const { rows: [pet] } = await db.query(`
            SELECT * FROM pets WHERE id = $1`,
            [id]
        );

        if(!pet) return res.status(404).send({ message: 'Não foi possível encontrar dados desse pet.' });

        if(pet.ownerId !== req.userId) return res.status(403).send({ message: 'Você não pode editar esse registro.' });

        await db.query(`
            UPDATE pets SET available = $1 WHERE id = $2`,
            [available, id]
        );

        res.status(200).send({ message: 'Pet atualizado com sucesso.' });

    }catch(err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export async function deletePet(req,res){
    const { id } = req.params;
    try {
        const { rows: [petInfo] } = await db.query(`
            SELECT * FROM pets WHERE id = $1`,
            [id]
        );

        if (!petInfo) return res.status(404).send({ message: 'Impossível excluir, pet não encontrado.' });

        if (petInfo.ownerId !== req.userId)  return res.status(403).send({ message: 'Impossível excluir, pet vinculado a outro usuário.' });

        await db.query(`DELETE FROM pets WHERE id = $1`, [id]);

        res.status(200).send({ message: 'Pet deletado com sucesso.' });
    } catch (err) {
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}