import connection from "../database.js";
import dayjs from "dayjs";

export async function addRentals(req,res){
    const rentDate = dayjs(Date.now()).format("DD/MM/YYYY");
    const { customerId, gameId, daysRented} = req.body;

    const game = await connection.query(`SELECT * FROM games WHERE id=$1`, [gameId])
    const {pricePerDay} = game.rows[0];
    const originalPrice = pricePerDay*daysRented;

    try{
        await connection.query(`INSERT INTO rentals 
        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice","delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [customerId, gameId, rentDate, daysRented, null, originalPrice, null])
        res.sendStatus(201);
        

    } catch(err){
        console.log(err)
        return res.sendStatus(500);
    }
}

    export async function deleteRentals(req,res){

        const {id} = req.params;

        try{
            const exist = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
            if(exist.rows.length === 0){
            
                return res.status(404).send("Aluguel não existe");
            }
            
            await connection.query(`DELETE FROM rentals WHERE id=$1`, [id])
            return res.sendStatus(200);

        }catch (err){
        return res.sendStatus(500);
        }
    }
