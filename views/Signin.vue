<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 shadow shadow-lg" style="border-radius: 0.9rem;">
              <div class="card card-plain">
                <div class="pb-0 card-header text-end mt-2">
                  <h4 class="font-weight-bolder"> ورود </h4>
                  <p class="mb-0">برای ورود شماره تلفن و پسورد خود را وارد کنید</p>
                </div>
                <div class="card-body">
                  <form @submit.prevent="login('loginBtn')">
                    <div class="mb-3">
                      <input class="form-control form-control-lg" v-model.lazy="phoneNumber"
                      type="text" placeholder="شماره تلفن" name="email" maxlength="11"/>
                    </div>
                    <div class="mb-3 position-relative">
                      <input class="form-control form-control-lg" v-model.lazy="password"
                      type="password" placeholder="رمزعبور" id="password"/>
                      <i class="fa fa-eye eye-absolute" @click="toggleEye('password')"></i>
                    </div>
                    <div class="mb-3">
                      <input class="form-control form-control-lg" v-model.lazy="totp"
                      type="text" placeholder="کد Authenticator (در صورت فعال بودن)"/>
                    </div>
                    <span class="text-sm pointer d-inline-block" data-bs-toggle="modal" data-bs-target="#forgetPassModal"> فراموشی رمزعبور </span>

                    <button class="btn mb-0 btn-success bg-dark-success btn-lg w-100 null mt-4 position-relative" type="submit" id="loginBtn"> 
                      ورود 
                    </button>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    حساب کاربری ندارید؟
                    <router-link
                      to="/signup"
                      class="text-success text-gradient font-weight-bold">  ثبت نام </router-link>
                  </p>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute start-0 justify-content-center flex-column"> 
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                :style="{backgroundImage: `url(${require('@/assets/img/signin.png')})`}" style="background-size: cover;"> 
                <!-- <span class="mask bg-gradient-success opacity-6"></span> -->
                <!-- <h4
                  class="mt-5 text-white font-weight-bolder position-relative"> ربات آربیتراژ ابرکوین  </h4>
                <p
                  class="text-white position-relative"> با ابرکوین به راحتی و بدون ریسک درآمد داشته باشید. </p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="modal fade" id="forgetPassModal" tabindex="-1" style="z-index: 10001 !important;">
      <div class="modal-dialog">
        <form @submit.prevent="forgetPassword" class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5"> فراموشی رمزعبور </h1>
            <button type="button" class="bg-transparent border-0" data-bs-dismiss="modal"><i class="fa fa-times fs-5"></i></button>
          </div>
          <div class="modal-body">
            <div class="text-center mt-3 mb-4" v-if="!reset_sms_sent">
              <div class="form-check form-check-inline">
                <input @click="reset_type = 'sms'" class="form-check-input ms-1" type="radio" name="withdrawType" id="rialWithdraw" value="option1" :checked="withdraw_type == 'rial'">
                <label class="form-check-label" for="rialWithdraw"> ارسال پیامک </label>
              </div>
              <div class="form-check form-check-inline me-4">
                <input @click="reset_type = 'email'" class="form-check-input ms-1" type="radio" name="withdrawType" id="usdtWithdraw" value="option2" :checked="withdraw_type == 'crypto'">
                <label class="form-check-label" for="usdtWithdraw"> ارسال ایمیل </label>
              </div>
            </div>

            <div v-if="reset_type == 'email' && !reset_sms_sent">
              <hr>
              <p class="mb-4 text-dark font-weight-bold text-sm"> ایمیل خود را وارد کنید. </p>
              <input class="form-control mb-3" v-model.lazy="forgetEmail"
                type="email" placeholder="ایمیل"/>
            </div>
            <div v-if="reset_type == 'sms' && !reset_sms_sent">
              <hr>
              <p class="mb-4 text-dark font-weight-bold text-sm"> تلفن خود را وارد کنید. </p>
              <input class="form-control mb-3" v-model.lazy="forgetPhone"
                type="text" placeholder="تلفن"/>
              </div>
              
              <div v-if="reset_sms_sent" class="pt-3">
                <input class="form-control mb-3" type="text" required id="resetOtp" placeholder="کد ۶ رقمی ارسال شده"/>
                <input class="form-control mb-3" type="text" required id="passwordSms" placeholder="رمز عبور جدید"/>
                <input class="form-control mb-3" type="text" required id="passwordSms2" placeholder="تکرار رمز عبور جدید"/>
            </div>

          </div>
          <div class="modal-footer pb-1">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closeModal"> بستن </button>
            <button type="submit" class="btn btn-primary noDisabled" id="forgetBtn" :disabled="!reset_sms_sent && reset_type == null"> تایید </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
