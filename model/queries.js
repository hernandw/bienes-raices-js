import pool from "./config.js";

export const fechaQuery = async () => {
  const { rows } = await client.query("SELECT NOW()");
  return rows;
};

export const registerQuery = async (name, email, password, token) => {

  try {

    //ingresamos los datos en la BB
    const sql = {
      text: "INSERT INTO users (name, email, password, token) VALUES ($1, $2, $3, $4) returning *",
      values: [name, email, password, token],
    }
    const response = await pool.query(sql)
    if(response.rowCount > 0) {
      return response.rows
    }else{
      return throwError('Error al registrar usuario')
    }

  } catch (error) {
    console.log('Error code: ', error.code, '\nMessage: ', error.message);
  }
};

export const checkEmailExist = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email])

  return rows
} 
