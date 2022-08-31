require('dotenv').config();

export const jwtConstants = {
    access_secret: process.env.JWT_ACCESS_SECRET_KEY,
    access_expires: process.env.JWT_ACCESS_EXPIRES_TIME,
    refresh_secret: process.env.JWT_REFRESH_SECRET_KEY,
    refresh_expires: process.env.JWT_REFRESH_EXPIRES_TIME,
}