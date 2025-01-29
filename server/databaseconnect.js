const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
const url = process.env.URL; // Ensure the variable matches `.env` file

async function connect(database) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(database);
    console.log("Successfully connected to database:", database);
    return db; // Optionally, return the db instance for further use
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Rethrow error for proper handling
  }
}

module.exports = connect;
