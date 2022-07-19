'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const sass = require('sass');
    // 将scss字符串转为css
    const { ctx } = this;
    // const result = sass.compileString(`
    // $base-font-size: 40px;
    // $base-font-size: 44px;
    // $base-font-size2: $base-font-size + 1px;
    // h1 {
    //   font-size: 50px;
    //   code {
    //     font-face: Roboto Mono;
    //   }
    // h2 {
    //   font-size: $base-font-size2
    // }
    // }`);
    const result = sass.compile('app/public/component_custom.scss');
    ctx.body = result.css;
  }
}

module.exports = HomeController;