const body = document.getElementsByTagName("body")[0]
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { trans_num } from '../main.js'

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

    const store = useStore()
		const router = useRouter()
    let phoneNumber = ref()
    let forgetEmail = ref()
    let forgetPhone = ref()
    let password = ref()
    let reset_type = ref()
    let reset_sms_sent = ref(false)
    let totp = ref()

    function toggleEye(id){
      let el = document.getElementById(id)
      el.type == 'password' ? el.type = 'text' : el.type = 'password'
      el.parentElement.lastElementChild.classList.toggle("fa-eye-slash")
    }

    function login(btnId){
      let btn = document.getElementById(btnId)
      let btnInner = btn.innerHTML
      btn.disabled = true
      btn.innerHTML += '<div class="loader"></div>'

      axios
      .post('account/login', {
          username: trans_num(phoneNumber.value),
          password: password.value,
          totp: trans_num(totp.value)
      })
      .then(response => {
        btn.disabled = false
        btn.innerHTML = btnInner
        store.commit('login', [response.data.access, response.data.refresh])
        router.push('/')
        store.dispatch('onStart')
      })
      .catch(() => {
        btn.disabled = false
        btn.innerHTML = btnInner
      })

    }

    function forgetPassword(){
      let btn = document.getElementById("forgetBtn")
      let btnInner = btn.innerHTML
      btn.disabled = true
      btn.innerHTML += '<div class="loader"></div>'
      if(reset_sms_sent.value){

        if(document.getElementById("passwordSms").value != document.getElementById("passwordSms2").value){
          Swal.fire("پسورد ها مطابقت ندارد", "رمز عبور و تکرار آن باید یکسان وارد شوند.", "error")
          btn.disabled = false
          btn.innerHTML = btnInner
          return
        }

        axios.post('account/smsSetPassword', {
          phone_number: trans_num(forgetPhone.value),
          otp: document.getElementById("resetOtp").value,
          new_password: document.getElementById("passwordSms").value
        }).then(()=>{
          btn.disabled = false
          btn.innerHTML = btnInner
          reset_sms_sent.value = false
          reset_type.value = null
          forgetPhone.value = ''
          document.getElementById("closeModal").click()
        }).catch(()=>{
          btn.disabled = false
          btn.innerHTML = btnInner
        })

        return
      }

      if(reset_type.value == 'sms'){
        axios
        .post('account/forgetPassword', {
          type: 'sms',
          phone_number: trans_num(forgetPhone.value)
        })
        .then(() => {
          btn.disabled = false
          btn.innerHTML = btnInner
          reset_sms_sent.value = true
        })
        .catch(() => {
          btn.disabled = false
          btn.innerHTML = btnInner
        })
      }else if(reset_type.value == 'email')
        axios
        .post('account/forgetPassword', {
          type: 'email',
          email: forgetEmail.value
        })
        .then(() => {
          btn.disabled = false
          btn.innerHTML = btnInner
          forgetEmail.value = ''
          document.getElementById("closeModal").click()
        })
        .catch(() => {
          btn.disabled = false
          btn.innerHTML = btnInner
        })

    }

    return { toggleEye, login, phoneNumber, password, totp, forgetEmail, forgetPassword, 
      reset_type, forgetPhone, reset_sms_sent, trans_num }
  }
};
</script>
