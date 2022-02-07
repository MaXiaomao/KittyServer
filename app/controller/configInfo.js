'use strict';

const { Controller } = require('egg');

class configInfo extends Controller {
  async quantityCount() {
    const { ctx } = this;
    ctx.body = await ctx.service.configInfo.quantityCount();
  }
}

module.exports = configInfo;
