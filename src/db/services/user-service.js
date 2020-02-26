const { DAO } = require('@manager');

class UserService {
    constructor() {
        this.DAO = new DAO({ tableName: 'user' });
    }

    add(object) {
        return this.DAO.add(object);
    }

    update(object) {
        return this.DAO.update(object);
    }

    get(object) {
        return this.DAO.get(object);
    }

    delete(object) {

    }

    async exists(object) {
        let user = await this.DAO.get(object);
        return Array.isArray(user) && user.length > 0; 
    }
}
module.exports = { UserService };