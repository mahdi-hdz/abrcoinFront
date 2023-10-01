<template>

  <HomeNav/>

  <main class="mt-0 main-content" style="padding-top: 100px;">
    <section>
      <div class="page-header" style="min-height: calc(100vh - 100px);">
        <div class="container">
          <div class="row">
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"> 
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                :style="{backgroundImage: `url(${require('@/assets/img/signin.png')})`}" style="background-size: cover;"> 
              </div>
            </div>
            <div class="col"></div>
            <div class="mx-auto col-xl-5 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 shadow shadow-lg" style="border-radius: 0.9rem;">
              <div class="card card-plain py-5 px-3">
                <h5>تماس باما</h5>
                <hr><br>
                <p class="text-dark my-2">شماره تماس 28423980 -021</p>
                <p class="text-dark my-2"> امور مشتریان، عدد 1 </p>
                <p class="text-dark my-2"> واحد فنی، عدد 2 </p>
                <p class="text-dark my-2"> امور مالی، عدد 3 </p>
                <p class="text-dark my-2"> صندوق سپرده‌گذاری ارز دیجیتال، عدد 4 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- <div style="padding-top: 180px;">
    <div class="container">

    </div>
  </div> -->
  <Footer></Footer>


</template>

<script>

const body = document.getElementsByTagName("body")[0]
import { activateDarkMode, deactivateDarkMode } from "@/assets/js/dark-mode";
import HomeNav from '@/views/components/HomeNav.vue'
import Footer from '@/views/components/Footer.vue'

export default{
  setup(){


        return {  }
    },
    created() {
      this.$store.state.showNavbar = false;
      this.$store.state.showSidenav = false;
      if (this.$store.state.darkMode){
        deactivateDarkMode()
      }
      body.classList.remove("bg-gray-100");
    },
    beforeUnmount() {
      this.$store.state.showNavbar = true;
      this.$store.state.showSidenav = true;
      if (this.$store.state.darkMode){
        activateDarkMode()
      }
      body.classList.add("bg-gray-100");
    },
    components: { HomeNav, Footer },
}

</script>

<style>

</style>
