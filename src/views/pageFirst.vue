<template>
  <div class="page-container">
    <div class="container-with-margin">
      <div class="input-container">
        <el-input v-model="searchKeyword" placeholder="想吃什么呢"></el-input>
        <el-button type="primary" @click="performRecipeSearch"><el-icon><KnifeFork /></el-icon>搜索</el-button>
      </div>
    </div>
    <div class="card-container">
      <el-row :span="8" v-for="(recipe, index) in recipes" :key="index">
        <el-card class="recipe-card" @click="viewRecipeDetails(recipe.id)">
          <div style="display: flex; align-items: flex-start;">
            <div style="flex: 1;">
              <img :src="recipe.cover" alt="菜品图片" style="max-width: 100%; height: auto;">
            </div>
            <div style="flex: 2;">
              <el-descriptions direction="vertical" :column="1" :size="small" border>
                <el-descriptions-item :label="recipe.name">{{ recipe.desc ? recipe.desc : '暂无评价' }}</el-descriptions-item>
                <hr>
                <el-descriptions-item label="食材">
                  <span v-for="(ingredient, index) in recipe.ingredient" :key="index">
                    {{ ingredient.name }}
                    <span v-if="index < recipe.ingredient.length - 1">, </span>
                  </span>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </el-card>
      </el-row>
    </div>
  </div>
</template>



<script>
// import axios from "axios";
import{searchRecipes} from "@/api/recipeRequest"
import { mapState, mapActions} from 'vuex';

export default {
  data() {
    return {
      searchKeyword: null,
      recommendedRecipes: [],
      loading: false,
      recipes: [],
    };
  },
  computed: {
    ...mapState(['recipeID']), // Replace 'yourModuleName' with your module name
    },
  methods: {
    async performRecipeSearch() {
      const appKey = "nis8baoknhkznlhe"; // API密钥
      // const apiUrl = "https://www.mxnzp.com/api/cookbook/search";
      const appSecret = "1aoXHVf7UMiBJWtTiH2OtkC0jJ0VtdYP";
      // const id ="76c5ad6264d449c6671d6ad853c657c6"
      try {
        const response = await searchRecipes(this.searchKeyword,2,appKey,appSecret);
        console.log(this.searchKeyword)
        if (response.code == 1) {
          
          console.log('成功',response.data);
        } else {
          console.error('失败',response.msg);
        }

        // 请求成功，将数据存入recipes数组
        this.recipes = response.data.list;
      } catch (error) {
        // 请求异常，输出错误信息
        console.log("请求异常:", error);
      }
    },
    viewRecipeDetails(recipeId) {
      // 导航到食谱详情页，使用 Vue Router
      
      this.updateRecipe(recipeId);
      console.log("存全局id")
      this.$router.push({ name: 'RecipeDetails'});
    },
    ...mapActions(['updateRecipe']),
  },
};
</script>

<style scoped>
.page-container {
  background-image: url('@/assets/res.jpg');
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
  width: 500px; /* 为卡片设置固定宽度 */
  height: 300px;
  margin: 10px; /* 在卡片之间添加一些边距 */
}

.container-with-margin {
  margin-top: 20px; /* 保留搜索框与背景图的间距，可以根据需要调整值 */
}
.input-container {
  display: flex;
  align-items: center;
}

/* 添加一定距离的样式，可以根据需要调整值 */
</style>