const fsp = require('fs/promises');

module.exports = {
    async init(){
        this.users._users = JSON.parse(await fsp.readFile('./data/users.json'))
    },
    users: {
        _users: null,
        getAll() {
            return this._users;
        },
        add(user) {
            this._users.push(user);
        },
        removeById(id){
            this._users = this._users.filter(user => user.id !== id);
        }
    },
    async saveChanges() {
        await fsp.writeFile('./data/users.json', JSON.stringify(this.users._users));
    },
}