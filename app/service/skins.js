const { Service } = require('egg');

class SkinService extends Service {
  // 查所有
  async getAllskins() {
    const { ctx } = this;
    console.log('在这里呈现所有皮肤的对象数组');
    const res = await ctx.model.SkinsModel.find();
    console.log(res);
    return res;
  }
  // 查
  async getSkinByName(name) {
    const { ctx } = this;
    console.log(`在这里呈现name为${name}的皮肤`);
    const res = await ctx.model.SkinsModel.find({ SkinName: name });
    return res;
  }
  // 增
  async postSkin(obj) {
    const { ctx } = this;
    // 存储数据
    // 注意！！！！ctx.model.xxx中xxx指的是model的文件名首字母大写
    const skin = new ctx.model.SkinsModel({
      // 皮肤名
      SkinName: obj.SkinName,
      // 已完成组件列表
      FinishedComponents: obj.FinishedComponents,
      // 设计中组件列表
      DesigningComponents: obj.DesigningComponents,
      // 未修改组件列表
      UnchangeComponents: obj.UnchangeComponents,
      // 所有修改项
      AllSettings: obj.AllSettings,
    });
    // 数据保存到数据库
    skin.save();
    return skin;
  }
  // 删
  async deleteSkin(name) {
    const { ctx } = this;
    console.log(`删除name为${name}的皮肤`);
    const res = await ctx.model.SkinsModel.remove({ SkinName: name });
    return res;
  }
  // 改
  async updateSkin(name, obj) {
    const { ctx } = this;
    console.log(`更新name为${name}的皮肤，更新的值为${obj}`);
    const res = await ctx.model.SkinsModel.update({ SkinName: name }, { $set: obj }, { multi: false });
    return res;
  }
}

module.exports = SkinService;
