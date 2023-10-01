<template>
  <main class="main-content mt-0">
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="background-position: top;" :style="{backgroundImage: `url(${require('@/assets/img/signup-cover.webp')})`}">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5 text-center">خوش آمدید!</h1>
            <p
              class="text-lead text-white text-center"> با ابرکوین به راحتی و بدون ریسک درآمد داشته باشید. </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">

          <div v-if="level == 'first'" class="card z-index-0 mb-5">
            <div class="card-header text-center pt-4">
              <h5> ثبت نام </h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="sendOTP('submitBtn1')" >
                <input class="form-control form-control-default" v-model="phoneNumber" type="text" placeholder="شماره تلفن" maxlength="11"/>
                <div class="text-center">
                  <div class="text-xs mt-5 pb-1">
                    ثبت نام در ابرکوین به منزله <router-link to="/rules" class="text-dark font-weight-bolder"> پذیرش قوانین </router-link> می باشد.
                  </div>
                  <button class="btn mb-0 bg-gradient-dark btn-md w-100 null mt-2" type="submit" id="submitBtn1"> ثبت نام </button>
                </div>
                <p class="text-sm mt-3 mb-0">
                  قبلا ثبت نام کردید؟
                  <router-link
                    to="/signin"
                    class="text-dark font-weight-bolder"> ورود </router-link>
                </p>
              </form>
            </div>
          </div>

          <div v-else-if="level == 'otp'" class="card z-index-0 mb-5">
            <div class="card-header pt-4">
              <div class="row m-0 p-0">
                <h5 class="col"> ثبت نام </h5>
                <span @click="level = 'first'" class="col-auto me-auto pointer" title="بازگشت"> <i class="fa fa-long-arrow-left"></i> </span>
            </div>
            </div>
            <div class="card-body">
              <form @submit.prevent="signup('submitBtn2')" >
                <p class="text-sm"> کد تایید به شماره {{phoneNumber}} ارسال شد. </p>
                <div class="position-relative">
                  <input class="form-control mb-3" type="text" autocomplete="off" placeholder="کد ارسالی" v-model="otp" maxlength="6"/>
                  <button class="btn btn-sm btn-success px-2 position-absolute noDisabled"
                  style="top: 5px; left: 6px;" dir="ltr" :disabled="timer>0" @click="sendOTP('submitBtn2')" type="button"> 
                    <span v-if="timer>0">({{Math.floor(timer/60)}}:{{timer%60}})</span> ارسال مجدد 
                  </button>
                </div>
                <div class="position-relative">
                  <input class="form-control mb-3" type="password" id="password1" placeholder="رمزعبور" v-model="password1"/>
                  <i class="fa fa-eye eye-absolute" @click="toggleEye('password1')"></i>
                </div>
                <div class="position-relative">
                  <input class="form-control mb-3" type="password" id="password2" placeholder="تکرار رمز عبور" v-model="password2"/>
                  <i class="fa fa-eye eye-absolute" @click="toggleEye('password2')"></i>
                </div>
                
                <div class="text-center">
                  <button class="btn mb-0 bg-gradient-dark btn-md w-100 null mt-2" type="submit" id="submitBtn2"> تایید </button>
                </div>

              </form>
            </div>
          </div>


          <div v-else class="card z-index-0 mb-5">
            <div class="card-header pt-4">
              <div class="row m-0 p-0">
                <h5 class="col"> فعالسازی Google Authenticator </h5>
            </div>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitAuthenticator" >

                <p class="text-sm mb-5"> برای فعالسازی Google Authenticator کد زیر را در برنامه Authenticator خود اسکن کرده و کد دریافتی را در فرم زیر آن وارد کرده و تایید نمایید. </p>
                <div id="qrCodeWrapp" class="col-7 mx-auto mt-4 mb-3">
                  <qr-code :text="'otpauth://totp/'+phoneNumber+'?secret='+totp_secret+'&issuer=Abrcoin'"></qr-code>
                </div>
                <input class="form-control mb-4 mt-2" type="text" placeholder="کد دریافتی" id="authenticatorCode" maxlength="6"/>
                
                <p class="text-xs pt-2 mb-2"> همچنین میتوانید Google Authenticator را بعدا در بخش پروفایل فعال نمایید </p>
                
                <div class="text-center">
                  <button class="btn mb-0 bg-gradient-success btn-md w-100 mt-2 mb-3" type="submit" id="authBtn"> تایید </button>
                  <span class="mt-3 text-sm pointer px-2 py-1" @click="router.push('/dashboard')"> رد کردن </span>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>

