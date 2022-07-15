'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('skins', '/skins', controller.skins);
  router.get('/convert/:id', controller.convert.index);
  router.get('/convert/js/:id', controller.convert.convertToJs);
  router.get('/convert/scss/:id', controller.convert.convertToScss);
  router.get('/test/', controller.test.index);
};

// router.head - 对应 HTTP HEAD 方法。
// router.get - 对应 HTTP GET 方法。
// router.put - 对应 HTTP PUT 方法。
// router.post - 对应 HTTP POST 方法。
// router.patch - 对应 HTTP PATCH 方法。
// router.delete - 对应 HTTP DELETE 方法。
// router.del - 由于 delete 是保留字，故一般会用 router.del 别名。
// router.options - 对应 HTTP OPTIONS 方法。
// router.redirect - 可以对 URL 进行重定向处理，比如把用户访问的根目录路由到某个主页。
// router.all - 对所有的 HTTP 方法都挂载。
