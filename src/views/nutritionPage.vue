<template>
  <div class="background-container">
    <el-tabs :tab-position="tabPosition">
    <el-tab-pane v-for="item in ingredient" :key="item.name" :label="item.name">
      <el-button  type="primary" round @click="HeatSearch(item.name)" plain><el-icon><Burger /></el-icon>看看{{ item.name }}的营养</el-button>

      <el-row :gutter="20">
        <el-col :span="8" v-for="(cardItem, index) in list" :key="index">
          <el-card :header="cardItem.name" class="card-item">
            <!-- 在 el-card 中展示数据 -->
            <p>健康等级：{{ cardItem.healthLevel }}</p>
            <p>卡路里：{{ cardItem.calory }}</p>

            <el-button
              plain
              @click="open2(cardItem.foodId,cardItem.name)">
              查看详情
            </el-button>
          </el-card>          
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</div>
  </template>
  <script>
    import { heatSearch,detailSearch } from "@/api/recipeDetails";
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                ingredient:[],
                tabPosition: 'left',
                food:null,
                list:[],
                nutrlist:[],
                visible: false,
                name:null,
            };
        },
        computed: {
            ...mapState(['ingredienT']), // 映射 getIngredient 到组件的 computed 属性
        },
        mounted(){
            this.ingredient = this.ingredienT;
            console.log(this.ingredient);
        },
        created() {
    // 在组件创建时，从 Vuex store 中获取 ingredient 数据并存储到组件的 data 属性中            
        },
        methods: {
            async HeatSearch(food) {
                console.log("点了一下")
                const appKey = "nis8baoknhkznlhe"; // API密钥
                const appSecret = "1aoXHVf7UMiBJWtTiH2OtkC0jJ0VtdYP";
                try {
                const response = await heatSearch(food,1, appKey, appSecret);
                    console.log(response.data)
                if (response.code === 1) {
                    console.log('成功查看营养成分', response.data);
                    // 请求成功，将数据存入Detail
                    this.list = response.data.list;
                } else {
                    console.error('失败查看营养成分', response.msg);
                }
                } catch (error) {
                // 请求异常，输出错误信息
                console.log("请求异常:", error);
                }
            },
            async DetailSearch(id){
              console.log("点了一下2")
                const appKey = "nis8baoknhkznlhe"; // API密钥
                const appSecret = "1aoXHVf7UMiBJWtTiH2OtkC0jJ0VtdYP";
                try {
                const response = await detailSearch(id, appKey, appSecret);
                    console.log(response.data)
                if (response.code === 1) {
                    console.log('成功查看详情', response.data);
                    // 请求成功，将数据存入Detail
                    this.nutrlist = response.data;
                } else {
                    console.error('失败查看详情', response.msg);
                }
                } catch (error) {
                // 请求异常，输出错误信息
                console.log("请求异常:", error);
                }
            },
            open2(id,name) {              
              this.DetailSearch(id)
              console.log("营养成分表"+this.nutrlist)
              this.$notify({
                title: name, // 使用食物名称作为标题
                message: this.generateNutritionMessage(this.nutrlist), // 调用辅助函数生成消息内容
                duration: 0
              });
            },

            generateNutritionMessage(nutrition) {
              let message = '';

              if (nutrition.protein) {
                message += `蛋白质: ${nutrition.protein} ${nutrition.proteinUnit}\n`;
              }

              if (nutrition.fat) {
                message += `脂肪: ${nutrition.fat} ${nutrition.fatUnit}\n`;
              }

              if (nutrition.saturatedFat) {
                message += `饱和脂肪: ${nutrition.saturatedFat} ${nutrition.saturatedFatUnit}\n`;
              }

              if (nutrition.fattyAcid) {
                message += `反式脂肪: ${nutrition.fattyAcid} ${nutrition.fattyAcidUnit}\n`;
              }

              if (nutrition.mufa) {
                message += `单不饱和脂肪: ${nutrition.mufa} ${nutrition.mufaUnit}\n`;
              }

              if (nutrition.pufa) {
                message += `多不饱和脂肪: ${nutrition.pufa} ${nutrition.pufaUnit}\n`;
              }

              if (nutrition.cholesterol) {
                message += `胆固醇: ${nutrition.cholesterol} ${nutrition.cholesterolUnit}\n`;
              }

              if (nutrition.carbohydrate) {
                message += `碳水化合物: ${nutrition.carbohydrate} ${nutrition.carbohydrateUnit}\n`;
              }

              if (nutrition.sugar) {
                message += `糖: ${nutrition.sugar} ${nutrition.sugarUnit}\n`;
              }

              if (nutrition.fiberDietary) {
                message += `膳食纤维: ${nutrition.fiberDietary} ${nutrition.fiberDietaryUnit}\n`;
              }

              return message.trim();
            }
        },
    };
</script>

<style scoped>

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .background-container {
  background-image: url('../assets/detail.jpg');
  background-size: cover; /* 控制背景图片的大小，以覆盖整个容器 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  background-attachment: fixed; /* 可选，使背景图片固定不滚动 */
  /* 添加其他背景属性，如颜色或透明度，根据需要 */
}

</style>