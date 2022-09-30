import { Router} from "express";
import categoriesMiddleware from "../middlewares/categoriesMiddleware.js";
import categoriesSchema from "../schemas/categoriesSchema.js";
import { addCategories,getCategories } from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.post("/categories", categoriesMiddleware(categoriesSchema), addCategories)
categoriesRouter.get("/categories", getCategories)


export default categoriesRouter;