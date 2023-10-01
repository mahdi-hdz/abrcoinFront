<template>
  <div v-if="firstLoading" class="fullscreen">
    <div class="loader"></div>
  </div>
  <main>
    <div class="container-fluid p-0 px-sm-3">
      <div class="page-header min-height-300 position-relative" id="profile-header">
        <span class="mask bg-gradient-success opacity-6"></span>
        <i class="fa fa-bars text-dark fs-3 pointer p-2"
          style="position: absolute; top: 20px; left: 25px;" @click="toggleSidebar"></i>
        
      </div>
      <div class="card shadow-lg mt-n6">
        <div class="card-body p-3">
          <div class="row m-0 gx-4">
            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <!-- <i class="fa fa-user"></i> -->
                <img
                  src="../assets/img/user-icon.png"
                  alt="profile_icon"
                  class="w-75 border-radius-lg"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">
                  <span v-if="data.name"> {{ data.name }}  {{ data.last_name }} </span>
                  <span v-else-if="data.phone_number"> {{ data.phone_number.toLocaleString('fa-IR') }} </span>
                </h5>
                <p class="mb-0 font-weight-bold text-sm" v-if="data.authentication_status == 'Yes'">
                  <i class="fa fa-check-circle text-primary"></i>
                  احراز هویت شده 
                </p>
                <p class="mb-0 font-weight-bold text-sm" v-else-if="data.authentication_status == 'No'">
                  احراز هویت نشده 
                </p>
                <p class="mb-0 font-weight-bold text-sm" v-else-if="data.authentication_status == 'Pending'">
                  <i class="fa fa-clock text-warning"></i>
                  درحال بررسی 
                </p>
              </div>
            </div>
            <div class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 container-fluid p-0 px-sm-3">
      <div class="row m-0">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <h6 class="mb-0"> اطلاعات شخصی </h6>
              </div>
            </div>
            <div class="card-body">

              <div class="row m-0" v-if="data.authentication_status != 'No'">
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"> کدملی </label> 
                  <input class="form-control mb-3" disabled type="text" :value="data.id_number" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"> شماره تلفن </label> 
                  <input class="form-control mb-3" disabled type="text" :value="data.phone_number" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"> نام </label> 
                  <input class="form-control mb-3" disabled type="text" :value="data.name" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"> نام خانوادگی </label> 
                  <input class="form-control mb-3" disabled type="text" :value="data.last_name" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"> ایمیل </label> 
                  <input class="form-control mb-3" type="email" :value="data.email" :disabled="data.email_verified" />
                </div>
                <div class="col-md-6 d-flex mt-3 align-items-center" v-if="!data.email_verified">
                  <button id="emailBtn" class="btn mb-0 btn-success btn-sm px-2" @click="verifyEmail"> 
                    تایید ایمیل
                  </button>
                </div>
                <hr class="horizontal dark" />
                <p class="text-uppercase text-sm"> اطلاعات مالی </p>
                <div class="row m-0">
                  
                </div>
              </div>

              <div class="row m-0" v-else>
                <div class="col-md-6">
                  <label for="idInp" class="form-control-label"> کد ملی </label> 
                  <input class="form-control mb-3" type="text" id="idInp" maxlength="10"/>
                </div>
                <div class="col-md-6">
                  <label class="form-control-label"> شماره تلفن </label> 
                  <input class="form-control mb-3" type="text" disabled :value="data.phone_number"/>
                </div>
                <div class="col-md-6">
                  <label for="firstNameInp" class="form-control-label"> نام </label> 
                  <input class="form-control mb-3" id="firstNameInp" type="text"/>
                </div>
                <div class="col-md-6">
                  <label for="lastNameInp" class="form-control-label"> نام خانوادگی </label> 
                  <input class="form-control mb-3" id="lastNameInp" type="text"/>
                </div>
                <div class="col-md-6">
                  <label for="emailInp" class="form-control-label"> ایمیل </label> 
                  <input class="form-control mb-3" id="emailInp" type="email"/>
                </div>
                <div class="col-md-6">

                </div>

                
                <div class="col-md-6" v-show="!front_id_card">
                  <label for="example-text-input" class="form-control-label"> 
                    تصویر احراز هویت 
                    <button class="btn btn-info btn-xs mb-0 me-2" data-bs-toggle="modal" data-bs-target="#picInfoModal">
                      مشاهده راهنما
                      <i class="fa fa-question-circle"></i>
                    </button> 
                  </label> 
                  <div class="position-relative form-control p-0 pointer" style="height: 125px;">

                    <input class="h-100 absolute-center pointer w-100 opacity-0" style="z-index: 1000 !important;"
                      type="file" @change="imageSelected" id="frontInput" accept="image/*"/>

                    <i class="absolute-center fal fa-id-card" style="font-size: 75px;"></i>
                  </div>
                </div>

                <div class="col-md-6" v-show="front_id_card">
                  <img :src="front_id_card" alt="تصویر آپلودی کارت ملی" class="w-100 rounded" :class="{ 'border border-danger border-2' : image_big}">
                  <button class="btn btn-info px-3 btn-sm mt-2 mb-0" @click="front_id_card = null"> آپلود مجدد </button>
                  <strong v-if="image_big" class="mt-2 text-danger font-weight-bold"> حجم عکس نباید بیشتر از 4MB باشد </strong>
                </div>                
                
                <div class="mt-5 d-flex">
                  <button color="success" class="btn mb-0 btn-success btn-md mx-auto px-5"
                  @click="submit_authentication" id="authBtn"> ثبت اطلاعات </button>
                </div>
                <p v-if="showPatient" class="text-center mt-3 text-sm"> بعلت آپلود تصاویر ممکن است کمی طول بکشد </p>

              </div>

            </div>
          </div>
        </div>
        <!-- <div class="col-md-4">
          <div class="card card-profile h-100">
            
          </div>

        </div> -->
      </div>
    </div>
  </main>


  <div class="modal fade" id="picInfoModal" tabindex="-1" style="z-index: 10001 !important;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel"> راهنمای تصویر احراز هویت </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class=""> متن تعهدنامه (متن زیر) را روی کاغذ نوشته و امضا کنید, و همراه با کارت ملی <small>(یا سایر مدارک شناسایی معتبر)</small> در دست گرفته و یک سلفی مطابق نمونه بارگذاری نمایید. </p>
          <div class="px-3 font-weight-bold text-dark mt-4 mb-3"> «اینجانب (نام و نام خانوادگی) به کد ملی (کد ملی) قوانین ابرکوین را مطالعه کرده و پذیرفته‌ام.» </div>
          <img src="../assets/img/authentication-sample.jpg" class="w-100">
          <p class="text-sm mt-3"> (اطمینان داشته باشید که عکس و اطلاعات شما در اختیار شخص یا اشخاص دیگر قرار نخواهد گرفت و صرفا جهت احراز هویت شما در سایت ابرکوین می باشد.) </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">متوجه شدم</button>
        </div>
      </div>
    </div>
  </div>
  

