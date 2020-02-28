const { DAO } = require('@manager');

class UserService {
    constructor() {
        this.DAO = new DAO({ tableName: 'user' });
    }

    async add(object) {
        let result;
        try {
            result = await userDao.add(user);
        } catch (err) {
            console.error(err.error);
            result = err.result;
        }
        return this.DAO.add(object);
    }

    async update(object) {
        let result;
        try {
            result = await this.DAO.update(object);
        } catch (err) {
            console.error(err.error);
            result = err.result;
        }
        return result;
    }

    async get(object) {
        let result;
        try {
            result = await this.DAO.get(object);
        } catch (err) {
            console.error(err.error);
            result = err.result;
        }
        return result;
    }

    async delete(object) {
        let result;
        try {
            result = await this.DAO.delete(object);
        } catch (err) {
            console.error(err.error);
            result = err.result;
        }
        return result;
    }

    async exists(object) {
        let user;
        try {
            user = await this.DAO.get(object);
        } catch (err) {
            console.error(err.error);
            user = err.result;
        }
        return Array.isArray(user) && user.length > 0; 
    }
}
module.exports = { UserService };