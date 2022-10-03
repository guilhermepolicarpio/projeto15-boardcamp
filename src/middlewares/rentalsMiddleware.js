import connection from "../database.js"

export default function rentalsMiddleware(rentalsSchema){


    return async (req, res, next) =>{
    const rental = req.body;
    const validation = rentalsSchema.validate(req.body)

    if(validation.error){
        console.log(validation.error)
        return res.status(400).send("Errorrrrr")
    }

    try{
        const validCustomer = await connection.query("SELECT * FROM customers WHERE id=$1 LIMIT 1", [rental.customerId]);

        if(!validCustomer.rows.length)
            return res.status(400).send("Cliente invalido");

            next()
    }catch (err){
        res.sendStatus(500);
    }
    
}
}