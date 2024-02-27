import { createStore } from "vuex";

export default createStore({
  state: {
    userName: localStorage.getItem("userName") || "",
  },
  getters: {},
  mutations: {
    NAMEUPDATE(state, userName) {
      state.userName = userName;
      localStorage.setItem("userName", userName);
    },
  },
  actions: {},
  modules: {},
});
