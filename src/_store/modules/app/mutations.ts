import * as CONSTANTS from "./constants";

export default {
  [CONSTANTS.UPDATE_LOADER_STATUS]: (state: any, status: any): void => {
    state.loader = status;
  },
  [CONSTANTS.SET_THEME_MOD]: (state: any, isDarkThemeActive: string): void => {
    state.isDarkThemeActive = isDarkThemeActive.toString();
    localStorage.setItem("isDarkThemeActive", isDarkThemeActive.toString());
  },
};
