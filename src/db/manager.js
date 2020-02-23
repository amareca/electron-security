const table_user = `CREATE TABLE IF NOT EXISTS user ( 
    user_id INTEGER PRIMARY KEY, 
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    createdAt INT NOT NULL,
    updatedAt INT NULL);`

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
       REFERENCES user (user_id) );`

const sqlite3 = require('sqlite3').verbose();
const database = './db/storage.db'

class SQLiteDatabase {
    constructor(){}
    
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
        this.createTables()
    }
    createTables() {
        let tables = [table_user, table_account]
        tables.forEach(t => {
            try {
                let db = new sqlite3.Database(database, sqlite3.CREATE);
                db.run(t)
                db.close()
            } catch (e) {
                console.log(e)
            }
        })
    }
}
module.exports = { SQLiteDatabase }

const joinWithSeparator = (arr, separator = ',', end = separator) =>
    arr.reduce(
        (acc, val, i) =>
            i === arr.length - 2
                ? acc + val + end
                : i === arr.length - 1
                    ? acc + val
                    : acc + val + separator,
        ''
    );

class DAO {
    constructor(model) {
        this.model = model
    }
    add(object) {
        let columns = joinWithSeparator(Object.keys(object));
        let values = joinWithSeparator(Object.values(object));

        const statement = `INSERT INTO ${this.model.tableName} (${columns},createdAt) VALUES(${values},datetime('now'));`

        console.log(statement)

        let db = new sqlite3.Database(database);
        db.run(statement);
        db.close();
    }

    update(object) {
        //la id tiene que ser el primer property
        const id = Object.keys(object)[0]
        const value = Object.values(object)[0]

        let values = ''
        Object.keys(object).slice(1).forEach((val) => {
            values +=  `${val} = ${object[val]},`
        });
        values = values.slice(0,-1);

        const statement = `UPDATE ${this.model.tableName} SET ${values}, updatedAt = datetime('now') WHERE ${id} = ${value};`

        console.log(statement)

        let db = new sqlite3.Database(database);
        db.run(statement);
        db.close();
    }
    delete() {

    }
    get() {

    }
    getAll() {

    }
}




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
async function cipherString(string) {
    return await new Promise((resolve) => {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = '';
        cipher.on('readable', () => {
            let chunk;
            while (null !== (chunk = cipher.read())) {
                encrypted += chunk.toString('hex');
            }
        });
        cipher.on('end', () => {
            resolve(encrypted)
        });
        cipher.write(string);
        cipher.end();
    });
}

async function pruebaCifrado(){
    let a = await cipherString('paco@gmail.com')
    console.log('Codigo cifrado: ' + a)

    let b = await decipherString(a)
    console.log('Codigo descifrado: ' + b)
}



////////////////////////////////////////////////
// pruebaCifrado()

///////////////descifrar///////////////////////

async function decipherString(string) {
    return await new Promise((resolve) => {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = '';
        decipher.on('readable', () => {
            while (null !== (chunk = decipher.read())) {
                decrypted += chunk.toString('utf8');
            }
        });
        decipher.on('end', () => {
            resolve(decrypted)
        });
        decipher.write(string, 'hex');
        decipher.end();
    });
}

////////////////////////////////////////////////

let user = {
    email: "'paco@gmail.com'",
    pass: "'paco1234'"
}
let userDao = new DAO({tableName : 'user'})
console.log(userDao)
// userDao.add(user)

let updateUser = {
    user_id: 1,
    email: "'pepon@gmail.com'"
}

// userDao.update(updateUser)