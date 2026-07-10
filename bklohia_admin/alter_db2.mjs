import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bklohia'
  });

  try {
    const [columns1] = await connection.query("SHOW COLUMNS FROM ClientServices LIKE 'period'");
    if (columns1.length === 0) {
      await connection.query("ALTER TABLE ClientServices ADD COLUMN period VARCHAR(100) DEFAULT NULL");
      console.log("Added 'period' column to ClientServices.");
    }

    const [columns2] = await connection.query("SHOW COLUMNS FROM ClientServices LIKE 'admin_comments'");
    if (columns2.length === 0) {
      await connection.query("ALTER TABLE ClientServices ADD COLUMN admin_comments TEXT DEFAULT NULL");
      console.log("Added 'admin_comments' column to ClientServices.");
    }
    
    // I also need to update the unique constraint check in the API later, so we allow same service for different periods.
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
}

run();
