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

    export async function getRentals(req,res){

        const {customerId, gameId, offset, limit} = req.query;

        try{
        const rentals = await connection.query(`
        SELECT
        rentals.*,
        jsonb_build_object('name', customers.name, 'id', customers.id) AS customer,
        jsonb_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name)
        AS game FROM games
        JOIN rentals ON games.id = rentals."gameId"
        JOIN customers ON rentals."customerId"=customers.id
        JOIN categories ON games."categoryId"=categories.id
        LIMIT $1 OFFSET $2;`, [limit, offset]);
        
       res.send(rentals.rows)

        }catch (err){
            console.log(err)
            return res.sendStatus(500);
        }

    }