<template>
  <div class="news-container">
    <el-row :gutter="20">
      <el-col :span="8" v-for="(newsItem) in newsList" :key="newsItem.id" :offset="0" style="margin-bottom: 50px;">
        <el-card :body-style="{ padding: '10px' }">
          <img :src="newsItem.picUrl" class="image">
          <div style="padding: 14px;">
            <span>{{ newsItem.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ newsItem.ctime }}</time>
              <a :href="newsItem.url" target="_blank">
                <el-button type="text" class="button">阅读全文</el-button>
              </a>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  </template>
  
  <script>
  import {getsmNews} from "@/api/healthHelp"
  export default {
    data() {
      return {
        newsList: [
        ]
      };
    },
    created(){
        this.GetNews();
        console.log("获取了新闻")
    },
    methods:{
        async GetNews(){
            //获取新闻
            const appKey = "bf8587f06a7e107b93500051c1c5c81c"; // API密钥
                try {
                const response = await getsmNews(appKey);
                if (response.code === 200) {
                    console.log('成功', response.result);
                    // 请求成功，将数据存入Detail
                    this.newsList= response.result.newslist;
                } else {
                    console.error('失败', response.msg);
                }
                } catch (error) {
                // 请求异常，输出错误信息
                console.log("请求异常:", error);
                }
        }
    }
  }
  </script>
  
  <style scoped>
.news-container {
  background-image: url('../assets/news.jpg');
  background-size: cover; /* 控制背景图片的大小，以覆盖整个容器 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  background-attachment: fixed; /* 可选，使背景图片固定不滚动 */
  /* 添加其他背景属性，如颜色或透明度，根据需要 */
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both;
  }
  </style>
  