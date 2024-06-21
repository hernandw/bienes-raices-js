import jwt from "jsonwebtoken";

process.loadEnvFile()

const secretKey = process.env.JWT_SECRET_KEY;


export const generateToken = (id, email) => {
    return jwt.sign({ id }, secretKey, {
        expiresIn: "1m"
    })
}