<template>
    <div v-if="firstLoading" class="fullscreen">
        <div class="loader"></div>
      </div>
    <div class="container-fluid p-0 px-sm-3">
        <div class="row m-0">
            <div class="col-lg-8 mb-3">
                <div class="card">
                    <div class="card-header pb-0">
                        <h6 class="mb-4"> برداشت ها </h6>
                    </div>
                    <div class="px-3 py-4">
                      <div class="font-weight-bold text-center my-5 py-5" v-if="!data[0]"> سابقه ای برای برداشت های شما وجود ندارد </div>
                        <ul class="list-group pe-0">
                            <li class="list-group-item border-0 d-flex p-4 mb-3 bg-gray-100 border-radius-lg" v-for="withdraw, index in data" :key="index">
                              <div class="d-flex flex-column">
                                <span class="mb-3 text-sm">
                                    شناسه:
                                  <span class="text-dark font-weight-bold ms-sm-2" dir="ltr"> #{{withdraw.ref_id.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])}} </span>
                                </span>
                                <span class="mb-3 text-sm">
                                  مقدار:
                                  <span class="text-dark ms-sm-2 font-weight-bold"> {{Math.round(withdraw.amount/10).toLocaleString('fa-IR')}} تومان </span>
                                </span>
                                <span class="mb-3 text-sm">
                                  آدرس:
                                  <span class="text-dark ms-sm-2 font-weight-bold" dir="ltr"> {{withdraw.wallet_address}} </span>
                                </span>
                                <span class="mb-3 text-sm" v-if="withdraw.hash">
                                  هش:
                                  <span class="text-dark ms-sm-2 font-weight-bold" dir="ltr"> {{withdraw.hash}} </span>
                                </span>
                                <span class="mb-3 text-sm">
                                  انجام شده:
                                  <span class="text-dark ms-sm-2 font-weight-bold" dir="ltr"> 
                                    <i v-if="withdraw.is_done" class="fa fa-check-circle text-success"></i>
                                    <i v-else class="fa fa-times-circle text-danger"></i>    
                                </span>
                                </span>
                                <span class="text-sm">
                                  زمان:
                                  <span class="text-dark ms-sm-2 font-weight-bold" dir="ltr" style="direction: ltr; text-align: end;"> 
                                    {{ new Date(withdraw.created_at).toLocaleString('fa-IR').slice(0, -3) }}
                                  </span>
                                </span>
                              </div>
                            </li>
                          </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 mb-5">
                <div class="card">
                    <div class="card-header pb-0 px-3">
                        <h6 class="mb-4"> ثبت درخواست برداشت </h6>
                    </div>
                    <div class="mb-3 mt-3 text-xs text-center" v-if="store.state.profile.balance != null">
                      <span> 
                        موجودی فعلی: 
                      </span> 

                      <span class="font-weight-bold text-dark pe-2">
                        {{ Math.round(store.state.profile.balance/10).toLocaleString('fa-IR') }} تومان
                      </span>
                      
                      <div class="text-xs mt-2 text-center" v-if="usdtPrice"> 
                        نرخ تتر:
                        <span class="font-weight-bold text-dark">
                          {{(Number(usdtPrice)/10).toLocaleString('fa-IR')}} تومان
                        </span>
                      </div>
                    </div>
                    <div v-if="step == 1" class="text-center mt-4 mb-3" :class="{'mb-5': withdraw_type == ''}">
                      <p class="text-xs text-end px-3 mb-1"> برداشت ها (ریالی و کریپتو) حداکثر ظرف ۲۴ ساعت کاری انجام میشود. </p>
                      <p class="text-xs text-end px-3 mb-4"> در برداشت کریپتو, مبلغ برداشت را به تومان وارد کرده, و معادل آن با قیمت بازار, کریپتو برای شما بصورت خودکار ارسال میشود </p>
                      <div class="form-check form-check-inline">
                        <input @click="withdraw_type = 'rial'" class="form-check-input ms-1" type="radio" name="withdrawType" id="rialWithdraw" value="option1" :checked="withdraw_type == 'rial'">
                        <label class="form-check-label" for="rialWithdraw"> برداشت ریالی </label>
                      </div>
                      <div class="form-check form-check-inline me-4">
                        <input @click="withdraw_type = 'crypto'" class="form-check-input ms-1" type="radio" name="withdrawType" id="usdtWithdraw" value="option2" :checked="withdraw_type == 'crypto'">
                        <label class="form-check-label" for="usdtWithdraw"> برداشت کریپتو </label>
                      </div>
                    </div>

                    <div class="card-body text-sm pt-0 px-0 px-sm-4 px-md-5 px-lg-0 px-xxl-3" v-if="withdraw_type == 'crypto'">
                        <form @submit.prevent="getWallets" class="row m-0" v-if="step == 1">
                          <div class="col-md-8 col-lg-12 col-xxl-9 mb-2 mx-auto">
                            <label for="" class="form-label"> مبلغ برداشت: </label>
                            <div class="position-relative">
                              <input type="text" class="form-control" :class="{'invalid' : amount*10 > store.state.profile.balance }" v-model="amount">
                              <button type="button" class="pointer btn btn-xs bg-gradient-success py-1 px-2 eye-absolute" @click="amount = store.state.profile.balance/10"> کل موجودی </button>
                            </div>
                            <div class="me-3 mt-2 text-xs font-weight-bold text-dark"> {{ Number(trans_num(amount)).toLocaleString('fa-IR') }} تومان معادل {{ Number((trans_num(amount) * 10 / parseInt(usdtPrice)).toFixed(1)).toLocaleString('fa-IR') }} USDT </div>
                            
                            </div>
                            <div class="text-danger text-sm text-center mt-3" style="visibility: hidden;"
                            :class="{'visible': amount * 10 > store.state.profile.balance}"> (مبلغ وارد شده بیشتر از موجودی شماست) </div>
                            <div class="mt-2 text-center">
                                <button type="submit" class="btn btn-sm btn-success px-5" id="firstBtn"> ثبت </button>
                            </div>
                        </form>

                        <div class="row mt-4 m-0" v-if="step == 2">
                            <div class="row m-0 p-0">
                                <p class="text-sm col"> انتخاب کیف پول </p>
                                <span class="col-auto me-auto pointer" title="بازگشت" @click="step = 1"> <i class="fa fa-long-arrow-left"></i> </span>
                            </div>
                            <hr/>
                            <div v-if="!walletData[0]" class="text-center mt-4">
                                <p class="text-sm mb-3"> ابتدا ولتی اضافه کنید: </p>
                                <router-link to="/wallet" class="btn btn-primary btn-sm"> افزودن ولت </router-link>
                            </div>
                            <div class="bg-gray-100 py-2 rounded border row m-0" v-for="wallet, index in walletData" :key="index">
                                <div class="col">
                                    <p class="font-weight-bold text-sm text-dark"> {{ wallet.name }} </p>
                                    <p class="text-xs"> {{ wallet.address }} </p>
                                </div>
                                <button class="btn btn-sm btn-primary px-3 col-auto mt-3" @click="createWithdraw(wallet)"> انتخاب </button>
                            </div>
                        </div>

                        <div class="row m-0 pb-4" v-if="step == 3">
                            <p class="text-sm font-weight-bold text-dark text-center mb-4 pb-2"> 
                                برای انجام برداشت کدهای تایید پیامک و ایمیل شده را وارد کنید. 
                                <span class="text-xs text-secondary"> (درصورت عدم دریافت مجدد مراحل را انجام دهید) </span>
                            </p>
                            <div class="col-lg-6 position-relative">
                                <label for="example-text-input" class="form-control-label"> کد تایید پیامک: </label> 
                                <input class="form-control mb-3" v-model="phone_otp" type="text" :disabled="submited_phone" :class="{'submited-inp' :submited_phone}"/>
                                <button class="btn btn-success btn-sm px-2 absolute-btn noDisabled" 
                                @click="confirmWithdraw('phone')" :disabled="phone_otp.length != 6 || submited_phone"> 
                                    تایید
                                    <div v-if="confirmLoading" class="loader"></div>
                                </button>
                            </div>
                            <div class="col-lg-6 position-relative">
                                <label for="example-text-input" class="form-control-label"> کد تایید ایمیل: </label> 
                                <input class="form-control mb-3" v-model="email_otp" type="text" :disabled="submited_email" :class="{'submited-inp' :submited_email}"/>
                                <button class="btn btn-success btn-sm px-2 absolute-btn noDisabled"
                                @click="confirmWithdraw('email')" :disabled="email_otp.length != 6 || submited_email">
                                    تایید
                                    <div v-if="confirmLoading" class="loader"></div>
                                </button>
                            </div>
                        </div>

                    </div>


                    <div class="card-body text-sm pt-0 px-0 px-sm-4 px-md-5 px-lg-0 px-xxl-3" v-else-if="withdraw_type == 'rial'">
                      <form @submit.prevent="getCards" class="row m-0" v-if="step == 1">
                        <div class="col-md-8 col-lg-12 col-xxl-9 mb-2 mx-auto">
                          <label for="" class="form-label"> مبلغ برداشت: </label>
                          <div class="position-relative">
                            <input type="text" class="form-control" :class="{'invalid' : amount * 10 > store.state.profile.balance }" v-model="amount">
                            <button type="button" class="pointer btn btn-xs bg-gradient-success py-1 px-2 eye-absolute" @click="amount = store.state.profile.balance / 10"> کل موجودی </button>
                          </div>
                          <div class="me-3 mt-2 text-xs font-weight-bold text-dark"> {{ Number(trans_num(amount)).toLocaleString('fa-IR') }} تومان معادل {{ Number((trans_num(amount) * 10 / parseInt(usdtPrice)).toFixed(1)).toLocaleString('fa-IR') }} USDT </div>
                              
                          </div>
                          <div class="text-danger text-sm text-center mt-3" style="visibility: hidden;"
                          :class="{'visible': amount * 10 > store.state.profile.balance}"> (مبلغ وارد شده بیشتر از موجودی شماست) </div>
                          <div class="mt-2 text-center">
                              <button type="submit" class="btn btn-sm btn-success px-5" id="firstBtn"> ثبت </button>
                          </div>
                      </form>

                      <div class="row mt-4 m-0" v-if="step == 2">
                          <div class="row m-0 p-0">
                              <p class="text-sm col"> انتخاب شماره کارت / شبا </p>
                              <span class="col-auto me-auto pointer" title="بازگشت" @click="step = 1"> <i class="fa fa-long-arrow-left"></i> </span>
                          </div>
                          <hr/>
                          <div v-if="!cardData[0]" class="text-center mt-4">
                              <p class="text-sm mb-3"> ابتدا اطلاعات بانکی خود را اضافه کنید: </p>
                              <router-link to="/card" class="btn btn-primary btn-sm"> افزودن اطلاعات بانکی </router-link>
                          </div>
                          <div class="bg-gray-100 py-2 rounded border row m-0" v-for="card, index in cardData" :key="index">
                              <div class="col">
                                  <p class="font-weight-bold text-sm text-dark"> {{ card.number.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]) }} </p>
                                  <p class="text-xs" v-if="card.type == 'Card'"> شماره کارت </p>
                                  <p class="text-xs" v-else> شماره شبا </p>
                              </div>
                              <button class="btn btn-sm btn-primary px-3 col-auto mt-3" @click="createRialWithdraw(card)"> انتخاب </button>
                          </div>
                      </div>

                      <div class="row m-0 pb-4" v-if="step == 3">
                          <p class="text-sm font-weight-bold text-dark text-center mb-4 pb-2"> 
                              برای انجام برداشت کدهای تایید پیامک و ایمیل شده را وارد کنید. 
                              <span class="text-xs text-secondary"> (درصورت عدم دریافت مجدد مراحل را انجام دهید) </span>
                          </p>
                          <div class="col-lg-6 position-relative">
                              <label for="example-text-input" class="form-control-label"> کد تایید پیامک: </label> 
                              <input class="form-control mb-3" v-model="phone_otp" type="text" :disabled="submited_phone" :class="{'submited-inp' :submited_phone}"/>
                              <button class="btn btn-success btn-sm px-2 absolute-btn noDisabled" 
                              @click="confirmWithdraw('phone')" :disabled="phone_otp.length != 6 || submited_phone"> 
                                  تایید
                                  <div v-if="confirmLoading" class="loader"></div>
                              </button>
                          </div>
                          <div class="col-lg-6 position-relative">
                              <label for="example-text-input" class="form-control-label"> کد تایید ایمیل: </label> 
                              <input class="form-control mb-3" v-model="email_otp" type="text" :disabled="submited_email" :class="{'submited-inp' :submited_email}"/>
                              <button class="btn btn-success btn-sm px-2 absolute-btn noDisabled"
                              @click="confirmWithdraw('email')" :disabled="email_otp.length != 6 || submited_email">
                                  تایید
                                  <div v-if="confirmLoading" class="loader"></div>
                              </button>
                          </div>
                      </div>

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
import { useStore } from 'vuex'
import { trans_num } from '../main.js'

