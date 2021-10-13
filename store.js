import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: '',
    itemInfo: {}
  },
  getters: {
  },

  mutations: {
    LOAD_CONF: (state, baseUrl) => {
      state.baseUrl = baseUrl;
    },
    RESET_ITEM: state => {
      Vue.set(state, 'itemInfo', {});
    },
    LOAD_ITEM: (state, { id, item }) => {
      const itemInfo = {
       id: id,
       item: item
      };
      Vue.set(state, 'itemInfo', itemInfo);
    }
  },

  actions: {
    getItem: async ({ commit }, { id, item }) => {
      commit('RESET_ITEM');
      commit('LOAD_ITEM', {
        id: id,
        item: item
      });
    }
  }
});
