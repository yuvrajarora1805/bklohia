import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bklohia'
  });

  try {
    // Create Groups table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS ClientGroups (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Created ClientGroups table.");

    // Add group_id to Users
    const [columns] = await connection.query("SHOW COLUMNS FROM Users LIKE 'group_id'");
    if (columns.length === 0) {
      await connection.query("ALTER TABLE Users ADD COLUMN group_id INT DEFAULT NULL");
      // Optionally add foreign key constraint, but not strictly necessary for simple relations
      console.log("Added 'group_id' column to Users.");
    } else {
      console.log("'group_id' column already exists.");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
}

run();
