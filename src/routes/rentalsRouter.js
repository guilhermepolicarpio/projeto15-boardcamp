import { Router} from "express";
import rentalsMiddleware from "../middlewares/rentalsMiddleware.js";
import { addRentals,deleteRentals, getRentals } from "../controllers/rentalsController.js";
import { rentalsSchema } from "../schemas/rentalsSchema.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", rentalsMiddleware(rentalsSchema), addRentals)
rentalsRouter.delete("/rentals/:id", deleteRentals)
rentalsRouter.get("/rentals", getRentals)

export default rentalsRouter;