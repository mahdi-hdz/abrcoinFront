<template>
  <div v-if="firstLoading" class="fullscreen">
    <div class="loader"></div>
  </div>
    <div class="container-fluid p-0 px-sm-3">
        <div class="row m-0">
            <div class="col-lg-8 mb-3">
                <div class="card pb-3">
                    <div class="card-header pb-0 px-3">
                        <h6 class="mb-4"> واریزها </h6>
                    </div>
                    <div style="overflow-x: scroll;">
                      <div class="font-weight-bold text-center my-5 py-5" v-if="!data[0]"> سابقه ای برای واریزی های شما وجود ندارد </div>
                      <table v-else class="table text-center mb-0 mt-4 w-100">
                          <thead class="text-dark">
                            <tr>
                                <th class="text-xs font-weight-bolder ps-2"> شناسه </th>
                                <th class="text-xs font-weight-bolder ps-2"> مقدار </th>
                                <th class="text-xs font-weight-bolder ps-2"> پرداخت شده </th>
                                <th class="text-xs font-weight-bolder ps-2"> درگاه </th>
                                <th class="text-xs font-weight-bolder"> کد پیگیری </th>
                              <th class="text-xs font-weight-bolder ps-2"> زمان </th>
                            </tr>
                          </thead>
                          <tbody class="text-sm">
                            <tr v-for="dep, index in data" :key="index">
                              <td class="py-3">
                                  #{{String(dep.authority).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])}}
                              </td>
                              <td class="py-3">
                                  {{Number(dep.amount/10).toLocaleString('fa-IR')}} تومان
                              </td>
                              <td class="py-3">
                                <i v-if="dep.is_pay" class="fa fa-check-circle text-success"></i>
                                <i v-else class="fa fa-times-circle text-danger"></i>
                              </td>
                              <td class="py-3">
                                <span v-if="dep.gateway == 'zarinpal'"> زرین پال (ریالی) </span>
                                <span v-else-if="dep.gateway == 'crypto'"> کریپتو </span>
                              </td>
                              <td class="py-3">
                                  {{dep.ref_id}}
                              </td>
                              <td class="py-3" dir="ltr" style="direction: ltr; text-align: end;">
                                {{ new Date(dep.created_at).toLocaleString('fa-IR').slice(0, -3) }}
                              </td>
  
                            </tr>
                          </tbody>
                      </table>
                    </div>

                </div>
            </div>
            <div class="col-lg-4 mb-3">
                <div class="card pb-3">
                    <div class="card-header pb-0 px-3">
                        <h6 class="mb-4"> <i class="fa fa-circle text-sm ps-1"></i> واریز جدید </h6>
                    </div>

                    <div class="card-body px-2 px-sm-4" v-if="!generatedAddress">
                      <p class="text-sm text-center" v-if="usdtPrice"> نرخ تتر: <span class="font-weight-bold">{{(Number(usdtPrice)/10).toLocaleString('fa-IR')}} تومان</span> </p>

                        <div class="text-center">
                            <label> درگاه پرداخت مورد نظر را انتخاب کنید: </label>
                        </div>
                        <div class="radio-inputs">
                            <label @click="gatewaySelected = 'zarinpal'">
                                <input class="radio-input" type="radio" name="engine">
                                <span class="radio-tile">
                                    <span class="radio-icon">
                                    <img src="../assets/img/zarinpal.png" alt="زرین پال">
                                    </span>
                                    <span class="radio-label mt-1"> زرین پال (ریالی) </span>
                                </span>
                            </label>
                            <label @click="gatewaySelected = 'crypto'">
                                <input class="radio-input" type="radio" name="engine">
                                <span class="radio-tile">
                                    <span class="radio-icon">
                                        <i class="fab fa-bitcoin fs-1" style="color: #344767;"></i>
                                        <!-- <img src="../assets/img/nowpayments.png" alt="Nowpayments"> -->
                                    </span>
                                    <span class="radio-label mb-3"> کریپتو </span>
                                </span>
                            </label>

                            
                          </div>
                        <div class="mt-5">
                          <div v-if="gatewaySelected == 'zarinpal'" class="col-md-8 col-lg-12 col-xxl-7 mx-auto">
                            <label for="example-text-input" class="form-control-label"> مبلغ (تومان) </label>
                            <input v-model="amount" class="form-control form-control-default" type="text" maxlength="11"/>
                            <span class="text-sm mb-3 d-inline-block"> {{ Number(amount).toLocaleString('fa-IR') }} تومان معادل {{ ((amount * 10 / parseInt(usdtPrice)).toFixed(1)).toLocaleString('fa-IR') }} USDT </span>
                            <p class="text-sm text-danger" v-if="5000000 > amount"> حداقل واریز ریالی ۵ میلیون تومان می باشد </p>
                          </div>
                          
                          <div v-if="gatewaySelected == 'crypto'" class="col-md-8 col-lg-12 col-xxl-7 mx-auto">
                            <label for="newFinanType" class="form-control-label"> نوع ارز </label>
                            <select name="newFinanType" id="newFinanType" class="form-control mb-3" v-model="currencySelected">
                              <option value="انتخاب کنید" selected hidden> انتخاب کنید </option>
                              <!-- <option value="trx"> Tron (TRX) </option> -->
                              <option value="usdt"> Tether (USDT) </option>
                            </select>
                            <p class="text-sm text-danger"> دقت کنید که حداقل مبلغ واریز کوین باید ۱۰۰ تتر باشد </p>
                          </div>
                        </div>
                        
                        <div v-if="gatewaySelected == 'zarinpal'" class="text-center mt-4">
                          <button @click="zarinPay" class="btn btn-success btn-sm font-iran" id="zarinBtn"> پرداخت </button>
                        </div>
                        
                        <div v-if="gatewaySelected == 'crypto'" class="text-center mt-4">
                          <button @click="cryptoPay" class="btn btn-success btn-sm font-iran" id="cryptoBtn"> ساخت آدرس بلاکچین </button>
                        </div>
                        <p class="text-xs"> توجه داشته باشید که در واریز های کریپتو بصورت خودکار و در لحظه حساب شما شارژ میشود و در واریز های ریالی پس از تایید ادمین این عمل حداکثر ظرف ۲۴ ساعت کاری انجام میشود. </p>

                    </div>

                    <div v-else class="card-body text-center">
                      <p class="font-weight-bold"> آدرس ساخته شده برای {{currencySelected.toUpperCase()}}: </p>
                      <div id="qrCodeWrapp" class="col-7 col-sm-4 mx-auto mt-4 mb-3">
                        <qr-code :text="generatedAddress"></qr-code>
                      </div>
                      <div class="mb-5 shadow-sm py-2 border rounded">
                        <button class="btn py-1 px-2 ms-3 btn-primary mb-0" @click="copyItem(generatedAddress)"> 
                          <i class="fa fa-copy"></i> 
                        </button>
                        <strong class="text-sm"> {{generatedAddress}} </strong> 
                      </div>
                      <p class="text-xs font-weight-bold pt-3"> پس از انجام واریز به آدرس نمایش داده شده, هش (Hash) تراکنش مربوطه را در بخش 'ثبت واریز کریپتو' وارد کنید تا حسابتان شارژ شود. </p>
                    </div>

                </div>
                <div class="card mt-4">
                  <div class="card-header pb-0 px-3">
                    <h6> <i class="fa fa-circle text-sm ps-1"></i> ثبت واریز کریپتو </h6>
                    <div class="text-xs text-dark font-weight-bold mb-5 px-3 pt-2">
                      هش (Hash) تراکنش واریزی را وارد کنید تا سیستم بصورت خودکار حساب شما را شارژ کند.
                    </div>
                  </div>

                  <form class="card-body pt-1" @submit.prevent="submitHash">
                    <div class="col-md-8 mx-auto">
                      <label for="example-text-input" class="form-control-label"> آدرس هش </label>
                      <input v-model="hash" class="form-control form-control-default" type="text"/>
                    </div>

                    <div class="text-center mt-4">
                      <button class="btn btn-success btn-sm font-iran px-5" id="hashBtn" type="submit">
                        ثبت
                      </button>
                    </div>

                  </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import Swal from 'sweetalert2'


