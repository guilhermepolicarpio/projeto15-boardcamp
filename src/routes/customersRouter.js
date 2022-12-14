import { Router} from "express";
import { addCustomer, getCustomers, getCustomersbyID,updateCustomer} from "../controllers/customersController.js";
import customersSchema from "../schemas/customerSchema.js";
import customerMiddleware from "../middlewares/customerMiddleware.js";

const customersRouter = Router();

customersRouter.get("/customers",getCustomers)
customersRouter.post("/customers", customerMiddleware(customersSchema),addCustomer)
customersRouter.get("/customers/:id", getCustomersbyID)
customersRouter.put("/customers/:id", customerMiddleware(customersSchema), updateCustomer)

export default customersRouter;