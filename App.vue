<template>
  <!-- <chat v-if="this.$store.state.isAuthenticated"></chat> -->
  <span class="text-xs font-weight-bold text-dark d-none" id="chatbox-text"> پشتیبانی ابرکوین </span>
  <div
    v-show="this.$store.state.layout === 'landing'"
    class="landing-bg h-100 bg-gradient-primary position-fixed w-100"
  ></div>
  <sidenav
    :custom_class="this.$store.state.mcolor"
    class="fixed-end"
    v-if="this.$store.state.showSidenav"
  />
  <main
    class="main-content position-relative border-radius-lg"
  >
    <!-- nav -->
    <navbar
      :class="[navClasses]"
      :textWhite="
        this.$store.state.isAbsolute ? 'text-white opacity-8' : 'text-white'
      "
      :minNav="navbarMinimize"
      v-if="this.$store.state.showNavbar"
    />
    <router-view />
  </main>
</template>
<script>
import Sidenav from "./examples/Sidenav";
import Navbar from "@/examples/Navbars/Navbar.vue";
// import Chat from "@/views/components/Chat.vue";
import { mapMutations } from "vuex";
import { activateDarkMode } from "@/assets/js/dark-mode";
// import chatText from '@/assets/images/chat-text.png'

export default {
  name: "App",
  components: {
    Sidenav,
    Navbar,
    // Chat
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"])
  },
  computed: {
    navClasses() {
      return {
        "position-sticky bg-white left-auto top-2 z-index-sticky":
          this.$store.state.isNavFixed && !this.$store.state.darkMode,
        "position-sticky bg-default left-auto top-2 z-index-sticky":
          this.$store.state.isNavFixed && this.$store.state.darkMode,
        "position-absolute px-4 mx-0 w-100 z-index-2": this.$store.state
          .isAbsolute,
        "px-0 mx-4": !this.$store.state.isAbsolute
      };
    }
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
  },
  mounted(){

    window.$crisp=[];
    window.CRISP_WEBSITE_ID="5d729d82-d4f4-4512-a4d2-ea6798a0a98f";
    (function(){
        let d=document;
        let s=d.createElement("script");
        s.src="https://client.crisp.chat/l.js";
        s.async=1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })()


    this.$store.dispatch('onStart')

    if(localStorage.getItem("darkMode") == "true"){
      this.$store.state.darkMode = true;
      this.$store.state.sidebarType = "bg-default";
      activateDarkMode()
    }
    function remove_chat_mark(){
      try {

        // document.querySelector("span.cc-15e7").style.setProperty('background-image', `url(${chatText})`, 'important')
        // document.querySelector("span.cc-15e7").style.setProperty('transform', `scalce(1.8)`, 'important')
        // document.querySelector("span.cc-15e7").innerHTML = "پشتیبانی ابرکوین"
        document.querySelector("#crisp-chatbox").classList.add("font-iran")
        document.querySelector("#chatbox-text").classList.remove("d-none")
        // document.querySelector("div.cc-acjo a.cc-nmj4").remove()
      } catch {
        setTimeout(() => {
          remove_chat_mark()
        }, 4000);
      }
    }
    remove_chat_mark()
  },
};
</script>

<style>

#chatbox-text{
  position: fixed;
  bottom: 1px;
  left: 6px;
  z-index: 100;
}

@media screen and (max-width: 476px) {
  #chatbox-text{
    left: 0px;
    bottom: -1px;
    font-size: 11px !important;
  }
}

</style>
