<template>
      <HomeNav/>

      <div style="padding-top: 180px;">
        <div class="container px-1 px-sm-3 text-end">
            <h5> آموزش ها </h5>
            <hr>
            <p class="text-dark font-weight-bold my-2"> در اینجا میتوانید مجموعه ای از ویدیوهای آموزشی را مشاهده کنید. </p>
            <div v-if="firstLoading" class="position-relative" style="margin-top: 7rem;">
                <div class="loader"></div>
                <span style="position: absolute; bottom: -60px;left: 50%; transform: translateX(-50%);">درحال بارگیری</span>
            </div>
            <div v-else class="mb-5 py-5">
                <h6 v-if="!data" class="text-center" style="margin-top: 90px;">
                    ویدیویی وجود ندارد 
                    <i class="fal fa-video-slash me-2 fs-5"></i>
                </h6>
                <div class="row m-0">
                    <div v-for="vid, index in data" :key="index" class="col-12 xol-sm-9 col-lg-6 col-xl-4 mt-4">
                        <div class="card h-100 shadow border">
                            <video :src="vid.play_link" class="px-0 rounded-top w-100" controls></video>
                            <div class="card-body">
                                <strong class="card-title">{{vid.title}}</strong>
                                <p class="card-text mt-2">{{vid.description}}</p> 
                                <strong class="text-xs position-absolute" style="bottom: 10px; right: 40px; direction: ltr !important; direction: ltr; text-align: end;" dir="ltr">
                                    {{ new Date(vid.created_at).toLocaleString('fa-IR').slice(0, -3) }}
                                </strong> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

    <Footer></Footer>


</template>

<script>

const body = document.getElementsByTagName("body")[0]
import { activateDarkMode, deactivateDarkMode } from "@/assets/js/dark-mode";
import HomeNav from '@/views/components/HomeNav.vue'
import Footer from '@/views/components/Footer.vue'

import axios from 'axios';
import { ref } from 'vue';

export default{
    setup(){
        let firstLoading = ref(true)
        let data = ref()


        function getData(){
            axios.get("/training/")
            .then((res) => {
                data.value = res.data
                firstLoading.value = false
            }).catch(() => {
                firstLoading.value = false
            });
        }
        getData()

        return { firstLoading, data }
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
