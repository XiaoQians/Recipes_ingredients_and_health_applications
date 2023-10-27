// 在 Express.js 服务器上设置跨域请求
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // 允许所有域名访问，但在生产环境中应该更加严格
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
  