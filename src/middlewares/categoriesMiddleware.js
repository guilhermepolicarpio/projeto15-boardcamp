import connection from "../database.js"

export default function categoriesMiddleware(categoriesSchema){
    return async (req, res, next) =>{
        const validation = categoriesSchema.validate(req.body)
    
        if(validation.error){
            return res.status(400).send("Errorrrrr")
        }
        try{
            const category = req.body;
    
            const validName = await connection.query("SELECT *FROM categories WHERE name=$1", [category.name]);
            if(validName.rows.length)
                return res.status(409).send("Nome de categoria já existente");
            next()
        }
        catch (err){
            console.log(err)
            res.sendStatus(500);
        }
    }
}