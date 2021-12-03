# axios
axios源码解析

## 前言
&nbsp;&nbsp;&nbsp;&nbsp;axios是日常经常使用到的HTTP库，可以工作于node和浏览器中，短小精悍。

&nbsp;&nbsp;&nbsp;&nbsp;作为一名普通的前端开发，源码学习很重要，但一般都是看过没多久，长时间不用就忘掉；所以，细节不重要，重要的是记住“解题思路”。

## axios源码文件目录
![image](https://user-images.githubusercontent.com/34472955/144205651-9f1b76ab-3762-436c-bd43-c6ce78326a21.png)
![image](https://user-images.githubusercontent.com/34472955/144210617-f04aeed8-816e-4d37-88ef-70aaed068b42.png)

## axios原理  

ps：这里要添原理图片

&nbsp;&nbsp;&nbsp;&nbsp;核心思路是将请求拦截器、请求、响应拦截器成对儿放到一个数组中，然后将成对儿的他们分别作为Promise的resolve和reject方法。

&nbsp;&nbsp;&nbsp;&nbsp;假如客户有一个请求拦截器、响应拦截器，这样的话，就有三个Promise（请求拦截器算一对儿、请求算一对儿、响应拦截器算一对儿），这样形成一个Promise链条（request方法导出的也是一个promise）。





