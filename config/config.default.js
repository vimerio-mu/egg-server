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
  const config = exports = {
    // 解决跨域
    security: {
      csrf: {
        enable: false,
      }, // 必须加 否则： 403 Forbidden message: "missing csrf token"
      // domainWhiteList: [ '*' ]
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    // mongoose数据库配置
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1:27017/TEST',
        // 其他配置警告解除方法
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      },
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1657674555706_3996';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  return {
    ...config,
    ...userConfig,
  };
};
