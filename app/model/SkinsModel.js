module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const SkinsSchema = new Schema({
    // 皮肤名
    SkinName: { type: String },
    // 已完成组件列表
    FinishedComponents: { type: Array },
    // 修改中组件列表
    DesigningComponents: { type: Array },
    // 未修改组件列表
    UnchangeComponents: { type: Array },
    // 所有修改项
    AllSettings: { type: String },
  });
  return mongoose.model('SkinsModel', SkinsSchema, 'Skins');
};
/* 注以上代码
定义了一张名为Skins的数据表
该表的键值名有：
        SkinName
        FinishedComponents
        DesigningComponents
        UnchangeComponents
        AllSettings
mongoose中合法的数据类型有:
*   String
*   Number
*   Date
*   Buffer
*   Boolean
*   Mixed
*   ObjectId
*   Array
*   Decimal128
*/
