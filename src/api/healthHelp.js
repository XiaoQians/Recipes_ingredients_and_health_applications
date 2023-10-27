const axios = require("axios");

async function getsmNews(app_id) {
    const apiUrl = "https://apis.tianapi.com/health/index";
    const response = await axios.get(apiUrl, {
      params: {
        key: app_id,
        num:18,
      },
    });
    // 请求成功，返回响应数据
    return response.data;
  }

  async function healthHelp(keyword,app_id,secret) {
    const apiUrl = "https://route.showapi.com/90-87";
    const response = await axios.get(apiUrl, {
      params: {

        showapi_appid:app_id,
        showapi_sign:secret,
        key:keyword,
      },
  });

// 请求成功，返回响应数据
return response.data;
  }

  module.exports = {
    getsmNews,healthHelp
  };