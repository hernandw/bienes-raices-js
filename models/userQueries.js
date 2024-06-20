import { pool } from "../config/db.js";

const register = async (name, email, password, token) => {
    try {
        const sql = {
            text: "INSERT INTO users (name, email, password, token) VALUES ($1, $2, $3, $4) RETURNING *",
            values: [name, email, password, token],
        };
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error code: ", error.code, "\nMessage: ", error.message);
    }
};

const checkToken = async (token) => {
    try {
        const sql = {
            text: "UPDATE users SET confirm = true, token = null WHERE token = $1 RETURNING * ",
            values: [token],
        };
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error code: ", error.code, "\nMessage: ", error.message);
    }
};

export const models = {
    register,
    checkToken,
}