

const sqlite3 = require('sqlite3').verbose();
const database = './db/storage.db'

// open database in memory
let db = new sqlite3.Database(database, sqlite3.CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the storage.');
});

// close the database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});