export default{
    setup(){
      let firstLoading = ref(true)
      let gatewaySelected = ref()
      let currencySelected = ref('انتخاب کنید')
      let data = ref({})
      let amount = ref('')
      let hash = ref('')
      let generatedAddress = ref()
      let usdtPrice = ref()

      function getDeposits(){
        firstLoading.value = true
        axios
        .get('financial/transactionList')
        .then(response => {
          firstLoading.value = false
          data.value = response.data.deposit
          usdtPrice.value = response.data.usdt_price
        })
        .catch(() => {
          firstLoading.value = false
        })
      }

      function zarinPay(){
        let btn = document.getElementById("zarinBtn")
        let btnInner = btn.innerHTML
        btn.disabled = true
        btn.innerHTML += '<div class="loader"></div>'

        axios.post('financial/deposit', {
          amount: amount.value * 10,
          gateway: gatewaySelected.value
        })
        .then((res) => {
          btn.disabled = false
          btn.innerHTML = btnInner
          window.location.replace(res.data.link)
        })
        .catch(() => {
          btn.disabled = false
          btn.innerHTML = btnInner
        })
      }


      function cryptoPay(){
        let btn = document.getElementById("cryptoBtn")
        let btnInner = btn.innerHTML
        btn.disabled = true
        btn.innerHTML += '<div class="loader"></div>'

        axios.post('financial/deposit', {
          currency: currencySelected.value,
          gateway: gatewaySelected.value
        })
        .then((res) => {
          btn.disabled = false
          btn.innerHTML = btnInner
          generatedAddress.value = res.data.address
        })
        .catch(() => {
          btn.disabled = false
          btn.innerHTML = btnInner
        })
      }

      function submitHash(){
        let btn = document.getElementById("hashBtn")
        let btnInner = btn.innerHTML
        btn.disabled = true
        btn.innerHTML += '<div class="loader"></div>'

        axios.post('financial/verifyDeposit', {
          hash: hash.value,
        })
        .then(() => {
          btn.disabled = false
          btn.innerHTML = btnInner
          hash.value = ''
        })
        .catch(() => {
          btn.disabled = false
          btn.innerHTML = btnInner
        })
      }


      function copyItem(item){
          navigator.clipboard.writeText(item)
          Swal.fire({title: "کپی شد", showConfirmButton: false, timer: 750, backdrop: false, position: "top"})
        }

      getDeposits()

      return { firstLoading, data, amount, gatewaySelected, currencySelected, 
        zarinPay, cryptoPay, generatedAddress, copyItem, submitHash, hash, usdtPrice }
    }
}

