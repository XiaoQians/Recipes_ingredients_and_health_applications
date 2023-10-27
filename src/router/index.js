import { createRouter, createWebHashHistory } from 'vue-router'
import pageFirst from '../views/pageFirst'
import RecipeDetails from '../views/RecipeDetails'
import nutritionPage from '../views/nutritionPage'
import healthPage from '../views/healthPage'
import healthHelp from '../views/healthHelp'


const routes = [

    {
      path: '/',
      // redirect: '/RecipeDetails', // 将默认路由重定向到RecipeDetails页面，这里假设默认显示RecipeDetails页面的id为1
      name: 'pageFirst',
      component:pageFirst
    },
    {
      path: '/RecipeDetails',
      name: 'RecipeDetails',
      component:RecipeDetails
    },
    {
      path: '/nutritionPage',
      name: 'nutritionPage',
      component:nutritionPage
    },
    {
      path: '/healthPage',
      name: 'healthPage',
      component:healthPage
    },
    {
      path: '/healthHelp',
      name: 'healthHelp',
      component:healthHelp
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router