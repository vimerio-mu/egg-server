'use strict';

const Controller = require('egg').Controller;

class SkinController extends Controller {
  // RESTful Api 风格
  // 查看所有skin
  async index() {
    const { ctx } = this;
    const skinInfo = await ctx.service.skins.getAllskins();
    if (skinInfo.length === 0) {
      throw new Error('目前没有任何皮肤');
    }
    ctx.body = skinInfo;
  }
  // 查看某个skin
  async show() {
    const { ctx } = this;
    const skinId = ctx.params.id;
    const skinInfo = await ctx.service.skins.getSkinByName(skinId);
    if (skinInfo.length === 0) {
      throw new Error(`找不到name为${skinId}的皮肤`);
    }
    ctx.body = skinInfo;
  }
  // 新增skin
  async create() {
    const { ctx } = this;
    const obj = ctx.request.body;
    try {
      const skinInfo = await ctx.service.skins.postSkin(obj);
      ctx.body = skinInfo;
      return skinInfo;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  // 前端使用：
  // this.axios
  // .post("http://localhost:7001/skins/", store)
  // .then(res => {
  //   console.log(res);
  // });
  // 更新皮肤
  async update() {
    const { ctx } = this;
    const skinId = ctx.params.id;
    const obj = ctx.request.body;
    const skinInfo = await ctx.service.skins.updateSkin(skinId, obj);
    ctx.body = skinInfo;
  }
  // 删除皮肤
  async destroy() {
    const { ctx } = this;
    const skinId = ctx.params.id;
    const skinInfo = await ctx.service.skins.deleteSkin(skinId);
    ctx.body = skinInfo;
  }
}

module.exports = SkinController;
