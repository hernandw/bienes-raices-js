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
  user_id,
  image,
}) => {
  try {
    const sql = {
      text: "INSERT INTO propiedades (id, title, description, rooms, category_id, precio_id, parking, wc, street, lat, lng, user_id, image, published) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, true ) RETURNING *",
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
        user_id,
        image,
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

const findAllPropertybyUser = async (id) => {
  const sql = {
    text: "SELECT p.title, price.name AS precio, p.published, category.name AS categoria FROM propiedades p JOIN price ON p.precio_id = price.id JOIN category ON p.category_id = category.id WHERE user_id = $1",
    values: [id],
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
  findAllPropertybyUser,
};
