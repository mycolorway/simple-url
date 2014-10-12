# Simple Url

Simple Url是彩程Simple UI的一个组件，没有依赖项，可以用来转换url。

#### 使用
通过`simple.url(url)`来调用url组件，返回一个Url对象。

#### Url对象成员

- protocol 协议，没有为空
- host 主机地址
- port 端口
- pathname 路径
- search 为一个对象，保存url中所有query的键值对
- hash 保存url的锚点
- setParam() 设置query，可以传入一个包含多个query的键值对，也可以传入1个query的2个参数
- getParam(name) 获取query名为name的查询数据
- removeParam(name) 移除query名为name的query