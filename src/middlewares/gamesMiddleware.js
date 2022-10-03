import connection from "../database.js"

export default function gamesMiddleware(gamesSchema){

    return async (req, res, next) =>{
    const validation = gamesSchema.validate(req.body)

    if(validation.error){
        return res.status(400).send("Errorrrrr")
    }
    try{
        const game = req.body;
        const validCategory = await connection.query("SELECT *FROM categories WHERE id=$1", [game.categoryId]);
        if(!validCategory.rows.length)
            return res.status(400).send("Categoria inválida");

        const validName = await connection.query("SELECT *FROM games WHERE name=$1", [game.name]);
        if(validName.rows.length)
            return res.status(409).send("Nome de jogo já existente");
        next()
    }
    catch (err){
        console.log(err)
        res.sendStatus(500);
    }
}
}