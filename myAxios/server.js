let express = require('express');
let app = express();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/getUrl', (req, res)=>{
    let data = {
        message:"success",
        data:{
            title:"axios-get测试",
            name:"get",
            age:20
        }
    };
    res.json(data);
});
app.post("/postUrl",((req,res)=>{
    let data = {
        message:"success",
        data:{
            title:"axios-post测试",
            name:"post",
            age:30
        }
    };
    res.json(data);
}))
app.listen(10086, function(){
    console.log("服务器启动");
});