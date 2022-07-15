'use strict';

const Controller = require('egg').Controller;

class ConvertController extends Controller {
  async index() {
    const { ctx } = this;
    const name = ctx.params.id;
    const skinInfo = await ctx.model.SkinsModel.find({ SkinName: name });
    if (skinInfo.length === 0) {
      throw new Error(`找不到name为${name}的皮肤`);
    }
    ctx.body = skinInfo;
  }
  async convertToJs() {
    const { ctx } = this;
    const name = ctx.params.id;
    let res = await ctx.model.SkinsModel.find({ SkinName: name });
    // 如果没有找到皮肤，直接设状态码为500
    // 如果有皮肤，返回的是 string
    if (res[0]) {
      const settings = res[0].AllSettings;
      ctx.body = settings.split(',').join(',\n');
      res = settings.split(',').join(',\n');
    } else {
      ctx.body = `找不到name为${name}的皮肤`;
      throw new Error(`找不到name为${name}的皮肤`);
    }
    return res;
  }
  async convertToScss() {
    const { ctx } = this;
    const name = ctx.params.id;
    let res = await ctx.model.SkinsModel.find({ SkinName: name });
    // 将js变量转为scss变量
    // 如uChartsStatusSuccess: '#4CD6A1';转为$u-charts-status-success: #4CD6A1;
    function jsToScss(js) {
      // 1. 添加开头的$；
      let scss = '$' + js;
      const arr = scss.split(':');
      // 2. 将变量名从小驼峰式改为用-连接
      const nameArr = arr[0].split('');
      const length = nameArr.length;
      for (let i = 1; i < length; i++) {
        if (nameArr[i].toUpperCase() === nameArr[i]) {
          nameArr.splice(i, 0, '-');
          nameArr[i + 1] = nameArr[i + 1].toLowerCase();
        }
      }
      arr[0] = nameArr.join('');
      // 3. 将变量值的引号去掉
      arr[1] = arr[1].replace(/\'/g, '');
      scss = arr.join(':');
      scss += ';';
      return scss;
    }

    if (res[0]) {
      let settings = res[0].AllSettings;
      const scssArr = settings.split(',').map(item => jsToScss(item));
      settings = scssArr.join('\n');
      ctx.body = settings;
      res = settings;
    } else {
      ctx.body = `找不到name为${name}的皮肤`;
      throw new Error(`找不到name为${name}的皮肤`);
    }
    return res;
  }
}

module.exports = ConvertController;
