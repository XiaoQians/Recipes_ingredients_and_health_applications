<template>
  <div class="page-container">
    <div class="container-with-margin">
      <div class="input-container">
        <el-input v-model="word" placeholder="搜索症状"></el-input>
        <el-button type="primary" @click="GetHealth"><el-icon><Apple /></el-icon>搜索</el-button>
      </div>
    </div>
    <div class="card-container">
      <el-row type="flex" justify="center" :gutter="20">
        <el-col :span="8" v-for="(Item, index) in findlist" :key="index">
          <el-card :body-style="{ padding: '10px' }" class="recipe-card">
            <div style="padding: 14px;">
              <span>{{ Item.title }}</span>
              <p>关键词: {{ Item.keywords }}</p>
              <p>类别: {{ Item.tname }}</p>
              <p>作者: {{ Item.media_name }}</p>
              <p>发布时间: {{ Item.ctime }}</p>
              <p>简介: {{ Item.intro }}</p>
              <div class="bottom clearfix">
                <a :href="Item.url" target="_blank">
                  <el-button type="text" class="button">阅读全文</el-button>
                </a>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


  <script>
  import {healthHelp} from "@/api/healthHelp"
  export default {
    data() {
      return {
        word:'失眠',
        findlist:[],
      };
    },
    created(){

    },
    methods:{
        async GetHealth(){
            //获取新闻
            const appKey = "1503698"; // API密钥
            const secret ="86bf6e7c333648a0aca7ea700d5b3ba1"

            try {
                const response = await healthHelp(this.word,appKey,secret);
                
                if (response.showapi_res_code === 0) {
                    console.log('成功', response.result);
                    this.findlist = response.showapi_res_body.pagebean.contentlist
                    console.log(this.findlist)
                } else {
                    console.error(response.ret_code+'失败', response.msg);
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
  .page-container {
    background-image: url('@/assets/6.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100vh;
    display: flex; /* 使用Flex布局 */
    justify-content: center; /* 水平居中 */
    /* align-items: center;  */
    flex-direction: column; /* 设置为垂直排列 */
    align-items: center; /* 垂直居中 */
    justify-content: flex-start; /* 顶部对齐 */
  }
  
  .card-container {
    display: flex; /* 使用Flex布局 */
    flex-wrap: wrap; /* 自动换行 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
  }
  
  .recipe-card {
    width: 400px; /* 为卡片设置固定宽度 */
    height: auto; /* 自动高度以适应内容 */
    margin: 10px; /* 在卡片之间添加一些边距 */
  }
  
  .container-with-margin {
    margin-top: 20px; /* 保留搜索框与背景图的间距，可以根据需要调整值 */
  }
  .input-container {
    display: flex;
    align-items: center;
  }
  
  </style>  