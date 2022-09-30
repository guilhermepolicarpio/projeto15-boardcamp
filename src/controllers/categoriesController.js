import connection from "../database.js";

export async function addCategories(req, res){
    const { name } = req.body;
    
    try{
        const repeated = await connection.query(`SELECT * FROM categories WHERE name = $1`, [name]);
        if(repeated.rows.length>0){
            console.log("eroouu")
            return res.status(409).send("Categoria já existente");
        }
        await connection.query(`INSERT INTO categories (name) VALUES ($1);`, [name]);
        res.sendStatus(201);
    }catch (err){
        res.send(err);
        console.log(err)
    }
}

export async function getCategories(req, res){
        
    try{
        const categories = await connection.query(`SELECT * FROM categories`);
        res.send(categories.rows)
    }catch (err){
        res.send(err);
    }
}
 