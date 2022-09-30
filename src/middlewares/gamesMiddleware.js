export default function gamesMiddleware(gamesSchema){

    return (req, res, next) =>{
    const validation = gamesSchema.validate(req.body)

    if(validation.error){
        return res.status(400).send("Errorrrrr")
    }
    next()
}
}