</script>

<style>

.radio-inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  /* max-width: 350px; */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.radio-inputs > * {
  margin: 6px;
}

.radio-input:checked + .radio-tile {
  border-color: #2260ff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  color: #2260ff;
}

.radio-input:checked + .radio-tile:before {
  transform: scale(1);
  opacity: 1;
  background-color: #2260ff;
  border-color: #2260ff;
}

.radio-input:checked + .radio-tile .radio-icon svg {
  fill: #2260ff;
}

.radio-input:checked + .radio-tile .radio-label {
  color: #2260ff;
}

.radio-input:focus + .radio-tile {
  border-color: #2260ff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc;
}

.radio-input:focus + .radio-tile:before {
  transform: scale(1);
  opacity: 1;
}

.radio-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 112px;
  min-height: 112px;
  border-radius: 0.5rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: 0.15s ease;
  cursor: pointer;
  position: relative;
}

.radio-tile:before {
  content: "";
  position: absolute;
  display: block;
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  border-radius: 50%;
  top: 0.25rem;
  left: 0.25rem;
  opacity: 0;
  transform: scale(0);
  transition: 0.25s ease;
}

.radio-tile:hover {
  border-color: #2260ff;
}

.radio-tile:hover:before {
  transform: scale(1);
  opacity: 1;
}

.radio-icon img {
  width: 6.2rem;
  fill: #494949;
}

.radio-label {
  color: #707070;
  transition: 0.375s ease;
  text-align: center;
  transform: translateY(20px);
  font-size: 13px;
}

.radio-input {
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(100%);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

#qrCodeWrapp div img{
  width: 100% !important;
}

</style>
