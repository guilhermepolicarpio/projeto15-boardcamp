import { Router} from "express";
import { addCustomer, getCustomers } from "../controllers/customersController.js";
import customersSchema from "../schemas/customerSchema.js";
import customerMiddleware from "../middlewares/customerMiddleware.js";

const customersRouter = Router();

customersRouter.get("/customers",getCustomers)
customersRouter.post("/customers", customerMiddleware(customersSchema),addCustomer)

export default customersRouter;