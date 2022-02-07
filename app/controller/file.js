'use strict';

const { Controller } = require('egg');

const folderRule = {
  path: 'string',
};
const additionRule = {
  path: 'string',
};
const removeRule = {
  path: 'string',
};
const obtainRule = {
  path: 'string',
};

class File extends Controller {
  async folder() {
    const { ctx } = this;
    ctx.validate(folderRule, ctx.request.body);
    if (await ctx.service.file.folder(ctx.request.body)) {
      ctx.body = { message: '文件夹创建成功' };
    } else {
      ctx.body = { message: '文件夹创建异常' };
      ctx.status = 400;
    }
  }
  async addition() {
    const { ctx } = this;
    ctx.validate(additionRule, ctx.request.body);
    if (await ctx.service.file.addition(ctx.request)) {
      ctx.body = { message: '文件上传成功' };
    } else {
      ctx.body = { message: '文件上传异常' };
      ctx.status = 400;
    }
  }
  async remove() {
    const { ctx } = this;
    ctx.validate(removeRule, ctx.request.body);
    if (await ctx.service.file.remove(ctx.request.body)) {
      ctx.body = { message: '文件删除成功' };
    } else {
      ctx.body = { message: '当前文件夹不为空' };
      ctx.status = 400;
    }
  }
  async obtain() {
    const { ctx } = this;
    ctx.validate(obtainRule, ctx.query);
    ctx.body = await ctx.service.file.obtain(ctx.query);
  }
}

module.exports = File;
