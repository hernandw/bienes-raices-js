import { pool } from "../config/db.js";

const createPropiedad = async ({
  id,
  title,
  description,
  rooms,
  category_id,
  precio_id,
  parking,
  wc,
  street,
  lat,
  lng,
  user_id
}) => {
  try {
    const sql = {
      text: "INSERT INTO propiedades (id, title, description, rooms, category_id, precio_id, parking, wc, street, lat, lng, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      values: [
        id,
        title,
        description,
        rooms,
        category_id,
        precio_id,
        parking,
        wc,
        street,
        lat,
        lng,
        user_id
      ],
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

const findAllCategory = async () => {
  const sql = {
    text: "SELECT * FROM category",
  };
  const response = await pool.query(sql);
  if (response.rowCount > 0) {
    return response.rows;
  } else {
    return false;
  }
};

const findAllPrice = async () => {
  const sql = {
    text: "SELECT * FROM price",
  };
  const response = await pool.query(sql);
  if (response.rowCount > 0) {
    return response.rows;
  } else {
    return false;
  }
};

export const models = {
  createPropiedad,
  findAllCategory,
  findAllPrice,
};
