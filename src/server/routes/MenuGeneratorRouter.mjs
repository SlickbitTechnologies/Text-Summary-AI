import express from "express";
import { generateMenu } from "../controllers/menugenerator/index.mjs";

const MenuGeneratorRouter = express.Router();
const URI = "/api/menugenerator";
MenuGeneratorRouter.get(`${URI}/generate`, generateMenu);

export default MenuGeneratorRouter;
