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
    // 获取全路径，将get等请求参数合并到路径里
    buildFullPath(config){
        let {params={},baseUrl='',url=''}=config
        if(!config.params) return baseUrl+url
        let str='?'
        let arr=[]
        for(let key in params){
            arr.push(`${key}=${params[key]}`)
        }
        return baseUrl+url+str+arr.join("&")
    }

    // 请求
    request(config) {
        /**
         * 这是所有Promise数组，前面是请求拦截器，后边是响应拦截器，中间是正常的请求
         * 这里注意不能执行dispatchRequest方法，是在promise中执行的
         */
        let chain = [this.dispatchRequest.bind(this), undefined]
        // 请求拦截器：成对出现
        this.interceptors.request.handlers.forEach(req => {
            chain.unshift(req.fulfilled, req.rejected)
        })
        // 响应拦截器：成对出现
        this.interceptors.response.handlers.forEach(res => {
            chain.push(res.fulfilled, res.rejected)
        })
        let promise = Promise.resolve(config)
        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
            console.log(promise);
        }

        return promise;

    }
    
    // 发送请求
    dispatchRequest(config) {
        return new Promise((resolve, reject) => {
            let { method = 'get', data = {}, url = '', baseUrl = '',params={} } = config
            let http = new XMLHttpRequest();
            http.open(method.toUpperCase(), this.buildFullPath(config), true)  //True 表示脚本会在 send() 方法之后继续执行，而不等待来自服务器的响应。
            http.onload = () => {
                resolve(http.responseText)
            }
            http.send(data)
        })
    }

}

// 根据请求方式，获取参数；注意，里边的方法不能写箭头函数，否则就不能使this指向axios

['delete', 'get', 'head', 'options'].forEach(method => {
    Axios.prototype[method]=function(){
        return this.request({
            method,
            url:arguments[0],
        })
    }
});
['post', 'put', 'patch'].forEach(method=>{
    Axios.prototype[method]=function(){
        return this.request({
            method,
            url:arguments[0],
            data:arguments[1]||{},
            ...arguments[2]||{}  //其他参数
        })
    }
})

// 工具方法，实现b的方法混入a;
// 方法也要混入进去
const utils = {
    extend(a,b, context) {
        for(let key in b) {
            if (b.hasOwnProperty(key)) {
                if (typeof b[key] === 'function') {
                    a[key] = b[key].bind(context);
                } else {
                    a[key] = b[key]
                }
            }

        }
    }
}


// 最终导出axios的方法-》即实例的request方法
function CreateAxios() {
    let axios = new Axios();

    let req = axios.request.bind(axios);
    // 混入方法， 处理axios的request方法，使之拥有get,post...方法
    utils.extend(req, Axios.prototype, axios)
    // 混入属性，处理axios的request方法，使之拥有axios实例上的所有属性
    utils.extend(req, axios)
    return req;
}

let axios =CreateAxios()