import { pool } from "../config/db.js";

const createPropiedad = async ({title, description, rooms, category_id, precio_id, parking, wc, street, lat, lng}) => {
try {
    const sql = {
        text: "INSERT INTO propiedades (title, description, rooms, category_id, precio_id, parking, wc, street, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        values: [title, description, rooms, category_id,precio_id, parking, wc, street, lat, lng],
    }
    const response = await pool.query(sql);
    if (response.rowCount > 0) {
        return response.rows[0];
    } else {
        return false;
    }
} catch (error) {
    console.log("Error code: ", error.code, "\nMessage: ", error.message);
}
}

export const models = {
    createPropiedad
}
