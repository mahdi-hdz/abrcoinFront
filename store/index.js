import { createStore } from "vuex";
import axios from 'axios'
import router from '../router'


export default createStore({
  state: {
    profile: {},
    isAuthenticated: true,
    token: '',
    hideConfigButton: true,
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: true,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showMain: true,
    layout: "default",
    userInvests: []
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");

      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    login(state, data) {
      state.isAuthenticated = true
      state.token = data[0]
      localStorage.setItem("access", data[0])
      localStorage.setItem("refresh", data[1])
      axios.defaults.headers.common['Authorization'] = "Bearer " + data[0]
    },
    logout(state) {
      state.isAuthenticated = false
      state.token = ''
      axios.defaults.headers.common['Authorization'] = ""
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      router.push("/signin")
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    onStart (context) {
      let token = localStorage.getItem("access")
      let refresh = localStorage.getItem("refresh")
      if (token) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + token
        axios
        .get('/account/')
        .then((res) => {
          this.state.profile = res.data.data
          context.commit('login', [token, refresh])
        })
        .catch(() => {
          context.commit('logout')
        })
      } else {
        context.commit('logout')
      }
    }
  },
  getters: {}
});
