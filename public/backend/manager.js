const table_user = `CREATE TABLE IF NOT EXISTS user ( 
    user_id INTEGER PRIMARY KEY, 
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    createdAt INT NOT NULL,
    updatedAt INT NULL);`;

const table_account = `CREATE TABLE IF NOT EXISTS account ( 
    account_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL, 
    description TEXT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    username TEXT NULL,
    createdAt INT NOT NULL,
    updatedAt INT NULL,
    FOREIGN KEY (user_id)
       REFERENCES user (user_id) );`;

const sqlite3 = require('sqlite3').verbose();
const isDev = require("electron-is-dev");
const database = isDev ? './src/database/storage.sqlite' : './storage.sqlite';

console.log(isDev);

class SQLiteDatabase {
    create() {
        let db = new sqlite3.Database(database, sqlite3.CREATE, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Created storage.');
        });
        db.close();
    }

    init() {
        this.createTables();
    }

    createTables() {
        let tables = [table_user, table_account];
        tables.forEach(t => {
            try {
                let db = new sqlite3.Database(database, sqlite3.CREATE);
                db.run(t);
                db.close();
            } catch (e) {
                console.error(e);
            }
        });
    }
}

/**
 * This class has methods to connect with database.
 */
class DAO {
    constructor(model) {
        this.model = model;
    }

    // checkType(object, props) {
    //     return Object.keys(object).some((v) => {
    //         return !props.includes(v);
    //     });;
    // }

    /**
     * INSERT operation
     * 
     * @param {Object} object - Object which you will insert into database.
     * @return {Promise} the resulting operation
     */
    add(object) {
        return new Promise((resolve, reject) => {
            const columns = Object.keys(object).join(',');
            const values = Object.values(object);
            const placeHolders = values.map((v) => '?').join(',');

            const statement = `INSERT INTO ${this.model.tableName} (${columns},createdAt) VALUES(${placeHolders},datetime('now'));`;
            console.log(statement);

            let db = new sqlite3.Database(database);
            db.run(statement, values, function (err) {
                if (err) {
                    reject({
                        message: err,
                        result: -1
                    });
                }
                resolve(this.changes);
            });
            db.close();
        });
    }

    update(object) {
        return new Promise((resolve, reject) => {
            const keys = Object.keys(object.keys);
            const placeHolderKeys = keys.map((v) => ` ${v} = ? `).join(' AND ');

            const props = Object.keys(object.props);
            const placeHolderProps = props.map((v) => ` ${v} = ? `).join(',');

            const statement = `UPDATE ${this.model.tableName} SET ${placeHolderProps}, updatedAt = datetime('now') WHERE ${placeHolderKeys};`;
            console.log(statement);
            
            const values = Object.values(object.props).concat(Object.values(object.keys));
            let db = new sqlite3.Database(database);
            db.run(statement, values, function (err) {
                if (err) {
                    reject({
                        message: err,
                        result: -1
                    });
                }
                resolve(this.changes);
            });
            db.close();
        });
    }

    delete(object) {
        return new Promise((resolve, reject) => {
            const keys = Object.keys(object);
            const placeHolderKeys = keys.map((v) => ` ${v} = ? `).join(' AND ');

            const statement = `DELETE FROM ${this.model.tableName} WHERE ${placeHolderKeys};`;
            console.log(statement);

            let db = new sqlite3.Database(database);
            db.run(statement, Object.values(object), function (err) {
                if (err) {
                    reject({
                        message: err,
                        result: -1
                    });
                }
                resolve(this.changes);
            });
            db.close();
        });
    }

    get(object) {
        return new Promise((resolve, reject) => {
            const values = Object.keys(object);
            const placeHolders = values.map((v) => ` ${v} = ? `).join(' AND ');

            const columns = Object.keys(object).join(',');

            const statement = `SELECT ${columns} FROM ${this.model.tableName} WHERE ${placeHolders};`;
            console.log(statement);

            let db = new sqlite3.Database(database);
            db.all(statement, Object.values(object), function(err, rows) {
                if (err) {
                    reject({
                        message: err,
                        result: -1
                    });
                }
                console.log(rows);
                resolve(rows);
            });
            db.close();
        });
    }
}

module.exports = { DAO, SQLiteDatabase };


//DATOS DE CIFRADO

const crypto = require('crypto');
const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
// Key length is dependent on the algorithm. In this case for aes192, it is
// 24 bytes (192 bits).
// Use async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 24);
// Use `crypto.randomBytes()` to generate a random iv instead of the static iv
// shown here.
const iv = Buffer.alloc(16, 0); // Initialization vector.

// const iv = crypto.randomBytes(16); // Initialization vector.


////////////////////////////////////

/////////// CIFRAR ////////////////
function cipherString(string) {
    return new Promise((resolve) => {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = '';
        cipher.on('readable', () => {
            let chunk;
            while (null !== (chunk = cipher.read())) {
                encrypted += chunk.toString('hex');
            }
        });
        cipher.on('end', () => resolve(encrypted));
        cipher.write(string);
        cipher.end();
    });
}

async function pruebaCifrado() {
    let a = await cipherString('prueba')
    console.log('Codigo cifrado: ' + a)

    let b = await decipherString(a)
    console.log('Codigo descifrado: ' + b)
}



////////////////////////////////////////////////
// pruebaCifrado()

///////////////descifrar///////////////////////

function decipherString(string) {
    return new Promise((resolve) => {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = '';
        decipher.on('readable', () => {
            let chunk;
            while (null !== (chunk = decipher.read())) {
                decrypted += chunk.toString('utf8');
            }
        });
        decipher.on('end', () => resolve(decrypted));
        decipher.write(string, 'hex');
        decipher.end();
    });
}

////////////////////////////////////////////////

async function testAdd() {
    let userDao = new DAO({
        tableName: 'user',
        props: ["user_id", "email", "password"]
    });
    let user = {
        email: "paco@gmail.com",
        password: "paco1234"
    };
    
    let result;
    try {
        result = await userDao.add(user);
    } catch (err) {
        console.error(err.error);
        result = err.result;
    }
    console.log('El resultado de add : ' + result);
}

async function testUpdate() {
    let userDao = new DAO({
        tableName: 'user',
        props: ["user_id", "email", "password"]
    });
    let user = {
        keys: {
            user_id: "1"
        },
        props: {
            email: "paco@gmail.com",
        }
    };
    let result;
    try {
        result = await userDao.update(user);
    } catch (err) {
        console.error('Ha dado error : ' + err.error);
        result = err.result;
    }
    console.log('El resultado de update : ' + result);
}

async function testDelete() {
    let userDao = new DAO({
        tableName: 'user',
        props: ["user_id", "email", "password"]
    });
    let user = {
        user_id: "1"
    };
    let result;
    try {
        result = await userDao.delete(user);
    } catch (err) {
        console.error('Ha dado error : ' + err.error);
        result = err.result;
    }
    console.log('El resultado de borrar : ' + result);
}

// testAdd();
// testUpdate();
// testDelete();