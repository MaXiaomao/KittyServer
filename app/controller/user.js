'use strict';

const { Controller } = require('egg');
const additionRule = {
  name: 'string',
  password: 'string',
};
const removeRule = {
  id: 'int',
};
const loginRule = {
  name: 'string',
  password: 'string',
};

class User extends Controller {
  async addition() {
    const { ctx } = this;
    ctx.validate(additionRule, ctx.request.body);
    const res = await ctx.service.user.addition(ctx.request.body);
    if (res.affectedRows > 0) {
      ctx.body = { message: '用户添加成功' };
    } else {
      ctx.body = { message: '用户添加异常' };
      ctx.status = 400;
    }
  }
  async remove() {
    const { ctx } = this;
    ctx.validate(removeRule, ctx.request.body);
    const res = await ctx.service.user.remove(ctx.request.body);
    if (res.affectedRows > 0) {
      ctx.body = { message: '用户删除成功' };
    } else {
      ctx.body = { message: '用户删除异常' };
      ctx.status = 400;
    }
  }
  async login() {
    const { ctx } = this;
    const res = await ctx.service.user.login(ctx.request.body);
    if (res) {
      ctx.body = { token: res };
    } else {
      ctx.body = { message: '用户名或密码错误' };
      ctx.status = 400;
    }
  }
}

module.exports = User;
