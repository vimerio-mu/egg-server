'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '这是UF3换肤平台的服务器主页';
  }
}

module.exports = HomeController;
