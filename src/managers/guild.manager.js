const Document =  require('../structures/document.js');
const UsersManager = require('./users.manager.js');


class GuildManager extends Document {

  /**
   * Manages the guild doc
   * Path: db/guilds/{guildID}
   * @param {object} data field values of doc
   * @param {string} data.id id of doc
   * @property {string} id id of doc
   * @property {string} path absolute path leading to document
   * @property {UsersManager} users manage users
   */
  constructor(data) {
    super(`guilds/${data.id}`);
    Object.assign(this, data);
    this.users = new UsersManager(data.id);
  }

  
  /**
   * Updates field values of docs
   * @param {object} data field values of doc
   */
  async update(data) {
    await this.reference().set(data, {merge: true});
  }


  /**
   * Sets archived field to true
   */
  async archive() {
    await this.update({"archived": true});
  }


  /**
   * Sets archived field to false
   */
  async unarchive() {
    await this.update({"archived": false});
  }
}

module.exports = GuildManager;