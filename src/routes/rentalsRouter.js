import { Router} from "express";
import { addRentals } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", addRentals)

export default rentalsRouter;