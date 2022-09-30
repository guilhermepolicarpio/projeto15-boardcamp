import customersSchema from "../schemas/customerSchema.js";

export default function customerMiddleware(customersSchema){

    return (req, res, next) =>{
    const validation = customersSchema.validate(req.body)

    if(validation.error){
        return res.status(400).send("Errorrrrr")
    }
    next()
}
}
