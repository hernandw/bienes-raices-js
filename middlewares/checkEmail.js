import pool from "../models/config.js";

export const checkEmail = async (email) => {
  try {
    const sql = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };

    const response = await pool.query(sql);
    if (response.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error code: ", error.code, "\nMessage: ", error.message);
  }
};

export const checkToken = async (token) => {
  try {
    const sql = {
      text: "SELECT * FROM users WHERE token = $1",
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

export const checkConfirm = async (email) => {
  try {
    const sql = {
      text: "Update users set confirm = true, token = null WHERE email = $1 returning *",
      values: [email],
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
