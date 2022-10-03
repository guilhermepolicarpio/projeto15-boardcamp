import connection from "../database.js";

export async function addGames (req,res){

    const {name, image, stockTotal, categoryId, pricePerDay} = req.body;

    try{

        
        const repeated = await connection.query(`SELECT * FROM games WHERE name = $1`, [name]);
        if(repeated.rows.length>0){
            console.log("eroouu")
            return res.status(409).send("Jogo já existente");
        }
        await connection.query(`INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);`, 
        [name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);

    } catch(err){
        return res.send(err)
    }
}

export async function getGames(req,res){
    const { name } = req.query;

    if(!name){
        try{
            const games = await connection.query(`SELECT * FROM games;`)
            return res.send(games.rows);

        }catch(err){
            return res.send(err)
        }
    }
}