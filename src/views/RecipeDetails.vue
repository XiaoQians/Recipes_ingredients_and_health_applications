<template>
    <div class="common-layout">
      <el-container>
        <el-header>
          <span style="font-size: 24px;">今天吃：{{name}}~</span>
          <el-divider direction="vertical" />
          <span style="font-size: 24px;">难度为{{ difficulty }}</span>
          <el-divider direction="vertical" />
          <span style="font-size: 24px;">预计耗时{{ duration }}</span>
        </el-header>
        <div class="recipe-container">
    <!-- 左半边放置两个卡片 -->
    <div class="left-side">
        <el-aside width="400px" style="margin-left: 350px;">
            <div height="500px"  style="margin-bottom: 50px;">

              <el-card class="box-card">
              <template v-slot:header>
                <div class="clearfix">
                  <span>要准备的食材：</span>
                </div>
              </template>
              <el-scrollbar height="500px" style="margin: 0;padding: 0;">
                    <p v-for="item in ingredient" :key="item" class="scrollbar-demo-item">{{ item.name }}{{ item.amount }}</p>
                </el-scrollbar>
            </el-card>
            
            </div>

            

            <el-card class="box-card">
              <template v-slot:header>
                <div class="clearfix">
                  <span>小贴士：</span>
                </div>
              </template>
              {{ dailyTips }}
            </el-card>

          </el-aside>
    </div>

    <!-- 右半边放置做菜步骤 -->
    <div class="right-side">
      <div class="demo-collapse" style="margin-left: 100px;">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item :title="item.step" :name="item.step" v-for="item in instruction" :key="item.step">
            <div>
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="item.url" class="image">
                    <div style="padding: 14px;">
                      <div class="bottom clearfix">
                        <time class="time">{{ item.text }}</time>
                      </div>
                    </div>
                  </el-card>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
      </el-container>
    </div>
  </template>

  <script>
  import { fetchDetail,getTips } from "@/api/recipeDetails";
  import { ref } from 'vue'
  import { mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        reId: null,
        Detail: null,
        name:null,
        ingredient:[],
        instruction:[],
        activeName : ref('1'),
        dailyTips:null,
        count:0,
        duration:null,
        difficulty:null,
      };
    },
    computed: {
    ...mapState(['ingredienT']),
    ...mapState(['recipeID']),
    },
    mounted() {
      this.reId = this.recipeID
      console.log("接收到"+this.reId)
      this.fetchrecipeDetail();
    },
    created() {    
      
      this.Gettip();
    },
    methods: {
      async fetchrecipeDetail() {
        const appKey = "nis8baoknhkznlhe"; // API密钥
        const appSecret = "1aoXHVf7UMiBJWtTiH2OtkC0jJ0VtdYP";
        try {
          const response = await fetchDetail(this.reId, appKey, appSecret);
            console.log(response.data)
          if (response.code === 1) {
            console.log('成功', response.data);
            // 请求成功，将数据取出
            this.Detail = response.data;
            this.ingredient = this.Detail.ingredient;
            this.instruction = this.Detail.instruction;
            this.name = this.Detail.name
            this.duration = this.Detail.duration
            this.difficulty = this.Detail.difficulty
            console.log("食材存之前是这样")
            console.log(this.ingredient)
            this.updateIngre(this.ingredient); // Set ingredient in the store
          } else {
            console.error('失败', response.msg);
          }
        } catch (error) {
          // 请求异常，输出错误信息
          console.log("请求异常:", error);
        }
      },
      
      async Gettip() {
        const appKey = "9c8ca61f8a51fa70a716144538d0d890"; // API密钥
        try {
          const response = await getTips(appKey);
            console.log(response.data.content)
          if (response.code === 200) {
            console.log('成功', response.data);
            // 请求成功，将数据存入Detail
            this.dailyTips= response.data.content;
          } else {
            console.error('失败', response.msg);
          }
        } catch (error) {
          // 请求异常，输出错误信息
          console.log("请求异常:", error);
        }
      },
      load () {
        this.count += 2
      },
      ...mapActions(['updateIngre']),
    },
  };
  </script>
  
  <style scoped>

.common-layout{
  background-image: url('../assets/5.png');
  background-size: cover; /* 控制背景图片的大小，以覆盖整个容器 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  background-attachment: fixed;
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 400px; 
    background-image: url('../assets/tip.png');
    background-size: cover;
    border-radius: 10px

  }
  
  .demo-collapse{
    max-width: 400px;
  }

  .time {
    font-size: 13px;
    color: #000000;
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
      clear: both
  }
  
  .recipe-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.left-side {
  width: 50%; /* 左半边占屏幕的50%宽度 */
}

.right-side {
  width: 50%; /* 右半边占屏幕的50%宽度 */
}

 </style>
  