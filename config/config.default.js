/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1640767044278_4741';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  config.ddcc = {
    match: '/api',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };


  // config.security = {
  //   csrf: {
  //     type: 'referer',
  //     refererWhiteList: [ '' ],
  //   },
  // };

  config.mysql = {
    app: true,
    agent: false,
    client: {
      host: '',
      port: '',
      user: '',
      password: '',
      database: '',
    },
  };

  config.jwt = {
    secret: 'QLBCRLkKmwgZac0C3Jf9212121',
  };

  config.multipart = {
    mode: 'file',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return { ...config, ...userConfig };
};
