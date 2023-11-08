<template>
    <div v-if="firstLoading" class="fullscreen">
        <div class="loader"></div>
    </div>
    <div class="container-fluid p-0 px-sm-3">
        
        <div class="row m-0">
            <div class="col-md-12 mb-3">
                <div class="card h-100">
                    <div class="card-header pb-0 px-3">
                        <h6 class="mb-4"> انتخاب نوع سپرده </h6>
                    </div>
                    
                    <div class="row m-0 mx-0 mx-sm-2 mx-xxl-5 px-0 px-sm-2 py-5">
                        <div v-for="plan, index in invest_plans" :key="index" class="col-12 col-md-6 col-lg-4 col-xl-6 col-xxl-4 my-2 px-1 px-sm-2 px-lg-1">
                            <div class="px-4 px-md-5 px-lg-4 px-ml-5 pt-4 pb-0 border shadow-lg rounded-3" :style="plan.bg">
                                <div class="mb-4 font-weight-bold text-dark"><strong >{{plan.name}}</strong></div>
                                <!-- <div class="mb-2 pt-4 text-xs text-dark">میزان کامزد:</div> -->
                                <!-- <div class="progress" style="height: 22px;">
                                    <div class="progress-bar bg-info rounded-0 rounded-end" :style="{'width':100-plan.fee-.3+'%'}"></div>
                                    <div class="progress-bar bg-light" style="width: .3%"></div>
                                    <div class="progress-bar bg-success rounded-0 rounded-start" :style="{'width':plan.fee+'%'}"></div>
                                </div> -->
                                <div class="card py-3" style="background: rgba(255,255,255, .4);">
                                    <span>کارمزد</span>
                                    <ConsumptionRoomChart class="h-100" :abrcoin_stock=plan.fee :user_stock="100-plan.fee" :id="index"/>
                                </div>
                                
                                <!-- <div class="table-responsive mt-3 text-sm">
                                    <table class="table mb-0 align-items-center">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="px-2 py-0 d-flex">
                                                        <span class="badge bg-info me-2">&nbsp;</span>
                                                        <div class="d-flex flex-column justify-content-center">
                                                            <h6 class="mb-0 pe-2 text-sm"> سهم شما </h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="text-sm text-center align-middle">
                                                    <span class="text-xs font-weight-bold">{{(100-plan.fee).toLocaleString('fa-IR')}}%</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="px-2 py-0 d-flex">
                                                        <span class="badge bg-success me-2">&nbsp;</span>
                                                        <div class="d-flex flex-column justify-content-center">
                                                            <h6 class="mb-0 pe-2 text-sm"> سهم ابرکوین </h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="text-sm text-center align-middle">
                                                    <span class="text-xs font-weight-bold">{{(plan.fee).toLocaleString('fa-IR')}}%</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> -->
                                
                                <button class="btn bg-gradient-success btn-sm w-100 mt-5 mb-4" 
                                data-bs-toggle="modal" data-bs-target="#purchasePlanModal" @click="plan_selected = plan, gatewaySelected = '', get_usdt_price()"> 
                                    پرداخت
                            </button>
                            
                        </div>
                    </div>
                </div>
                
                </div>
            </div>
        </div>
    
</div>

