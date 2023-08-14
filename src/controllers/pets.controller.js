import { db } from "../database/database.connection.js";
import { deletePetById, insertNewPet, searchPetAndOwnerById, searchPetById, selectAllPets, updatePetAvailability } from "../repositories/pets.repositories.js";

export async function addNewPet(req,res){
    const{name, photo, category, description, characteristics, cep, city, state} = req.body;
    try{
        const { rows: [newPet]}  = await insertNewPet(req.userId, name, parseInt(category), description, characteristics, photo, cep, city, state);
        res.status(201).send({id: newPet.id, message:'Created'});
    }catch(err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export async function getPets(req,res){
    try{
        const {rows: pets} = await selectAllPets();
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
        const { rows: [petInfo] } = await searchPetAndOwnerById(id);
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
        const { rows: [pet] } = await searchPetById(id);

        if(!pet) return res.status(404).send({ message: 'Não foi possível encontrar dados desse pet.' });

        if(pet.ownerId !== req.userId) return res.status(403).send({ message: 'Você não pode editar esse registro.' });

        await updatePetAvailability(available, id);

        res.status(200).send({ message: 'Pet atualizado com sucesso.' });

    }catch(err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export async function deletePet(req,res){
    const { id } = req.params;
    try {
        const { rows: [petInfo] } = await searchPetById(id);
        console.log(petInfo)

        if (!petInfo) return res.status(404).send({ message: 'Impossível excluir, pet não encontrado.' });

        if (petInfo.ownerId !== req.userId)  return res.status(403).send({ message: 'Impossível excluir, pet vinculado a outro usuário.' });

        await deletePetById(id);

        res.status(200).send({ message: 'Pet deletado com sucesso.' });
    } catch (err) {
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}