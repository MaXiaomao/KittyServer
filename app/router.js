'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/api/siteCount', controller.configInfo.quantityCount);
  //
  router.post('/api/article', jwt, controller.article.addition);
  router.delete('/api/article', jwt, controller.article.remove);
  router.put('/api/article', jwt, controller.article.update);
  router.get('/api/article', controller.article.obtain);
  router.get('/api/body', controller.article.body);
  //
  router.post('/api/label', jwt, controller.label.addition);
  router.delete('/api/label', jwt, controller.label.remove);
  router.put('/api/label', jwt, controller.label.update);
  router.get('/api/label', controller.label.obtain);
  //
  router.post('/api/classify', jwt, controller.classify.addition);
  router.delete('/api/classify', jwt, controller.classify.remove);
  router.put('/api/classify', jwt, controller.classify.update);
  router.get('/api/classify', controller.classify.obtain);
  router.put('/api/queue', jwt, controller.classify.queue);
  //
  router.post('/api/folder', jwt, controller.file.folder);
  router.post('/api/file', jwt, controller.file.addition);
  router.delete('/api/file', jwt, controller.file.remove);
  router.get('/api/file', jwt, controller.file.obtain);
  //
  router.post('/api/user', jwt, controller.user.addition);
  router.delete('/api/user', jwt, controller.user.remove);
  router.post('/api/user/login', controller.user.login);
};
