# server说明

## 结构

项目主要有两个controller：①skins；②convert

skins主要负责皮肤相关的增删改查

convert主要负责将皮肤配置项转为特定的格式

## skins

**以 RESTful 的方式来定义路由**

| Method | Path       | Controller.Action             |
| ------ | ---------- | ----------------------------- |
| GET    | /skins     | app.controllers.skins.index   |
| GET    | /skins/:id | app.controllers.skins.show    |
| POST   | /skins     | app.controllers.skins.create  |
| PUT    | /skins/:id | app.controllers.skins.update  |
| DELETE | /skins/:id | app.controllers.skins.destroy |

覆盖了皮肤的增删改查和全部查看

### 数据格式

![image-20220713152856917](C:\Users\vimerio\AppData\Roaming\Typora\typora-user-images\image-20220713152856917.png)

## convert

### 数据上传

在前端项目中，用store存储所有的settings，根据处于哪个组件划分module，一个module存储一个组件的settings

然后在更改任何一个state的属性值时，立即向服务器发送所有的store.state的值，保存/更新AllSettings

### 转为文件

服务器存储的AllSettings的格式同scss，如下：

```scss
$color-default-one: #F7F7F7;$color-default-two: #F2F2F2;$color-default-three: #EDEDED;$color-default-four: #E6E6E6;$color-default-five: #D9D9D9;$color-default-six: #999;
```

在`convert/js/:name`中将存储的AllSettings的格式转换为js文件所需的格式，如下：

```js
colorDefaultOne: '#F7F7F7';
colorDefaultTwo: '#F2F2F2';
colorDefaultThree: '#EDEDED';
colorDefaultFour: '#E6E6E6';
colorDefaultFive: '#D9D9D9';
colorDefaultSix: '#999';
```

同时提供转换为scss文件的api，`convert/scss/:name`

```js
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
```

这里传回的都是字符串，前端需要读取内容并指定后缀名下载

## 关于CSS的转换

观察`custom.scss`文件，可以发现其中import了许多文件，最后将其中的变量重写覆盖，最后作用到具体的html标签中

[sass官方](https://sass-lang.com/documentation/js-api/)中scss转css的方法有以下两种：`compile`和`compileString`

```js
const sass = require('sass');
// 将scss文件转为css
const result = sass.compile("style.scss");
console.log(result.css);
// 将字符串转为css
const result = sass.compileString(`
h1 {
  font-size: 40px;
  code {
    font-face: Roboto Mono;
  }
}`);
console.log(result.css);
```

如果用文件：优点：可以直接支持import其他文件（应该是可以正常解析的）；缺点：需要额外直接转存上文生成的css文件

如果用字符串：优点：不需要文件操作的任何支持，直接生成；缺点：需要将其他import的文件先处理成字符串然后和上文生成的scss字符串进行拼接（可能会有顺序上的问题）

最后还是生成css字符串而不是文件，让前端自己处理下载格式