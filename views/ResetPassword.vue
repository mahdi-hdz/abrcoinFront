<template>
    <div v-if="loading" class="fullscreen">
        <div class="loader"></div>
      </div>
    <div class="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-4 mx-auto mt-5 p-3 border rounded shadow bg-light">
        
        <div v-if="notMatch">
            <img src="../assets/images/notFound.png" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
            <h3 class="ebold"> درخواست بازیابی رمز صحیح نیست </h3>
            <div class="text-muted">(اگر صفحه را رفرش کردید باید مجددا روی لینک بازیابی ایمیل شده کلیک کنید)</div>
            
            <br><hr>
            <router-link to="/" class="btn btn-primary"> رفتن به صفحه اصلی <i class="fa fa-home ms-2"></i> </router-link>
        </div>
        
        <form v-else @submit.prevent="resetPassword">
            <h5> رمز عبور جدیدتان را وارد کنید </h5>
            <hr><br>
            <label for="pass1Inp" class="pointer mb-2"> رمز جدید </label>
            <div class="position-relative mb-3">
                <input type="password" required id="pass1Inp" class="form-control">
                <i @click="toggleVisiblePassword($event)" class="eye-absolute fa fa-eye"></i>
            </div>
            <br>
            <label for="pass2Inp" class="pointer mb-2"> تکرار رمز جدید </label>
            <div class="position-relative mb-3">
                <input type="password" required id="pass2Inp" class="form-control">
                <i @click="toggleVisiblePassword($event)" class="eye-absolute fa fa-eye"></i>
            </div>
            
            <br><hr>
            <button type="submit" class="btn btn-success w-100"> ارسال </button>
        </form>
        
    </div>
</template>

<script>
const body = document.getElementsByTagName("body")[0]

import axios from 'axios';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default{
    setup() {
        let loading = ref(false)
        let notMatch = ref(false)
        let route = useRoute()
        let router = useRouter()
        let token = route.params.token
        let id = route.params.id
        if(token.length < 10 || !id){
            notMatch.value = true
        }
        router.push("/resetPassword")
        
        function resetPassword(){
            let pass = document.getElementById("pass1Inp").value
            if (pass !== document.getElementById("pass2Inp").value ){
                Swal.fire({title: "پسورد ها یکسان وارد نشدند", showConfirmButton: false, timer: 2000, icon: "warning"})
                return
            }
            loading.value = true
            axios.post("/account/setPassword", {
                token: token,
                id: id,
                password: pass
            }).then(()=>{
                Swal.fire({title: "رمز عبور شما با موفقیت تغییر یافت", showConfirmButton: false, timer: 3000, icon: "success"})
                loading.value = false
                router.push("/")
            }).catch(()=>{
                loading.value = false
            })
        }

        function toggleVisiblePassword(e){
            let el = e.target.parentElement.firstChild;
            e.target.classList.toggle("fa-eye-slash");
            (el.type == "password") ? el.type = "text": el.type = "password";
        }
        
        return { loading, resetPassword, notMatch, toggleVisiblePassword };
    },
    created() {
        this.$store.state.showNavbar = false;
        this.$store.state.showSidenav = false;
        body.classList.remove("bg-gray-100");
    },
    beforeUnmount() {
        this.$store.state.showNavbar = true;
        this.$store.state.showSidenav = true;
        body.classList.add("bg-gray-100");
    },
}
</script>

<style scoped>

*{
    text-align: center !important;
}

</style>
