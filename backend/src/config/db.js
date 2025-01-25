import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10,
});

const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database Connection Successful!");
    connection.release();
  } catch (error) {
    console.error("Error connecting to database");
    throw error;
  }
};

export { pool, checkConnection };``