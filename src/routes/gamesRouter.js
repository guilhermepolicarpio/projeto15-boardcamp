import { Router} from "express";
import { addGames,getGames } from "../controllers/gamesController.js";
import gamesMiddleware from "../middlewares/gamesMiddleware.js";
import gamesSchema from "../schemas/gamesSchema.js";

const gamesRouter = Router();

gamesRouter.get("/games",getGames)
gamesRouter.post("/games",gamesMiddleware(gamesSchema),addGames)

export default gamesRouter;