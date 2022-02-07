'use strict';

const Crypto = require('crypto');

module.exports = {
  currentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  },
  cryptPwd(value) {
    const hash = Crypto.createHash('md5');
    return hash.update(value).digest('hex');
  },
};
