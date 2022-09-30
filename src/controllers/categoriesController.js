import connection from "../database.js";

export async function addCategories(req, res){
    const { name } = req.body;
    
    try{
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
 