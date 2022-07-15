'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const sass = require('sass');
    // 将字符串转为css
    const result = sass.compileString(`
    $base-font-size: 40px;
    $base-font-size: 44px;
    h1 {
      font-size: 50px;
      code {
        font-face: Roboto Mono;
      }
    h2 {
      font-size: $base-font-size
    }
    }`);
    const { ctx } = this;
    ctx.body = result.css;
  }
}

module.exports = HomeController;