<div class="modal fade" id="purchasePlanModal" tabindex="-1" style="z-index: 10001 !important;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5"> فعالسازی {{plan_selected.name}} </h1>
                <button type="button" class="bg-transparent border-0" id="closeModal" data-bs-dismiss="modal"><i class="fa fa-times fs-5"></i></button>
            </div>
            <div class="modal-body">
                <p class="text-sm text-center" v-if="usdtPrice"> نرخ تتر: <span class="font-weight-bold">{{(Number(usdtPrice)/10).toLocaleString('fa-IR')}} تومان</span> </p>
                
                <div class="text-center">
                    <label> درگاه پرداخت مورد نظر را انتخاب کنید: </label>
                </div>
                <div class="radio-inputs">
                    <label @click="gatewaySelected = 'zarinpal'">
                        <input class="radio-input" type="radio" name="engine" :checked="gatewaySelected == 'zarinpal'">
                        <span class="radio-tile">
                            <span class="radio-icon">
                                <img src="../assets/img/zarinpal.png" alt="زرین پال">
                            </span>
                            <span class="radio-label mt-1"> زرین پال (ریالی) </span>
                        </span>
                    </label>
                    <label @click="gatewaySelected = 'crypto'">
                        <input class="radio-input" type="radio" name="engine" :checked="gatewaySelected == 'crypto'">
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
                    <div v-if="gatewaySelected == 'zarinpal'" class="col-sm-10 mx-auto">
                        <label for="example-text-input" class="form-control-label"> مبلغ (تومان) </label>
                        <input v-model="amount" class="form-control form-control-default" type="text" maxlength="11"/>
                        <span class="text-sm mb-3 d-inline-block"> 
                            {{ Number(trans_num(amount)).toLocaleString('fa-IR') }} تومان 
                            <span v-if="usdtPrice"> 
                                معادل {{ Number((trans_num(amount) * 10 / parseInt(usdtPrice)).toFixed(1)).toLocaleString('fa-IR') }} USDT
                            </span>
                        </span>
                        <p class="text-sm text-danger" v-if="plan_selected.min_rial > trans_num(amount)"> حداقل واریز ریالی {{plan_selected.min_rial_text}} میلیون تومان می باشد </p>
                    </div>
                    
                    <div v-if="gatewaySelected == 'crypto'" class="col-sm-10 mx-auto">
                        <div v-if="!generatedAddress">
                            <label for="newFinanType" class="form-control-label"> نوع ارز </label>
                            <select name="newFinanType" id="newFinanType" class="form-control mb-3" v-model="currencySelected">
                                <option value="انتخاب کنید" selected hidden> انتخاب کنید </option>
                                <!-- <option value="trx"> Tron (TRX) </option> -->
                                <option value="usdt"> Tether (USDT - TRC20) </option>
                            </select>
                            <p class="text-sm text-danger"> دقت کنید که حداقل مبلغ واریز کوین باید {{plan_selected.min_crypto}} تتر باشد </p>
                        </div>
                        <div v-else>
                            
                            <p class="font-weight-bold"> آدرس ساخته شده برای {{currencySelected.toUpperCase()}}: </p>
                            <div id="qrCodeWrapp" class="col-9 col-sm-4 mx-auto mt-4 mb-3">
                                <qr-code :text="generatedAddress"></qr-code>
                            </div>
                            <div class="mb-3 shadow-sm py-2 border rounded">
                                <button class="btn py-1 px-2 ms-3 btn-primary mb-0" @click="copyItem(generatedAddress)"> 
                                    <i class="fa fa-copy"></i> 
                                </button>
                                <strong class="text-sm"> {{generatedAddress}} </strong> 
                            </div>
                            <p class="text-xs font-weight-bold pt-3"> پس از انجام واریز به آدرس نمایش داده شده, هش (Hash) تراکنش مربوطه را در در فیلد زیر وارد کرده و تایید کنید.. </p>
                            
                            <form class="pt-3" @submit.prevent="submitHash">
                                <div>
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
                
                
                <div v-if="gatewaySelected == 'zarinpal' || (generatedAddress == null && gatewaySelected == 'crypto')" class="modal-footer pb-0 mt-5">
                    <button v-if="gatewaySelected == 'zarinpal'" id="zarinPayBtn" type="button"
                        class="btn btn-primary w-100 mb-0" @click="zarinPay">
                        انتقال به درگاه پرداخت 
                    </button>
                    <button v-if="gatewaySelected == 'crypto' && generatedAddress == null" id="blockchainBtn"
                    type="button" class="btn btn-primary w-100 mb-0" @click="generateBlockChain">
                    دریافت آدرس بلاکچین
                </button>
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
import { useRouter } from 'vue-router'
import ConsumptionRoomChart from "@/examples/Charts/ConsumptionRoomChart.vue";

