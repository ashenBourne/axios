# axios
&nbsp;&nbsp;&nbsp;&nbsp;axios源码解析

## 前言
&nbsp;&nbsp;&nbsp;&nbsp;axios是日常经常使用到的HTTP库，可以工作于node和浏览器中，短小精悍。

&nbsp;&nbsp;&nbsp;&nbsp;作为一名普通的前端开发，源码学习很重要，但一般都是看过没多久，长时间不用就忘掉；所以，记住“解题思路”比较重要。

## 项目文件目录
/axios axios源码

/myAxios 自己写的丐版axios

    /axios.js   //axios主要功能代码
    /index.html     //请求实例
    /serve.js   //node做的本地简陋服务

## axios源码文件目录

axios源码中，比较重要的是core文件夹

![image](https://user-images.githubusercontent.com/34472955/144210617-f04aeed8-816e-4d37-88ef-70aaed068b42.png)

&nbsp;&nbsp;&nbsp;&nbsp;可以直接看Axios.js的内容，具体的注释和仿写都可以在myAxios中看。

## myAxios原理  

![axios原理](https://user-images.githubusercontent.com/34472955/144536263-2c514ff5-be83-4bf3-a6f9-2bd09fb552b7.png)


&nbsp;&nbsp;&nbsp;&nbsp;核心思路是将请求拦截器、请求、响应拦截器成对儿放到一个数组中，然后将成对儿的他们分别作为Promise的resolve和reject方法。

&nbsp;&nbsp;&nbsp;&nbsp;假如客户有一个请求拦截器、响应拦截器，这样的话，就有三个Promise（请求拦截器算一对儿、请求算一对儿、响应拦截器算一对儿），这样形成一个Promise链条（request方法导出的也是一个promise）。

&nbsp;&nbsp;&nbsp;&nbsp;最后实例化一个axios，将request导出，在该方法上，将Axios所有别名和属性都绑定下……






