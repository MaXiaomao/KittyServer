'use strict';

const { Service } = require('egg');

class classify extends Service {
  async addition(params) {
    const { app } = this;
    return await app.mysql.insert('classify', params);
  }
  async remove(params) {
    const { app } = this;
    return await app.mysql.delete('classify', params);
  }
  async update(params) {
    const { app } = this;
    return await app.mysql.update('classify', params);
  }
  async obtain() {
    const { app } = this;
    const classifyRes = await app.mysql.select('classify', {
      orders: [[ 'queue', 'desc' ]],
    });
    for (let i = 0; i < classifyRes.length; i++) {
      const articleRes = await app.mysql.select('article', { where: { classify: classifyRes[i].id } });
      classifyRes[i].total = articleRes.length;
    }
    return classifyRes;
  }
  async queue(params) {
    const { ctx, app } = this;
    return await app.mysql.beginTransactionScope(async conn => {
      for (const v of params.data) {
        await conn.update('classify', v);
      }
      return { success: true };
    }, ctx);
  }
}

module.exports = classify;
