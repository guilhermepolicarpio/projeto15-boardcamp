import joi from "joi";

const gamesSchema = joi.object().keys({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().integer().min(1).required(),
    categoryId: joi.number().integer().min(1).required(),
    pricePerDay: joi.number().integer().min(1).required(),
});

export default gamesSchema;