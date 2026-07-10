import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Assuming empty password for XAMPP default
    database: 'bklohia'
  });

  try {
    const [columns] = await connection.query("SHOW COLUMNS FROM DocumentSessions LIKE 'remarks'");
    if (columns.length === 0) {
      await connection.query("ALTER TABLE DocumentSessions ADD COLUMN remarks TEXT DEFAULT NULL");
      console.log("Added 'remarks' column to DocumentSessions.");
    } else {
      console.log("'remarks' column already exists.");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
}

run();
