import { Router} from "express";
import validate from "../middlewares/validate.js";
import categoriesSchema from "../schemas/categoriesSchema.js";
import { addCategories,getCategories } from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.post("/categories", validate(categoriesSchema), addCategories)
categoriesRouter.get("/categories", getCategories)


export default categoriesRouter;