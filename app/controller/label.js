'use strict';

const { Controller } = require('egg');

const additionRule = {
  name: 'string',
};
const removeRule = {
  id: 'int',
};
const updateRule = {
  id: 'int',
  name: 'string',
};

class Label extends Controller {
  async addition() {
    const { ctx } = this;
    ctx.validate(additionRule, ctx.request.body);
    const res = await ctx.service.label.addition(ctx.request.body);
    if (res.affectedRows > 0) {
      ctx.body = { message: '标签添加成功' };
    } else {
      ctx.body = { message: '标签添加异常' };
      ctx.status = 400;
    }
  }
  async remove() {
    const { ctx } = this;
    ctx.validate(removeRule, ctx.request.body);
    const res = await ctx.service.label.remove(ctx.request.body);
    if (res.affectedRows > 0) {
      ctx.body = { message: '标签删除成功' };
    } else {
      ctx.body = { message: '标签删除异常' };
      ctx.status = 400;
    }
  }
  async update() {
    const { ctx } = this;
    ctx.validate(updateRule, ctx.request.body);
    const res = await ctx.service.label.update(ctx.request.body);
    if (res.affectedRows > 0) {
      ctx.body = { message: '标签编辑成功' };
    } else {
      ctx.body = { message: '标签编辑异常' };
      ctx.status = 400;
    }
  }
  async obtain() {
    const { ctx } = this;
    ctx.body = { data: await ctx.service.label.obtain(ctx.query) };
  }
}

module.exports = Label;