export default {
    name: "Wallet",
    setup(){
        let router = useRouter()
        let firstLoading = ref(false)
        let name = ref()
        let network = ref("انتخاب کنید")
        let address = ref()
        let plan_selected = ref('')
        let gatewaySelected = ref('')

        let data = ref({})
        let invest_plans = [
            {"name": "طرح سه‌ماهه", "fee": 30, "backend_name": "۳ ماهه", "min_rial": 50_000_000, "min_rial_text": "۵۰", "min_crypto": "۱۰۰۰", "bg": "background-image: linear-gradient(310deg, rgba(94, 114, 228, 0.4) 0%, rgba(130, 94, 228, 0.4) 100%)"},
            {"name": "طرح شش‌ماهه", "fee": 20, "backend_name": "۶ ماهه", "min_rial": 50_000_000, "min_rial_text": "۵۰", "min_crypto": "۱۰۰۰", "bg": "background-image: linear-gradient(310deg, rgba(45, 206, 137, 0.4) 0%, rgba(45, 206, 204, 0.4) 100%)"},
            {"name": "طرح یک‌ساله", "fee": 10, "backend_name": "سالانه", "min_rial": 50_000_000, "min_rial_text": "۵۰", "min_crypto": "۱۰۰۰", "bg": "background-image: linear-gradient(310deg, rgba(251, 99, 64, 0.4) 0%, rgba(251, 177, 64, 0.4) 100%)"}
        ]
        let usdtPrice = ref()
        let generatedAddress = ref()
        let amount = ref('')
        let hash = ref('')
        let currencySelected = ref('انتخاب کنید')
        
        
        // function getData(){
        //     firstLoading.value = true
        //     axios
        //     .get('investment/status/')
        //     .then(response => {
        //         firstLoading.value = false
        //         data.value = response.data.data
        //     })
        //     .catch(() => {
        //         firstLoading.value = false
        //     })
        // }
        
        // getData()


        function get_usdt_price(){
            if(usdtPrice.value){
                return
            }
            axios.get('financial/tetherPrice')
            .then((res) => {
                usdtPrice.value = res.data.usdt_price
            })
        }
        
        function generateBlockChain(){
            let btn = document.getElementById("blockchainBtn")
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
        
        function copyItem(item){
            navigator.clipboard.writeText(item)
            Swal.fire({title: "کپی شد", showConfirmButton: false, timer: 750, backdrop: false, position: "top"})
        }
        
        
        function zarinPay(){
            let btn = document.getElementById("zarinPayBtn")
            let btnInner = btn.innerHTML
            btn.disabled = true
            btn.innerHTML += '<div class="loader"></div>'
            
            axios.post('investment/purchase', {
                plan: plan_selected.value.backend_name,
                amount: amount.value * 10,
                gateway: "zarinpal"
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
        
        function submitHash(){
            let btn = document.getElementById("hashBtn")
            let btnInner = btn.innerHTML
            btn.disabled = true
            btn.innerHTML += '<div class="loader"></div>'
            
            axios.post('investment/purchase', {
                plan: plan_selected.value.backend_name,
                gateway: "crypto",
                hash: hash.value,
            })
            .then(() => {
                btn.disabled = false
                btn.innerHTML = btnInner
                hash.value = ''
                document.getElementById("closeModal").click()
                router.push("/investment")
                // getStatus()
            })
            .catch(() => {
                btn.disabled = false
                btn.innerHTML = btnInner
            })
        }
        
        return { firstLoading , name, network, address, data, get_usdt_price,
            invest_plans, plan_selected, gatewaySelected, trans_num, usdtPrice, generatedAddress, 
            amount, hash, currencySelected, generateBlockChain, copyItem, submitHash, zarinPay }
        },
        components: {ConsumptionRoomChart}

    };
</script>
