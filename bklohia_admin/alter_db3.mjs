import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bklohia'
  });

  try {
    const [columns] = await connection.query("SHOW COLUMNS FROM Users LIKE 'segment'");
    if (columns.length === 0) {
      await connection.query("ALTER TABLE Users ADD COLUMN segment VARCHAR(100) DEFAULT NULL");
      console.log("Added 'segment' column to Users.");
    } else {
      console.log("'segment' column already exists.");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
}

run();
