const axios = require("axios");

async function searchRecipes(keyword, page,app_id, app_secret) {
    const apiUrl = "https://www.mxnzp.com/api/cookbook/search";
    const response = await axios.get(apiUrl, {
      params: {
        keyword: keyword,
        page: page,
        app_id: app_id,
        app_secret: app_secret,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    // 请求成功，返回响应数据
    return response.data;
}

module.exports = {
  searchRecipes
};