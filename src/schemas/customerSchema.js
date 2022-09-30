import joi from "joi";

const today = Date.now();
const date = new Date(today);

const CPF_REGEX = /^[0-9]{11,11}$/;
const PHONE_REGEX = /^[0-9]{10,11}$/;

const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(PHONE_REGEX).required(),
    cpf: joi.string().pattern(CPF_REGEX).required(),
    birthday: joi.date().max(date).required()
});

export default customersSchema;