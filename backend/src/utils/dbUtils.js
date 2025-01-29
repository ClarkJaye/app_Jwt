import { pool } from "../config/db.js";

const userTableQuery = `CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile VARCHAR(15),
    password VARCHAR(225),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const postTableQuery = `CREATE TABLE IF NOT EXISTS posts(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createTable = async (tableName, query) => {
  try {
    await pool.query(query);
    console.log(`${tableName} table created or already exists`);
  } catch (error) {
    console.log(`Error creating ${tableName}`, error);
  }
};

const createAllTable = async () => {
  try {
    await createTable("Users", userTableQuery);
    await createTable("Posts", postTableQuery);
    console.log("All table created successfully!");
  } catch (error) {
    console.log("Error creating tables", error);
    throw error;
  }
};

export default createAllTable;
