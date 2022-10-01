import { Router} from "express";
import { addRentals,deleteRentals } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", addRentals)
rentalsRouter.delete("/rentals/:id", deleteRentals)
export default rentalsRouter;