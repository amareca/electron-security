
const sqlite3 = require('sqlite3').verbose();
const database = './db/storage.db'

class SQLiteDatabase {
    constructor(){}
    
    buildNew() {
        let db = new sqlite3.Database(database, sqlite3.CREATE, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the storage.');
        });

        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }

    createTableUsers() {
        const user = 'CREATE TABLE IF NOT EXISTS user (' +
            'user_id INTEGER PRIMARY KEY,' +
            'email TEXT NOT NULL,' +
            'pass TEXT NOT NULL);';

        let db = new sqlite3.Database(database);
        db.run(user , (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
        
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
}

module.exports = { SQLiteDatabase };