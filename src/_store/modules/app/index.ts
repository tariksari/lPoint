import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

type stateType = {
  loader: boolean;
  isDarkThemeActive: string;
};

const state: stateType = {
  loader: false,
  isDarkThemeActive: localStorage.getItem("isDarkThemeActive") || "0",
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