<script>
const body = document.getElementsByTagName("body")[0];
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'


export default {
  name: "signin",
  components: {
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
  setup(){
    let level = ref('first')
    let totp_secret = ref()

    const store = useStore()
		const router = useRouter()
    let phoneNumber = ref('')
    let password1 = ref()
    let password2 = ref()
    let otp = ref('')
    let timer = ref(120)


    function sendOTP(btnId){
      let btn = document.getElementById(btnId)
      let btnInner = btn.innerHTML
      btn.disabled = true
      btn.innerHTML += '<div class="loader"></div>'

      axios
      .post('account/getOTP', {
        phone_number: phoneNumber.value
      })
      .then(() => {
        btn.disabled = false
        btn.innerHTML = btnInner
        level.value = "otp"
        timer.value = 120
        start_timer()
      })
      .catch(() => {
        btn.disabled = false
        btn.innerHTML = btnInner
      })
    }


    function signup(btnId){
      if(password1.value != password2.value){
        Swal.fire("", "پسورد های وارد شده مطابقت ندارند", "error")
        return
      }
      console.log(otp);
      if(otp.value.length != 6){
        Swal.fire("", "کد تایید ۶ رقمی را وارد کنید", "error")
        return
      }
      let btn = document.getElementById(btnId)
      let btnInner = btn.innerHTML
      btn.disabled = true
      btn.innerHTML += '<div class="loader"></div>'

      axios
      .post('account/signup', {
        phone_number: phoneNumber.value,
					otp: otp.value,
					password: password1.value
      })
      .then((response) => {
        btn.disabled = false
        btn.innerHTML = btnInner
        store.commit('login', [response.data.access, response.data.refresh])
        level.value = "authenticator"
        totp_secret.value = response.data.totp
        // router.push('/dashboard')
      })
      .catch(() => {
        btn.disabled = false
        btn.innerHTML = btnInner
      })
    }

    function start_timer(){
      if(timer.value > 0){
        timer.value -= 1
        setTimeout(() => {
          start_timer()
        }, 1000);
      }
    }

    function toggleEye(id){
      let el = document.getElementById(id)
      el.type == 'password' ? el.type = 'text' : el.type = 'password'
      console.log(el.parentElement.lastElementChild);
      el.parentElement.lastElementChild.classList.toggle("fa-eye-slash")
    }

    

    function submitAuthenticator(){
      
      let inp = document.getElementById("authenticatorCode")

      if(inp.value.length != 6){
        Swal.fire("کد ۶ رقمی ساخته شده در نرم افزار را وارد کنید", "", "warning")
        return
      }


      let btn = document.getElementById("authBtn")
      let btnInner = btn.innerHTML
      btn.disabled = true
      btn.innerHTML += '<div class="loader"></div>'

      axios.post("account/authenticator", {
        code: inp.value
      }).then(()=>{
        btn.disabled = false
        btn.innerHTML = btnInner
        inp.value = ""
        router.push('/dashboard')
      }).catch(()=>{
        btn.disabled = false
        btn.innerHTML = btnInner
      })

    }

    return{ level, sendOTP, phoneNumber, timer, toggleEye, signup, password1, password2, 
      otp, submitAuthenticator, router, totp_secret }
  }
};
</script>
