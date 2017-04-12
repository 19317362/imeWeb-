# <center>imeWeb 改版UI</center>

## <center>如有补充，请自行添加</center>

### 目录结构及文件说明

**1. 目录结构**
```
imeWeb
│
├─assets   			//资源存放位置(注:存放都是模板里文件)	
│  └─global
│    └─plugins		//插件存放位置
├─css	  			//CSS存放位置
├─example    		//一些组件例子
├─fonts				//iconfont字体图标文件
├─i18n				//i8n需要的资源文件和其他组件需要的多语言配置文件
├─img 				//图片存放位置
└─js
    ├─page			//存放每个页面的函数(注:每个页面都创建一个新的文件)
    └─templates		//页面模板存放位置,每个页面都有一个文件夹存放
        ├─common	//共有模板：header、sidebar、footer,以及共有模板的数据绑定区域
        ├─home		//首页	
        └─myTask	//我的任务
```
**2. 文件说明**

1. `js/app.js`
> 全局函数写在当前文件下  
> imeWeb.page 路由初始化函数设置
> imeWeb.router 路由设置 
> 局部模板映射  

2. `js/handlebarsHelper.js`
> handlebarsHelper统一写在当前文件中  

3. `js/i18n.js`
> i18n的初始化方法和一些自定义函数

4. `js/login.js`
> 登陆页面的表单验证

5. `js/templates.js`
> handlebars所有模板编译后的文件

6. `js/url.js`
> 所有的请求路径

7. `js/page/*`
> 每个页面的初始化和自定义函数

8. `js/templates/*`
> 每个页面的模板和通用组件



### 命名规范
1. css文件
> 英文命名, 后缀.css. 通用base.css, 首页index.css, 其他页面依实际模块需求命名

2. js文件
> 每个页面仅声明一个全局变量 (例：var imeWeb = imeWeb || {};)
> 只有一个初始化函数(例：pageHome.init)

2. 书写规范
> - 每个标签都要有开始和结束，且要有正确的层次，排版有规律工整(注：缩进tab width为4个空格)
> - 命名不缩写，除非一看就明白的单词，id命名使用下划线'_',class命名使用连字符'-'
> - JavaScript变量命名采用小写字母开头的驼峰式写法
> - 给每一个表格和表单加上一个唯一的、结构标记id
> - 在页面中尽量避免使用style属性,即style="…"
> - 以背景形式呈现的图片, 尽量写入css样式中
> - 特殊符号使用: 尽可能使用字符实体替代


### 插件实例
1. Handlebars(./Handlebars/*)
> 实例：
> [基本](./Handlebars/each_base.html)
> [helper](./Handlebars/each_helper.html)
> [Partials](./Handlebars/Partials.html)