</template>

<script>
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import { mapMutations, mapActions } from "vuex";
import { ref } from 'vue'
import axios from 'axios';
import Swal  from 'sweetalert2';
const body = document.getElementsByTagName("body")[0];
import { activateDarkMode, deactivateDarkMode } from "@/assets/js/dark-mode";


export default {
  name: "profile",

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
  },
  beforeMount() {
    this.$store.state.imageLayout = "profile-overview";
    this.$store.state.showNavbar = false;
    body.classList.add("profile-overview");
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
    this.$store.state.imageLayout = "default";
    this.$store.state.showNavbar = true;
    body.classList.remove("profile-overview");
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
    }
  },
  setup(){

    let firstLoading = ref(true)
    let data = ref({})
    let image_big = ref(false)


    function getData(){
      axios.get('/account/profile')
      .then((res) => {
        data.value = res.data.data
        if(data.value.authentication_status != 'No'){
          data.value.phone_number = data.value.phone_number.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
          data.value.id_number = data.value.phone_number.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
        }
        firstLoading.value = false
      })
      .catch(() => {
        firstLoading.value = false
      })
    }


    let front_id_card = ref()

    function imageSelected(){
      let el = document.getElementById("frontInput")
      image_big.value = el.files[0].size > 4000000
      if(el.files[0].type.split("/")[0] !== 'image'){
        Swal.fire("فقط مجاز به انتخاب فایل تصویری می باشد", "لطفا مجدد تصویر مورد نظر را به درستی انتخاب کنید", "warning")
        el.value = ''
        return
      }
      front_id_card.value = window.URL.createObjectURL(el.files[0])
    }

    getData()

    let showPatient = ref(false)
    function submit_authentication(){

      let frontPic = document.getElementById('frontInput')

      if(!frontPic.files[0]){
        Swal.fire("عکس احراز هویت به درستی انتخاب نشده", "", "warning")
        return
      }

      let btn = document.getElementById("authBtn")
      let btnInner = btn.innerHTML
      btn.disabled = true
      btn.innerHTML += '<div class="loader"></div>'
      showPatient.value = true
      
      let formData = new FormData()
      
      formData.append('first_name', document.getElementById("firstNameInp").value)
      formData.append('last_name', document.getElementById("lastNameInp").value)
      formData.append('id_number', document.getElementById("idInp").value)
      formData.append('email', document.getElementById("emailInp").value)
      formData.append('id_card_photo', frontPic.files[0])
      
      axios.post("account/authentication", formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
      }
    }).then(()=>{
        btn.disabled = false
        btn.innerHTML = btnInner
        showPatient.value = false
        firstLoading.value = true
        getData()
      }).catch(()=>{
        btn.disabled = false
        btn.innerHTML = btnInner
        showPatient.value = false
      })
    }
    
    function verifyEmail(){
      let btn = document.getElementById("emailBtn")
      let btnInner = btn.innerHTML
      btn.disabled = true
      btn.innerHTML += '<div class="loader"></div>'
      axios.post("account/sendVerifyEmail").then(()=>{
        btn.disabled = false
        btn.innerHTML = btnInner
      }).catch(()=>{
        btn.disabled = false
        btn.innerHTML = btnInner
      })
    }

    function toggleEye(id){
      let el = document.getElementById(id)
      el.type == 'password' ? el.type = 'text' : el.type = 'password'
      el.parentElement.lastElementChild.classList.toggle("fa-eye-slash")
    }

    

    

    return { firstLoading, data, imageSelected, front_id_card, toggleEye,
      submit_authentication, showPatient, verifyEmail, image_big}
  }
};
</script>

<style>

#profile-header{
  background-image: url(../assets/img/profile-header.webp);
  /* margin-right: -24px;
  margin-left: -34%; */
}

/* @media screen and (min-width: 576px) { */
@media screen and (min-width: 576px) {
  #profile-header{
    margin-right: -24px;
    margin-left: -34%;
  }

  #profile-header i{
    top: 20px !important;
    left: 26% !important;
  }
  
}

@media screen and (min-width: 1200px) {
  #profile-header i{
    display: none;
  }
  
}

.modal-backdrop{
  z-index: 10000 !important;
  background: rgba(0, 0, 0, .5) !important;
}

</style>
