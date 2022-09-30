import connection from "../database.js";

export async function addCustomer (req,res){
    const { name, phone, cpf, birthday } = req.body;

    try{
        const repeated = await connection.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf]);
        if(repeated.rows.length>0){
            console.log("eroouu")
            return res.status(409).send("Cliente já existente");
        }
        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getCustomers(req,res){
    const { cpf } = req.query;

    if(!cpf){
        try{
            const customers = await connection.query(`SELECT * FROM customers;`)
            return res.send(customers.rows);

        }catch(err){
            return res.send(err)
        }
    }
}

export async function getCustomersbyID(req,res){
    const { id } = req.params;

    try{
        const customersID = await connection.query(`SELECT * FROM customers WHERE id=$1;`, [id])

        const {rows } = customersID;

        if(rows.length === 0)
            res.sendStatus(404)
        
        return res.send(customersID.rows[0])

    }catch(err){
        return res.send(err)
    }
}

export async function updateCustomer(req,res){
    const { id } = req.params;
    const {name, phone, cpf, birthday} = req.body;

    try{
        await connection.query(`UPDATE customers SET (name, phone, cpf, birthday) = ($1, $2, $3, $4) WHERE id = $5;`,
        [name, phone, cpf, birthday,id]);

        return res.sendStatus(201);
    }
    catch(err){
        return res.send(err)
    }

}