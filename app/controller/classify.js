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

class Classify extends Controller {
  async addition() {
    const { ctx } = this;
    ctx.validate(additionRule, ctx.request.body);
    const res = await ctx.service.classify.addition(ctx.request.body);
    if (res.affectedRows > 0) {
      ctx.body = { message: '分类添加成功' };
    } else {
      ctx.body = { message: '分类添加异常' };
      ctx.status = 400;
    }
  }
  async remove() {
    const { ctx } = this;
    ctx.validate(removeRule, ctx.request.body);
    const res = await ctx.service.classify.remove(ctx.request.body);
    if (res.affectedRows > 0) {
      ctx.body = { message: '分类删除成功' };
    } else {
      ctx.body = { message: '分类删除异常' };
      ctx.status = 400;
    }
  }
  async update() {
    const { ctx } = this;
    ctx.validate(updateRule, ctx.request.body);
    const res = await ctx.service.classify.update(ctx.request.body);
    if (res.affectedRows > 0) {
      ctx.body = { message: '分类编辑成功' };
    } else {
      ctx.body = { message: '分类编辑异常' };
      ctx.status = 400;
    }
  }
  async obtain() {
    const { ctx } = this;
    ctx.body = { data: await ctx.service.classify.obtain() };
  }
  async queue() {
    const { ctx } = this;
    const result = await ctx.service.classify.queue(ctx.request.body);
    if (result.success) {
      ctx.body = { message: '排序编辑成功' };
    } else {
      ctx.body = { message: '排序编辑异常' };
      ctx.status = 400;
    }
  }
}

module.exports = Classify;
