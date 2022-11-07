import * as argon2 from 'argon2';
// require("dotenv").config();

// const salt = parseInt(process.env.BCRYPT_SALT);

export async function argon2_encode(password: any): Promise<string> {
    return argon2.hash(password);
}

export async function argon2_verify(hashedPasword: any, password: any): Promise<boolean> {
    return await argon2.verify(hashedPasword, password);
}