import { pool } from "../config/db.js";
import { querys } from "../config/querys.js";

try {
  await pool.query(querys.createTableCategory);
  await pool.query(querys.createTablePrice);
  await pool.query(querys.createTableUsers);
  await pool.query(querys.createTablePropiedades);
  console.log("tables created");
  await pool.query(querys.insertCategory);
  await pool.query(querys.insertPrice);
  console.log("Price inserted");
} catch (error) {
  console.log("Error code: ", error.code, "\nMessage: ", error.message);
}
