import * as bcrypt from 'bcryptjs';
require("dotenv").config();

const salt = parseInt(process.env.BCRYPT_SALT);

export async function encode(password: any): Promise<string>{
    return bcrypt.hash(password, salt);
}

export async function compare(password: any, hashedPasword: any): Promise<boolean>{
    return await bcrypt.compare(password, hashedPasword);
}