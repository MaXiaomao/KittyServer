'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/classify.test.js', () => {
  it('should Get /classify', () => {
    app.httpRequest()
      .get('/classify')
      .expect('<h3>Hello KittyServer</h3>')
      .expect(200);
  });
});
