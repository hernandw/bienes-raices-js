import pool from "./config.js";

export const fechaQuery = async () => {
  const { rows } = await client.query("SELECT NOW()");
  return rows;
};

export const registerQuery = async (name, email, password) => {

  try {
    const sql = {
      text: "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) returning *",
      values: [name, email, password],
    }
    const response = await pool.query(sql)
    return response.rows
  } catch (error) {
    console.log(error)
  }
};
