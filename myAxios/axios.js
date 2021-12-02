class InterceptorManager {
    constructor() {
        this.handlers = [];
    }
    // 添加拦截器：简化版
    use(fulfilled, rejected) {  //
        this.handlers.push({
            fulfilled: fulfilled,
            rejected: rejected
        });
        return this.handlers.length - 1;
    };

    // 删除拦截器
    eject(id) {
        if (this.handlers[id]) {
            this.handlers[id] = null;
        }
    };
}
class Axios {
    constructor() {
        // 拦截器
        this.interceptors = {
            request: new InterceptorManager,        //请求拦截器，数组
            response: new InterceptorManager        //响应拦截器，数组
        }

    }

    // 请求
    request(config) {
        /**
         * 这是所有Promise数组，前面是请求拦截器，后边是响应拦截器，中间是正常的请求
         */
        let chain = [this.dispatchRequest(config), undefined]
        // 请求拦截器：成对出现
        this.interceptors.request.forEach(req => {
            chain.unshift(req.fulfilled, req.rejected)
        })
        // 响应拦截器：成对出现
        this.interceptors.response.forEach(res => {
            chain.push(res.fulfilled, res.rejected)
        })
        let promise = Promise.resolve(config)
        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
        }

        return promise;

    }
    // 发送请求
    dispatchRequest(config) {
        return new Promise((resolve, reject) => {
            let { method = 'get', data = {}, url = '', baseUrl = '' } = config
            let http = new XMLHttpRequest();
            http.open(method.toUpperCase(), baseUrl + url, true)  //True 表示脚本会在 send() 方法之后继续执行，而不等待来自服务器的响应。
            http.onload = () => {
                resolve(http.responseText)
            }
            http.send(data)
        })
    }

}

let methodsArr = ['get', 'delete', 'head', 'options', 'put', 'patch', 'post'];
// 地址栏里参数

['delete', 'get', 'head', 'options'].forEach(method => {
    Axios.prototype[method]=()=>{
        return this.request({
            method,
            url:argument[0],
        })
    }
});