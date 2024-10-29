// Users Table
// id ,first_name, last_name, email, password, register_at, update_at,
// is_verifyd, phone_number

import { pgClient } from "../init";

export const createUsersTableIfNotExists = async () => {
  try {
    await pgClient.query(`CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(200) CHECK(LENGTH(first_name) > 1) NOT NULL,
        last_name VARCHAR(200) CHECK(LENGTH(last_name) > 1) NOT NULL,
        email VARCHAR(255) CHECK(LENGTH(email) > 6) NOT NULL,
        password VARCHAR(255) NOT NULL,
        register_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        is_verified BOOLEAN DEFAULT FALSE NOT NULL,
        phone_number VARCHAR(15)
    );`);
    console.log(`Users table is ready!`);
  } catch (err) {
    console.log("");
  }
};
