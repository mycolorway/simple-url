# Simple Url

Simple Url是彩程Simple UI的一个组件，没有依赖项，可以用来转换url。

### 使用方法
首先，需要在页面里引用相关脚本

```html
<script type="text/javascript" src="path/to/url.js"></script>

```

通过url方法，实例化Url对象

```js
simple.url(url)

```

### API 文档

####初始化选项

__url__

String，需要转换的URL字符串

#### Url对象成员

__protocol__

String，协议，默认为空
 
__host__
 
String，主机地址
 
__port__
 
Number，端口
 
__pathname__
 
String，路径
 
__search__
 
Object，保存url中所有query的键值对
 
__hash__

String，保存url的锚点

#### 方法

__setParam()__ Object

设置query，可以传入一个包含多个query的键值对，也可以传入1个query的2个参数
 
__getParam(name)__

获取query名为name的数据
 
__removeParam(name)__

移除query名为name的query