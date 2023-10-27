// store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    ingredienT: [],
    recipeID:null,//moren
  },
  mutations: {
    setIngredient(state, data) {
      state.ingredienT = data;
    },
    setRecipe(state, data) {
      state.recipeID = data;
    },
  },
  actions: {
    updateIngre(context,new_ingredient){
      context.commit('setIngredient',new_ingredient)
    },
    updateRecipe(context,new_id){
      context.commit('setRecipe',new_id)
    },
  },
  getters: {
  },
});

export default store;
