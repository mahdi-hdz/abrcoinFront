<template>
  <div v-if="firstLoading" class="fullscreen">
    <div class="loader"></div>
  </div>
  <div class="container-fluid p-0 px-sm-3">
    <div class="row m-0">
      <div class="col-lg-8 mb-3">
        <div class="card">
          <div class="card-header pb-0 px-3">
            <h6 class="mb-4"> اطلاعات بانکی ثبت شده </h6>
          </div>
          <div class="card-body pt-4 p-1 p-sm-3">
            <ul class="list-group p-1 pe-sm-3">
              
              <li class="list-group-item border-0 d-flex p-1 py-4 p-sm-4 mb-3 bg-gray-100 border-radius-lg" 
                v-for="card, index in data" :key="index">
                <div class="d-flex flex-column">
                  <span class="mb-2 text-sm">
                    شماره:
                    <span class="text-dark font-weight-bold ms-sm-2" style="word-break: break-all;"> {{card.number.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])}} </span>
                  </span>
                  <span class="mb-2 text-sm">
                    نوع:
                    <span class="text-dark ms-sm-2 font-weight-bold"> 
                      <span v-if="card.type == 'Shaba'"> شماره شبا </span>  
                      <span v-else> شماره کارت </span>  
                    </span>
                  </span>
                  <span class="text-sm">
                    زمان ساخت:
                    <span class="text-dark ms-sm-2 font-weight-bold" dir="ltr" style="direction: ltr; text-align: end;"> 
                      {{ new Date(card.created_at).toLocaleString('fa-IR').slice(0, -3) }}
                    </span>
                  </span>
                </div>
                <div class="me-auto text-end">
                  <span class="btn btn-link text-danger text-gradient px-3 mb-0" @click="deleteCard(card.id)">
                    <i class="far fa-trash-alt"></i> <span class="d-none d-sm-inline-block">حذف</span>
                  </span>
                </div>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="card h-100 mb-4">
          <div class="card-header pb-0 px-3">
            <h6 class="mb-4"> <i class="fa fa-circle text-sm ms-2"></i> افزودن اطلاعات بانکی </h6>
          </div>
          <div class="card-body pt-4 p-3">
            <form class="row m-0" @submit.prevent="addCard">

              <div class="col-md-7 col-lg-11 col-xxl-7 mx-auto">
                <label for="example-text-input" class="form-control-label"> 
                  شماره 
                  <span v-if="type !== 'انتخاب کنید'"> {{type}} </span> 
                </label>
                
                <div class="position-relative">
                  <img v-if="bank_src" :src="bank_src" class="eye-absolute h-100 p-1 w-auto">
                  <input @input="check_bank" class="form-control form-control-default" v-model="number"
                    style="padding-top: 5.5px; padding-bottom: 5.5px;" type="text"/>
                </div>
              </div>

              <div class="text-center mt-4">
                <input @click="type = 'کارت'" type="radio" id="firstRadio" name="cardType"> <label for="firstRadio" class="ms-4"> شماره کارت </label>
                <input @click="type = 'شبا'" type="radio" id="secondRadio" name="cardType" class="me-4"> <label for="secondRadio"> شماره شبا </label>
              </div>

              <!-- <select name="newFinanType" id="newFinanType" class="form-control" v-model="type">
                <option value="انتخاب کنید" selected hidden> انتخاب کنید </option>
                <option value="شبا"> شماره شبا </option>
                <option value="کارت"> شماره کارت </option>
              </select> -->
              
              <div class="mt-5 text-center">
                <button class="btn mb-0 btn-success btn-md font-iran py-2 px-5" id="cardBtn" type="submit">
                  ثبت
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { trans_num } from '../main.js'

export default {
  name: "Card",
  setup(){
    let type = ref("انتخاب کنید")
    let firstLoading = ref(true)
    let data = ref({})
    let number = ref('')
    let bank_src = ref()
    let banks = {
      '502806': 'شهر',
      '502908': 'توسعه تعاون',
      '502938': 'دی',
      '589210': 'سپه',
      '589463': 'رفاه',
      '603769': 'صادرات',
      '603770': 'کشاورزی',
      '610433': 'ملت',
      '621986': 'سامان',
      '622106': 'پارسیان',
      '627353': 'تجارت',
      '627381': 'انصار',
      '627412': 'اقتصاد نوین',
      '627488': 'کارآفرین',
      '627648': 'توسعه صادرات',
      '627760': 'پست ایران',
      '627961': 'صنعت و معدن',
      '628023': 'مسکن',
      '639346': 'سینا',
      '639347': 'پاسارگاد',
      '639607': 'سرمایه',
      '603799': 'ملی'
    }
    
    function getCards(){
      firstLoading.value = true
      axios
      .get('card/list')
      .then(response => {
        firstLoading.value = false
        data.value = response.data.data
      })
      .catch(() => {
        firstLoading.value = false
      })
    }
    
    function addCard(){
      if (type.value == 'انتخاب کنید'){
        Swal.fire("نوع (شماره کارت یا شبا) را انتخاب کنید", "", "warning")
        return
      }
      if(number.value.length < 5){
        Swal.fire(`شماره ${type.value} خود را به درستی وارد کنید`, "", "warning")
        return
      }
      let btn = document.getElementById("cardBtn")
      let btnInner = btn.innerHTML
      btn.disabled = true
      btn.innerHTML += '<div class="loader"></div>'

      let transType

      if(type.value == "شبا"){
        transType = 'Shaba'
      }else{
        transType = 'Card'
      }
      
      axios
      .post('card/add', {
        type: transType,
        number: trans_num(number.value),
      })
      .then(() => {
        getCards()
        btn.disabled = false
        btn.innerHTML = btnInner
        type.value = 'انتخاب کنید'
        number.value = ''
      })
      .catch(() => {
        btn.disabled = false
        btn.innerHTML = btnInner
      })
    }
    
    getCards()
    
    function deleteCard(id){
      firstLoading.value = true
      axios.post("card/remove", {
        id: id
      }).then(()=>{
        getCards()
        firstLoading.value = false
      }).catch(()=>{
        firstLoading.value = false
      })
    }

    function check_bank(){
      // if(type.value != "کارت"){
      //   bank_src.value = null
      //   return
      // }
      let num = number.value.slice(0,6)
      if(banks[num]){
        bank_src.value = require(`@/assets/banks/${banks[num]}.png`)
        console.log(`@/assets/banks/${banks[num]}.png`);
      }else{
        bank_src.value = null
      }
    }
    
    return { firstLoading , type, number, addCard, data, deleteCard, banks, check_bank, bank_src, trans_num }
  }
};
</script>

