const axios = require("axios");

async function fetchDetail(recipe_id,app_id, app_secret) {
    const apiUrl = "https://www.mxnzp.com/api/cookbook/details";
    const response = await axios.get(apiUrl, {
      params: {
        id:recipe_id,
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

async function heatSearch(word,page,app_id, app_secret) {
  const apiUrl = "https://www.mxnzp.com/api/food_heat/food/search";
  const response = await axios.get(apiUrl, {
    params: {
      keyword:word,
      page:page,
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

async function detailSearch(foodid,app_id, app_secret) {
  const apiUrl = "https://www.mxnzp.com/api/food_heat/food/details";
  const response = await axios.get(apiUrl, {
    params: {
      foodId:foodid,
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


//key:9c8ca61f8a51fa70a716144538d0d890
async function getTips(app_id) {
  const apiUrl = "https://api.qqsuu.cn/api/dm-qiaomen";
  const response = await axios.get(apiUrl, {
    params: {
      app_id: app_id,
    },
    // headers: {
    //   "Access-Control-Allow-Headers": "access-control-allow-origin",
    // },
  });
  // 请求成功，返回响应数据
  return response.data;
}

module.exports = {
  fetchDetail,heatSearch,getTips,detailSearch
};