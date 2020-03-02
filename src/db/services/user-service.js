const { DAO } = require('@manager');

class UserService {
    constructor() {
        this.DAO = new DAO({
            tableName: 'user',
            props: ["user_id", "email", "password"]
        });
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
        return this.DAO.delete(object);
    }

    async exists(object) {
        let user;
        try {
            user = await this.DAO.get(object);
        } catch (err) {
            console.error(err.message);
            user = err.message;
        }
        return Array.isArray(user) && user.length > 0; 
    }
}
module.exports = { UserService };