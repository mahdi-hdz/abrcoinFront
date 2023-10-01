<template>
  <div v-if="firstLoading" class="fullscreen">
    <div class="loader"></div>
  </div>
  <div class="container-fluid p-0 px-sm-3">
    <div class="row m-0">
      <div class="col-md-7 mb-3">
        <div class="card h-100">
          <div class="card-header pb-0 px-3">
            <h6 class="mb-4"> ولت های ثبت شده </h6>
          </div>
          <div class="card-body pt-4 p-1 p-sm-3">
            <ul class="list-group p-1 pe-sm-3">

              <li class="list-group-item border-0 d-flex p-1 py-4 p-sm-4 mb-3 bg-gray-100 border-radius-lg"
                v-for="wallet, index in data" :key="index">
                <div class="d-flex flex-column">
                  <h6 class="mb-3 text-sm"> {{wallet.name}}</h6>
                  <span class="mb-2 text-xs">
                    آدرس:
                    <span class="text-dark font-weight-bold ms-sm-2"> {{wallet.address}} </span>
                  </span>
                  <span class="mb-2 text-xs">
                    شبکه:
                    <span class="text-dark ms-sm-2 font-weight-bold"> {{wallet.network}} </span>
                  </span>
                  <span class="text-xs">
                    زمان ساخت:
                    <span class="text-dark ms-sm-2 font-weight-bold" dir="ltr" style="direction: ltr; text-align: end;"> 
                      {{ new Date(wallet.created_at).toLocaleString('fa-IR').slice(0, -3) }}
                    </span>
                  </span>
                </div>
                <div class="me-auto text-end">
                  <span class="btn btn-link text-danger text-gradient px-3 mb-0" @click="deleteWallet(wallet.id)">
                    <i class="far fa-trash-alt"></i> <span class="d-none d-sm-inline-block">حذف</span>
                  </span>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-5 mb-3">
        <div class="card h-100 mb-4">
          <div class="card-header pb-0 px-3">
            <h6 class="mb-4"> <i class="fa fa-circle text-sm ms-2"></i> افزودن ولت </h6>
      
          </div>
          <div class="card-body pt-4 p-3">
            <form class="row m-0" @submit.prevent="addWallet">
              <div class="col-md-6">
                <label for="example-text-input" class="form-control-label">
                  نام دلخواه
                  <span class="text-secondary text-end" style="font-size: 0.62rem !important;"> (صرفا جهت نمایش برای خودتان) </span>
                </label>
                <input v-model="name" class="form-control form-control-default" type="text"/>
              </div>
              <div class="col-md-6 d-flex">
                <span class="mt-auto w-100">
                  <label for="example-text-input" class="form-control-label"> شبکه </label>
                  <select name="newFinanType" id="newFinanType" class="form-control pointer" v-model="network">
                    <option value="انتخاب کنید" selected hidden> انتخاب کنید </option>
                    <option value="TRC20"> TRC20 </option>
                  </select>
                </span>
              </div>
              <div class="mt-3">
                <label for="example-text-input" class="form-control-label"> آدرس </label>
                <input v-model="address" class="form-control form-control-default" type="text"/>
              </div>
      
              <div class="mt-5">
                <button class="btn mb-0 btn-success btn-md font-iran py-2 px-5" id="walletBtn" type="submit"> ثبت </button>
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


export default {
  name: "Wallet",
  setup(){
    let firstLoading = ref(true)
    let data = ref({})
    let name = ref()
    let network = ref("انتخاب کنید")
    let address = ref()

    function getWallets(){
			firstLoading.value = true
			axios
			.get('wallet/list')
			.then(response => {
				firstLoading.value = false
				data.value = response.data.data
			})
			.catch(() => {
				firstLoading.value = false
			})
		}

    function addWallet(){
      if(network.value != "TRC20"){
        Swal.fire("شبکه به درستی انتخاب نشده", "", "warning")
        return
      }
			let btn = document.getElementById("walletBtn")
      let btnInner = btn.innerHTML
      btn.disabled = true
      btn.innerHTML += '<div class="loader"></div>'
			axios
			.post('wallet/add', {
				name: name.value,
				address: address.value,
				network: network.value
			})
			.then(() => {
				getWallets()
				btn.disabled = false
        btn.innerHTML = btnInner
        name.value = ''
        address.value = ''
        network.value = ''
			})
			.catch(() => {
        btn.disabled = false
        btn.innerHTML = btnInner
			})
		}

		getWallets()

    function deleteWallet(id){
      firstLoading.value = true
      axios.post("wallet/remove", {
        id: id
      }).then(()=>{
        getWallets()
        firstLoading.value = false
      }).catch(()=>{
        firstLoading.value = false
      })
    }

    return { firstLoading , name, network, address, addWallet, data, deleteWallet }
  }
};
</script>
