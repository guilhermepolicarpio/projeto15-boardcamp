import { Router} from "express";
import { addCategories,getCategories } from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.post("/categories", addCategories)
categoriesRouter.get("/categories", getCategories)


export default categoriesRouter;