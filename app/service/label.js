'use strict';

const { Service } = require('egg');

class Label extends Service {
  async addition(params) {
    const { app } = this;
    return await app.mysql.insert('label', params);
  }
  async remove(params) {
    const { ctx, app } = this;
    return await app.mysql.beginTransactionScope(async conn => {
      await conn.delete('article_label', { label: params.id });
      return await conn.delete('label', params);
    }, ctx);
  }
  async update(params) {
    const { app } = this;
    return await app.mysql.update('label', params);
  }
  async obtain(params) {
    const { app } = this;
    if (params.size) {
      return await app.mysql.select('label', { limit: Number(params.size) });
    }
    return await app.mysql.select('label');
  }
}

module.exports = Label;