export default{
    setup(){
      let store = useStore()
      let firstLoading = ref(true)
      let data = ref({})
      let amount = ref('')
      let step = ref(1)
      let walletData = ref([])
      let cardData = ref([])
      let phone_otp = ref('')
      let submited_phone = ref(false)
      let email_otp = ref('')
      let submited_email = ref(false)
      let withdraw_id = ref()
      let confirmLoading = ref(false)
      let withdraw_type = ref('')
      let usdtPrice = ref()

      function getWithdraws(){
        firstLoading.value = true
        axios
        .get('financial/transactionList')
        .then(response => {
          firstLoading.value = false
          data.value = response.data.withdraw
          usdtPrice.value = response.data.usdt_price
        })
        .catch(() => {
          firstLoading.value = false
        })
      }

      function getWallets(){
        if(walletData.value[0]){
            step.value = 2
            return
        }
        let btn = document.getElementById("firstBtn")
        let btnInner = btn.innerHTML
        btn.disabled = true
        btn.innerHTML += '<div class="loader"></div>'

        axios.get('wallet/list')
        .then((res) => {
          btn.disabled = false
          btn.innerHTML = btnInner
          walletData.value = res.data.data
          step.value = 2
        })
        .catch(() => {
          btn.disabled = false
          btn.innerHTML = btnInner
        })
      }

      function getCards(){
        if(cardData.value[0]){
            step.value = 2
            return
        }
        let btn = document.getElementById("firstBtn")
        let btnInner = btn.innerHTML
        btn.disabled = true
        btn.innerHTML += '<div class="loader"></div>'

        axios.get('card/list')
        .then((res) => {
          btn.disabled = false
          btn.innerHTML = btnInner
          cardData.value = res.data.data
          step.value = 2
        })
        .catch(() => {
          btn.disabled = false
          btn.innerHTML = btnInner
        })
      }


      function createWithdraw(wallet){

        Swal.fire({
          title: 'درخواست برداشت را تایید میکنید؟ ',
          text: `درخواست برداشت ${(Number(trans_num(amount.value))).toLocaleString('fa-IR')} تومان به ولت ${wallet.address} (${wallet.name})`,
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'بلی',
          denyButtonText: `خیر`,
        }).then((result) => {
            if (result.isConfirmed) {
                firstLoading.value = true

                axios.post('financial/createWithdraw', {
                amount: trans_num(amount.value) * 10,
                wallet_id: wallet.id,
                type: "crypto"
                })
                .then((res) => {
                    firstLoading.value = false
                    step.value = 3
                    withdraw_id.value = res.data.withdraw_id
                })
                    .catch(() => {
                    firstLoading.value = false
                })
            }
        })
      }


      function createRialWithdraw(card){

        Swal.fire({
          title: 'درخواست برداشت را تایید میکنید؟ ',
          text: `درخواست برداشت ${(Number(trans_num(amount.value))).toLocaleString('fa-IR')} تومان به ${card.type == 'Shaba' ? 'شماره شبا' : 'شماره کارت'} ${card.number.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])}`,
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'بلی',
          denyButtonText: `خیر`,
        }).then((result) => {
            if (result.isConfirmed) {
                firstLoading.value = true

                axios.post('financial/createWithdraw', {
                amount: trans_num(amount.value) * 10,
                card_id: card.id,
                type: "rial"
                })
                .then((res) => {
                    firstLoading.value = false
                    step.value = 3
                    withdraw_id.value = res.data.withdraw_id
                })
                    .catch(() => {
                    firstLoading.value = false
                })
            }
        })
      }

      function confirmWithdraw(otp_type){
			let data = otp_type == "email" ? {"withdraw_id": withdraw_id.value, "email_otp": email_otp.value} : {"withdraw_id": withdraw_id.value, "phone_otp": phone_otp.value}
			confirmLoading.value = true
			axios.post("financial/confirmWithdraw", data).then((res)=>{
				confirmLoading.value = false
				if(otp_type == 'email'){
					submited_email.value = true
				}else{
					submited_phone.value = true
				}
				if (res.status == 201){
          amount.value = null
          firstLoading.value = true
					getWithdraws()
          step.value = 1
				}
			}).catch(()=>{
				confirmLoading.value = false
			})
		}


      getWithdraws()

      return { firstLoading, data, amount, step, store, createWithdraw, getWallets, 
        walletData, confirmWithdraw, phone_otp, submited_phone, email_otp, submited_email,
        confirmLoading, withdraw_type, createRialWithdraw, cardData, getCards, usdtPrice, trans_num }
    }
}

</script>

<style>

.submited-inp{
	border-color: seagreen;
	background-color: rgba(46, 139, 87, .15) !important;
}

.invalid{
  border-color: rgb(243, 9, 9) !important;
  background-color: rgba(243, 9, 9, 0.1) !important;
}

</style>
