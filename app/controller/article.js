'use strict';

const { Controller } = require('egg');

const additionRule = {
  title: 'string',
  classify: 'int',
  label: 'array',
};
const removeRule = {
  id: 'array',
};
const updateRule = {
  id: 'int',
  title: 'string',
  classify: 'int',
  label: 'array',
};
const obtainRule = {
  page: 'string',
  pageSize: 'string',
};
const bodyRule = {
  id: 'string',
};

class article extends Controller {
  async addition() {
    const { ctx } = this;
    ctx.validate(additionRule, ctx.request.body);
    const res = await ctx.service.article.addition(ctx.request.body);
    if (res.affectedRows > 0) {
      ctx.body = { message: '文章添加成功' };
    } else {
      ctx.body = { message: '文章添加异常' };
      ctx.status = 400;
    }
  }
  async remove() {
    const { ctx } = this;
    ctx.validate(removeRule, ctx.request.body);
    const res = await ctx.service.article.remove(ctx.request.body);
    if (res.affectedRows > 0) {
      ctx.body = { message: '文章删除成功' };
    } else {
      ctx.body = { message: '文章删除异常' };
      ctx.status = 400;
    }
  }
  async update() {
    const { ctx } = this;
    ctx.validate(updateRule, ctx.request.body);
    const res = await ctx.service.article.update(ctx.request.body);
    if (res.affectedRows > 0) {
      ctx.body = { message: '文章编辑成功' };
    } else {
      ctx.body = { message: '文章编辑异常' };
      ctx.status = 400;
    }
  }
  async obtain() {
    const { ctx } = this;
    ctx.validate(obtainRule, ctx.query);
    ctx.body = await ctx.service.article.obtain(ctx.query);
  }
  async body() {
    const { ctx } = this;
    ctx.validate(bodyRule, ctx.query);
    ctx.body = await ctx.service.article.body(ctx.query);
  }
}

module.exports = article;
