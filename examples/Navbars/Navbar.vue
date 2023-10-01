<template>
  <nav
    class="navbar navbar-main navbar-expand-lg mx-4 shadow-none border-radius-xl navbar-position py-0"
    :class="this.$store.state.darkMode ? 'bg-darkblue' : 'bg-success'"
    v-bind="$attrs"
    id="navbarBlur">
    <div class="px-0 py-1 container-fluid">
      <div
        class="collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="this.$store.state.isRTL ? 'px-0' : 'me-sm-4'"
        id="navbar">
        <div 
          class="text-danger text-sm font-weight-bold ms-auto pointer me-0 me-md-3"
          :class="{'invisible': store.state.profile.balance == null || store.state.profile.balance > 49999999}"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          data-bs-title="برای فعال بودن ربات شما باید حداقل ۵ میلیون تومان موجودی داشته باشید">
          <i class="fa fa-exclamation-circle fs-6 "></i>
          موجودی کم
        </div>
        <ul class="navbar-nav justify-content-end w-auto">
          <li class="toggle-switch">
            <label class="switch-label">
              <input type="checkbox" class="checkbox" @click="setDarkMode" :checked='firstDarkMode'>
              <span class="slider"></span>
            </label>
          </li>  
          <li class="nav-item d-flex align-items-center">
            <div class="px-0 nav-link font-weight-bold text-white" dir="ltr">
              <i
                class="fa fa-user d-none d-sm-inline ps-2"></i>
              <span class="d-sm-inline d-none ms-3"> 
                {{ store.state.profile.name }} 
                | 
                <span class="text-xs" v-if="store.state.profile.balance != null" dir="rtl">
                  {{Math.round(store.state.profile.balance/10).toLocaleString('fa-IR')}} تومان
                </span> 
              </span>
            </div>
          </li>
          <li class="nav-item d-xl-none mb-1 mb-sm-0 d-flex align-items-center">
            <span
              @click="toggleSidebar"
              class="nav-link text-white pointer"
              id="iconNavbarSidenav">
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
              </div>
            </span>
          </li>
          <!-- <li class="px-3 nav-item d-flex align-items-center">
            <a class="p-0 nav-link text-white" @click="toggleConfigurator">
              <i class="cursor-pointer fa fa-cog fixed-plugin-button-nav"></i>
            </a>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import { activateDarkMode, deactivateDarkMode } from "@/assets/js/dark-mode";
import { useStore } from 'vuex'
import { Tooltip } from 'bootstrap'

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false
    };
  },
  props: ["minNav", "textWhite"],
  created() {
    this.minNav;
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),

    toggleSidebar() {
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
      if (this.$store.state.darkMode) {
        this.$store.state.darkMode = true;
        this.$store.state.sidebarType = "bg-default";
        activateDarkMode();
      } else {
        this.$store.state.darkMode = false;
        this.$store.state.sidebarType = "bg-white";
        deactivateDarkMode();
        return;
      }
    },
    setDarkMode() {
      if (this.$store.state.darkMode) {
        this.$store.state.darkMode = false;
        this.$store.state.sidebarType = "bg-white";
        deactivateDarkMode();
        return;
      } else {
        this.$store.state.darkMode = true;
        this.$store.state.sidebarType = "bg-default";
        activateDarkMode();
      }
    },
    sidenavTypeOnResize() {
      let white = document.querySelector("#btn-white");
      if (window.innerWidth < 1200) {
        white.classList.add("disabled");
      } else {
        white.classList.remove("disabled");
      }
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  setup(){
    let firstDarkMode = localStorage.getItem("darkMode") == "true"
    let store = useStore()

    return { store, firstDarkMode }
  },
  mounted(){
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
    tooltipList
  }
};
</script>

<style>

.toggle-switch {
  position: relative;
  width: 100px;
  height: 50px;
  --light: #d8dbe0;
  --dark: #28292c;
  --link: rgb(27, 129, 112);
  --link-hover: rgb(24, 94, 82);
  transform: scale(0.5) translate(-25px, -3px);
}

.switch-label {
  position: absolute;
  width: 100%;
  height: 50px;
  background-color: var(--dark);
  border-radius: 25px;
  cursor: pointer;
  border: 3px solid var(--dark);
}

.checkbox {
  position: absolute;
  display: none;
}

.slider {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.checkbox:checked ~ .slider {
  background-color: var(--light);
}

.slider::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  -webkit-box-shadow: inset 12px -4px 0px 0px var(--light);
  box-shadow: inset 12px -4px 0px 0px var(--light);
  background-color: var(--dark);
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.checkbox:checked ~ .slider::before {
  -webkit-transform: translateX(50px);
  -ms-transform: translateX(50px);
  transform: translateX(50px);
  background-color: var(--dark);
  -webkit-box-shadow: none;
  box-shadow: none;
}


</style>
