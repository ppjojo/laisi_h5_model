import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo ,fullScreen} = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  fullScreen:fullScreen,
}

const mutations = {
  CHANGE_SETTING: (state,{key,value}) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGE_FULLSCREEN: (state) => {
    state.fullScreen=!state.fullScreen
    console.log("fullScreen============="+state.fullScreen)
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data)
  },
  changeFullScreen({ commit }) {
    commit("CHANGE_FULLSCREEN")
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

