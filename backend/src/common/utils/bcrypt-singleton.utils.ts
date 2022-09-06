import * as bcrypt from 'bcryptjs';
require("dotenv").config();

const salt = parseInt(process.env.BCRYPT_SALT);


export async function encode(password){
    return bcrypt.hash(password, salt);
}

export async function compare(password, hashedPasword){
    return await bcrypt.compare(password, hashedPasword);
}