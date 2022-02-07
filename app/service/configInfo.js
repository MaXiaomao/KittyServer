'use strict';

const { Service } = require('egg');

class configInfo extends Service {
  async quantityCount() {
    const { app } = this;
    const classify = await app.mysql.select('classify');
    const label = await app.mysql.select('label');
    const article = await app.mysql.query('SELECT * FROM article WHERE (state > 0) AND (date_time <= NOW()) ORDER BY date_time DESC');
    return { classify: classify.length, label: label.length, article: article.length, date_time: article[0].date_time };
  }
}

module.exports = configInfo;
