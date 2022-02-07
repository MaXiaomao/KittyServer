'use strict';

const { Service } = require('egg');

class User extends Service {
  async addition(params) {
    const { app } = this;
    const newPwd = app.cryptPwd(params.password);
    return await app.mysql.insert('user', { ...params, password: newPwd });
  }
  async remove(params) {
    const { app } = this;
    return await app.mysql.delete('user', params);
  }
  async login(params) {
    const { app } = this;
    const userData = await app.mysql.get('user', { name: params.name });
    if (userData !== null) {
      const newPwd = app.cryptPwd(params.password);
      if (newPwd === userData.password) {
        await app.mysql.update('user', { ...userData, login_time: app.currentTime() });
        return app.jwt.sign({
          username: userData.name,
        }, app.config.jwt.secret);
      }
    }
    return false;
  }
}

module.exports = User;
