<template>
  <div
    v-show="this.$store.state.layout === 'default'"
    class="min-height-300 position-absolute w-100"
    :class="`${this.$store.state.darkMode ? 'bg-transparent' : 'bg-success'}`"/>
  <aside
    class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl"
    :class="`${
      this.$store.state.isRTL
        ? 'me-3 rotate-caret fixed-end'
        : 'fixed-start ms-3'
    } 
    ${
      this.$store.state.layout === 'landing'
        ? 'bg-transparent shadow-none'
        : ' '
    } ${this.$store.state.sidebarType}`"
    id="sidenav-main">
    <div class="sidenav-header">
      <i class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none" id="iconSidenav"></i> 
      <div class="navbar-brand d-flex align-items-center justify-content-evenly px-0 me-0">

        <router-link class="m-0" to="/"> 
          <img :src=" this.$store.state.darkMode || this.$store.state.sidebarType === 'bg-default' ? logoWhite:logo"
          class="navbar-brand-img h-100 w-auto" alt="main_logo"/> 
          <span class="ms-2 font-weight-bold me-2"> ابرکوین </span> 
        </router-link>
        <i class="fa fa-close fs-6 btn btn-xs my-0 d-inline d-sm-none" @click="toggleSidebar"></i>
        <!-- <i class="fa fa-close fs-6 btn btn-xs my-0" id="mobile-nav-close" @click="toggleSidebar"></i> -->
      </div>
    </div>
    <hr class="mt-0 horizontal dark" />
    <sidenav-list :cardBg="custom_class" />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logo-ct-dark.png";
import logoWhite from "@/assets/img/logo-ct.png";
import { mapMutations, mapActions } from "vuex";

export default {
  name: "index",
  components: {
    SidenavList
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),

    toggleSidebar() {
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
    }
  },
  data() {
    return {
      logo,
      logoWhite
    };
  },
  props: ["custom_class", "layout"]
};
</script>
