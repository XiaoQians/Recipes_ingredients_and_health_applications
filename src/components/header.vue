<template>
    <nav>
      <div class="logo"><img src="../assets/Logo.jpg" style="max-width: 10%;height: auto;border-radius: 25%;"></div>
      <div class="el-menu-item" href="#" @click="toHome">看看吃啥</div>
      <div class="el-menu-item" href="#" @click="toDetail">做菜咯</div>
      <div class="el-menu-item" href="#" @click="toNutrition">查查成分</div>
      <div class="el-menu-item" href="#" @click="toHealth">养生助手</div>
      <div class="el-menu-item" href="#" @click="toHelp">生活妙招</div>
    </nav>
    <el-divider class="no-margin">
  <el-icon :color="yellow"><Bowl /></el-icon>
</el-divider>
  </template>
  <script>
  export default {
    name: "NavBar",
    data(){

    },      
    methods:{
      toHome(){
        this.$router.push('/')
      },
      toDetail(){
        this.$router.push('/RecipeDetails')
      },
      toNutrition(){
        this.$router.push('/nutritionPage')
      },
      toHealth(){
        this.$router.push('/healthPage')
      },
      toHelp(){
        this.$router.push('/healthHelp')
      }
    }
  }
  </script>
  
  <style lang="css">
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  nav .el-menu-item {
    color: #74f42a;
    padding: 15px 100px;
    position: relative;
    text-align: center;
    border-bottom: transparent;
    display: flex;
    transition: 0.4s;
    font-size: larger;
    font-weight: bold;
  }
  nav .el-menu-item:hover {
    background-color: darkgray;
    border-bottom: solid 6px;
    border-bottom-color: brown;
    height: 80px;
  }
  nav .no-margin {
    margin-top: 0;
    margin-bottom: 0;
  }



  </style>
  