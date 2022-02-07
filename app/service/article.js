'use strict';

const { Service } = require('egg');

class article extends Service {
  async addition(params) {
    const { ctx, app } = this;
    const label = [ ...params.label ];
    delete params.label;
    return await app.mysql.beginTransactionScope(async conn => {
      const result = await conn.insert('article', params);
      for (const v of label) {
        await conn.insert('article_label', { article: result.insertId, label: v });
      }
      return result;
    }, ctx);
  }
  async remove(params) {
    const { app } = this;
    let result = {};
    for (const v of params.id) {
      await app.mysql.delete('article_label', { article: v });
      result = await app.mysql.delete('article', { id: v });
    }
    return result;
  }
  async update(params) {
    const { app } = this;
    const label = [ ...params.label ];
    delete params.label;
    await this.app.mysql.delete('article_label', { article: params.id });
    for (const v of label) {
      await app.mysql.insert('article_label', { article: params.id, label: v });
    }
    return await app.mysql.update('article', params);
  }
  async obtain(params) {
    const { app } = this;
    const { classify, title, state, label, page, pageSize, admin } = params;
    const pageSizeNum = parseInt(pageSize);
    const pageNum = (parseInt(page) - 1) * pageSizeNum;
    if (admin) {
      const resultLen = await app.mysql.query('SELECT * FROM article  WHERE (classify=? OR ? IS NULL) AND (state=? OR ? IS NULL) AND (title LIKE ?)', [ classify, classify, state, state, `%${title ? title : ''}%` ]);
      const resultArr = await app.mysql.query('SELECT * FROM article  WHERE (classify=? OR ? IS NULL) AND (state=? OR ? IS NULL) AND (title LIKE ?) ORDER BY date_time DESC LIMIT ?, ?', [ classify, classify, state, state, `%${title ? title : ''}%`, pageNum, pageSizeNum ]);
      return { data: await this.labelGet(resultArr), total: resultLen.length };
    }
    if (label) {
      const articleArr = [];
      const resultArr = await app.mysql.select('article_label', { where: { label }, columns: [ 'article' ] });
      for (const v of resultArr) {
        articleArr.push(...await app.mysql.query('SELECT id, title, classify, state, `describe`, img_url, date_time, `like`, scan FROM article WHERE (id=?) AND (state > 0) AND (state < 3) AND (date_time <= NOW()) ORDER BY state DESC, date_time DESC', [ v.article ]));
      }
      return { data: await this.classifyGet(articleArr), total: articleArr.length };
    }
    if (state) {
      const resultLen = await app.mysql.query('SELECT id, title, classify, state, `describe`, img_url, date_time, `like`, scan FROM article WHERE (state > 0) AND (date_time <= NOW()) AND (state=?) ORDER BY state DESC, date_time DESC', [ state ]);
      const resultArr = await app.mysql.query('SELECT id, title, classify, state, `describe`, img_url, date_time, `like`, scan FROM article WHERE (state > 0) AND (date_time <= NOW()) AND (state=?) ORDER BY state DESC, date_time DESC LIMIT ?, ?', [ state, pageNum, pageSizeNum ]);
      return { data: await this.classifyGet(resultArr), total: resultLen.length };
    }
    const resultLen = await app.mysql.query('SELECT id, title, classify, state, `describe`, img_url, date_time, `like`, scan FROM article WHERE (state > 0) AND  (state < 3) AND (date_time <= NOW()) AND (classify=? OR ? IS NULL) AND (title LIKE ?) ORDER BY state DESC, date_time DESC', [ classify, classify, `%${title ? title : ''}%` ]);
    const resultArr = await app.mysql.query('SELECT id, title, classify, state, `describe`, img_url, date_time, `like`, scan FROM article WHERE (state > 0) AND  (state < 3) AND (date_time <= NOW()) AND (classify=? OR ? IS NULL) AND (title LIKE ?) ORDER BY state DESC, date_time DESC LIMIT ?, ?', [ classify, classify, `%${title ? title : ''}%`, pageNum, pageSizeNum ]);
    return { data: await this.classifyGet(resultArr), total: resultLen.length };
  }
  async body(params) {
    const { app } = this;
    const resultObj = await app.mysql.get('article', { id: params.id });
    const resultArr = await app.mysql.select('article_label', {
      where: { article: resultObj.id },
      columns: [ 'label' ],
    });
    const labelArr = [];
    for (const v of resultArr) {
      labelArr.push(await app.mysql.get('label', { id: v.label }));
    }
    return { ...resultObj, label: labelArr };
  }
  async labelGet(resultArr) {
    const dataObject = [];
    for (const v of resultArr) {
      const label = [];
      const results = await this.app.mysql.select('article_label', { where: { article: v.id } });
      results.forEach(v => {
        label.push(v.label);
      });
      dataObject.push({ ...v, label });
    }
    return dataObject;
  }
  async classifyGet(resultArr) {
    const { app } = this;
    const dataObject = [];
    for (const v of resultArr) {
      const classify = await app.mysql.get('classify', { id: v.classify });
      dataObject.push({ ...v, classifyName: classify.name });
    }
    return dataObject;
  }
}

module.exports = article;
