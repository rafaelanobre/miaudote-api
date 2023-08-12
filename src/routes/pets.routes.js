import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { newPetSchema } from "../schemas/petsSchema.js";
import { addNewPet, deletePet, editPet, getPetById, getPets } from "../controllers/pets.controller.js";
import validateToken from "../middlewares/validateToken.js";

const petsRouter = Router();

petsRouter.post("/pets", validateSchema(newPetSchema), validateToken, addNewPet);
petsRouter.get("/pets", getPets);
petsRouter.get("/pets/:id", getPetById);
petsRouter.patch("/pets/:id", validateToken, editPet);
petsRouter.delete("/pets/:id", validateToken, deletePet);

export default petsRouter;