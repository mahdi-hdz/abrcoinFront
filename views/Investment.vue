<template>
    <div v-if="firstLoading" class="fullscreen">
        <div class="loader"></div>
    </div>
    <div class="container-fluid p-0 px-sm-3">
        
    
    <div class="container-fluid py-4 p-0 px-sm-3">
        <div v-if="isDone" class="card p-3 mx-3 mb-3 text-light pb-0" style="background: rgba(0,0,0, .5);">
            <div v-if="!hasWithdraw" class="text-center">
                <strong class="text-sm"> طرح سرمایه گذاری {{name}} شما به اتمام رسیده, میتوانید کل مبلغ موجودی خود را برداشت کرده یا آنرا مجدد در صندوقی دیگر سرمایه گذاری کنید. </strong>
                <div class="text-center mt-4">
                    <button class="btn btn-sm bg-gradient-success mx-1 text-dark" data-bs-toggle="modal" data-bs-target="#investWithdrawModal">
                        برداشت موجودی
                    </button>
                    <button class="btn btn-sm bg-gradient-primary mx-1" data-bs-toggle="modal" data-bs-target="#reinvestModal">
                        سرمایه گذاری مجدد
                    </button>
                </div>
            </div>
            <div v-else class="pb-3 text-center">
                درخواست برداشت موجودی روی این صندوق ثبت شده و درحال بررسی و واریز توسط ادمین میباشد, لطفا صبور باشید.
            </div>
        </div>
        <div class="row m-0">
            <div class="col-lg-12">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-12">
                        <card
                        title="سود امروز"
                        :value="today_profit != null ? Math.round(today_profit/10).toLocaleString('fa-IR') : '-'"
                        percentage="تومان"
                        percentageColor=""
                        iconClass="ni ni-money-coins"
                        iconBackground="bg-gradient-primary"
                        detail=""
                        directionReverse></card>
                    </div>
                    <div class="col-lg-3 col-md-6 col-12">
                        <card
                        title="سود کلی"
                        :value="total_profit != null ? Math.round(total_profit/10).toLocaleString('fa-IR') : '-'"
                        percentage="تومان"
                        percentageColor=""
                        iconClass="ni ni-world"
                        iconBackground="bg-gradient-danger"
                        detail=""
                        directionReverse></card>
                    </div>
                    <div class="col-lg-3 col-md-6 col-12">
                        <card
                        title="موجودی فعلی"
                        :value="current_balance != null ? Math.round(current_balance/10).toLocaleString('fa-IR') : '-'"
                        percentage="تومان"
                        iconClass="ni ni-paper-diploma"
                        iconBackground="bg-gradient-success"
                        percentageColor=""
                        detail=""
                        directionReverse></card>
                    </div>
                    <div class="col-lg-3 col-md-6 col-12">
                        <div class="mb-4 card">
                            <div class="p-0 card-body">
                                <div class="d-flex justify-content-between">
                                    <div class="mb-2 p-3 text-sm font-weight-bold">
                                        زمان باقیمانده
                                    </div>
                                    <div class="py-2 ps-3">
                                        <div class="cprogress-bar"
                                         :class="this.$store.state.darkMode ? 'cprogress-bar-dark' : 'cprogress-bar-light'">
                                            <progress min="0" max="100" style="visibility:hidden;height:0;width:0;"></progress>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 mb-lg">
                        <div class="mb-lg-0 mb-4">
                            <div class="card" style="min-height: 474px;">
                                <div class="p-3 pb-0 card-header">
                                    <div class="d-flex justify-content-between">
                                        <h6 class="mb-2"> آخرین معاملات </h6>
                                    </div>
                                </div>
                                <div v-if="tradeLoading" style="min-height: 407px;">
                                    <div class="loader"></div>
                                </div>
                                <div v-else class="table-responsive">
                                    <table class="table text-center">
                                        <thead>
                                            <tr>
                                                <th class="text-sm py-3 font-weight-bold text-end"> شناسه </th>
                                                <th class="text-sm py-3 font-weight-bold"> ارز </th>
                                                <th class="text-sm py-3 font-weight-bold"> قیمت ارز مبدا </th>
                                                <th class="text-sm py-3 font-weight-bold"> قیمت ارز مقصد </th>
                                                <th class="text-sm py-3 font-weight-bold"> زمان </th>
                                                <th class="text-sm py-3 font-weight-bold"> سود/زیان </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(trd, index) in data" :key="index">
                                                <td class="text-sm py-3 text-end pe-4"> #{{trd.order_id.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])}} </td>
                                                <td class="text-sm py-3"> 
                                                    <i v-if="trd.user_profit > 0" class="fa fa-arrow-up text-success ms-2"></i>
                                                    <i v-else class="fa fa-arrow-down text-danger ms-2"></i>
                                                    {{ trd.symbol }} 
                                                </td>
                                                <td class="text-sm py-3"> {{ Math.round(trd.beg_price/10).toLocaleString('fa-IR') }} تومان </td>
                                                <td class="text-sm py-3"> {{ trd.des_price.toLocaleString('fa-IR') }}$ </td>
                                                <td class="text-sm py-3" dir="ltr" style="direction: ltr;"> 
                                                    {{ new Date(trd.created_at).toLocaleString('fa-IR').split(",")[0] }}
                                                </td>
                                                <td class="text-sm py-3"> {{ Math.round(trd.user_profit/10).toLocaleString('fa-IR') }} تومان </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="d-flex" v-if="data[0]">
                                        <button class="btn bg-gradient-success btn-sm mx-auto" v-show="showMore" @click="get_trade_history(true)" id="moreBtn">
                                            بیشتر
                                        </button>
                                    </div>
                                    <div v-else style="min-height: 354px;">
                                        <strong class="absolute-center"> موردی جهت نمایش وجود ندارد </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="text-dark font-weight-bold" style="margin-bottom: 45px;"> طرح {{name}} </div>
                                <ConsumptionRoomChart v-if="abrcoin_stock" class="h-100" :abrcoin_stock="abrcoin_stock" :user_stock="user_stock"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</div>


<div class="modal fade" id="investWithdrawModal" tabindex="-1" style="z-index: 10001 !important; color: black;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5"> درخواست برداشت موجودی صندوق </h1>
          <button type="button" class="bg-transparent border-0" id="closeWithdrawModal" data-bs-dismiss="modal"><i class="fa fa-times fs-5"></i></button>
        </div>
        <div class="modal-body">
            <div v-if="step == 1" class="text-center mt-4 mb-3" :class="{'mb-5': withdraw_type == ''}">
                <div class="form-check form-check-inline" style="color: black !important">
                    <input @click="withdraw_type = 'rial', getCards()" class="form-check-input ms-1" type="radio" name="withdrawType" id="rialWithdraw" value="option1" :checked="withdraw_type == 'rial'">
                    <label class="form-check-label" for="rialWithdraw"> برداشت ریالی </label>
                </div>
                <div class="form-check form-check-inline me-4" style="color: black !important">
                    <input @click="withdraw_type = 'crypto', getWallets()" class="form-check-input ms-1" type="radio" name="withdrawType" id="usdtWithdraw" value="option2" :checked="withdraw_type == 'crypto'">
                    <label class="form-check-label" for="usdtWithdraw"> برداشت کریپتو </label>
                </div>
            </div>

            <div class="text-sm pt-0 px-0 px-sm-4 px-md-5 px-lg-0 px-xxl-3" v-if="withdraw_type == 'crypto'">

                <div v-if="walletLoading" style="height: 150px;">
                    <div class="loader mt-5"></div>
                </div>

                <div class="row mt-4 m-0" v-else-if="step == 1">
                    <div class="row m-0 p-0">
                        <p class="text-sm col"> انتخاب کیف پول </p>
                        <span class="col-auto me-auto pointer" title="بازگشت" @click="step = 1"> <i class="fa fa-long-arrow-left"></i> </span>
                    </div>
                    <hr/>
                    <div v-if="!walletData[0]" class="text-center mt-4">
                        <p class="text-sm mb-3"> ابتدا ولتی اضافه کنید: </p>
                        <button @click="router.push('/wallet')" data-bs-dismiss="modal" class="btn btn-primary btn-sm"> 
                            افزودن ولت 
                        </button>
                    </div>
                    <div class="bg-gray-100 py-2 rounded border row m-0" v-for="wallet, index in walletData" :key="index">
                        <div class="col">
                            <p class="font-weight-bold text-sm text-dark"> {{ wallet.name }} </p>
                            <p class="text-xs"> {{ wallet.address }} </p>
                        </div>
                        <button class="btn btn-sm btn-primary px-3 col-auto mt-3" 
                         @click="createWithdraw(wallet)"> انتخاب </button>
                    </div>
                </div>

                <div class="row m-0 pb-4" v-if="step == 2">
                    <p class="text-sm font-weight-bold text-dark text-center mb-4 pb-2"> 
                        برای انجام برداشت کد تایید پیامک  شده را وارد کنید. 
                        <!-- برای انجام برداشت کدهای تایید پیامک و ایمیل شده را وارد کنید.  -->
                        <span class="text-xs text-secondary"> (درصورت عدم دریافت مجدد مراحل را انجام دهید) </span>
                    </p>
                    <div class="col-lg-12 position-relative">
                        <label for="example-text-input" class="form-control-label"> کد تایید پیامک: </label> 
                        <input class="form-control mb-3" v-model="phone_otp" type="text" :disabled="submited_phone" :class="{'submited-inp' :submited_phone}"/>
                        <button class="btn btn-success btn-sm px-2 absolute-btn noDisabled" 
                        @click="confirmWithdraw" :disabled="phone_otp.length != 6 || submited_phone"> 
                            تایید
                            <div v-if="confirmLoading" class="loader"></div>
                        </button>
                    </div>
                </div>

            </div>


            <div class="text-sm pt-0 px-0 px-sm-4 px-md-5 px-lg-0 px-xxl-3" v-else-if="withdraw_type == 'rial'">
                
                <div v-if="cardLoading" style="height: 150px;">
                    <div class="loader mt-5"></div>
                </div>

                <div class="row mt-4 m-0" v-else-if="step == 1">
                    <div class="row m-0 p-0">
                        <p class="text-sm col"> انتخاب شماره کارت / شبا </p>
                        <span class="col-auto me-auto pointer" title="بازگشت" @click="step = 1"> <i class="fa fa-long-arrow-left"></i> </span>
                    </div>
                    <hr/>
                    <div v-if="!cardData[0]" class="text-center mt-4">
                            <p class="text-sm mb-3"> ابتدا اطلاعات بانکی خود را اضافه کنید: </p>
                            <button @click="router.push('/card')" data-bs-dismiss="modal" class="btn btn-primary btn-sm"> 
                                افزودن اطلاعات بانکی 
                            </button>
                    </div>
                    <div class="bg-gray-100 py-2 rounded border row m-0" v-for="card, index in cardData" :key="index">
                        <div class="col">
                            <p class="font-weight-bold text-sm text-dark"> {{ card.number.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]) }} </p>
                            <p class="text-xs" v-if="card.type == 'Card'"> شماره کارت </p>
                            <p class="text-xs" v-else> شماره شبا </p>
                        </div>
                        <button class="btn btn-sm btn-primary px-3 col-auto mt-3" 
                        @click="createWithdraw(card)"> انتخاب </button>
                    </div>
                </div>

                <div class="row m-0 pb-4" v-if="step == 2">
                    <p class="text-sm font-weight-bold text-dark text-center mb-4 pb-2"> 
                        برای انجام برداشت کد تایید پیامک  شده را وارد کنید. 
                        <!-- برای انجام برداشت کدهای تایید پیامک و ایمیل شده را وارد کنید.  -->
                        <span class="text-xs text-secondary"> (درصورت عدم دریافت مجدد مراحل را انجام دهید) </span>
                    </p>
                    <div class="col-lg-12 position-relative">
                        <label for="example-text-input" class="form-control-label"> کد تایید پیامک: </label> 
                        <input class="form-control mb-3" v-model="phone_otp" type="text" :disabled="submited_phone" :class="{'submited-inp' :submited_phone}"/>
                        <button class="btn btn-success btn-sm px-2 absolute-btn noDisabled" 
                        @click="confirmWithdraw" :disabled="phone_otp.length != 6 || submited_phone"> 
                            تایید
                            <div v-if="confirmLoading" class="loader"></div>
                        </button>
                    </div>
                </div>

            </div>


        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-primary mb-0 w-100" data-bs-dismiss="modal" id=""> ثبت درخواست برداشت </button>
        </div> -->
      </div>
    </div>
</div>


<div class="modal fade" id="reinvestModal" tabindex="-1" style="z-index: 10001 !important;">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5"> انتخاب طرح سپرده گذاری </h1>
          <button type="button" class="bg-transparent border-0" data-bs-dismiss="modal"><i class="fa fa-times fs-5"></i></button>
        </div>
        <div class="modal-body px-0">
            
            <div class="row m-0 mx-0 mx-sm-2 mx-xxl-5 px-0 px-sm-2">
                <div v-for="plan, index in invest_plans" :key="index" class="col-12 my-2 px-1">
                    <div class="px-4 px-md-5 px-lg-4 px-ml-5 pt-4 pb-0 border shadow-lg rounded-3">
                        <div class="mb-4 font-weight-bold text-dark"><strong >{{plan.name}}</strong></div>
                        <div class="mb-2 pt-4 text-xs text-dark">میزان کامزد:</div>
                        <div class="progress" style="height: 22px;">
                            <div class="progress-bar bg-info rounded-0 rounded-end" :style="{'width':100-plan.fee-.3+'%'}"></div>
                            <div class="progress-bar bg-light" style="width: .3%"></div>
                            <div class="progress-bar bg-success rounded-0 rounded-start" :style="{'width':plan.fee+'%'}"></div>
                        </div>
                        
                        <div class="table-responsive mt-3 text-sm">
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
                        </div>
                        
                        <button class="btn bg-gradient-success btn-sm w-100 mt-5 mb-4" @click="reinvest(plan.backend_name)"> 
                            انتخاب طرح
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
import { ref, watch } from 'vue'
// import Swal from 'sweetalert2'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Card from "@/examples/Cards/Card.vue";
import ConsumptionRoomChart from "@/examples/Charts/ConsumptionRoomChart.vue";
import Swal from 'sweetalert2'
import { trans_num } from '../main.js'


export default {
    name: "Wallet",
    setup(){
        let route = useRoute()
		let router = useRouter()
        let store = useStore()
        let firstLoading = ref(false)
        let name = ref()
        let today_profit = ref()
        let total_profit = ref()
        let current_balance = ref()
        let tradeLoading = ref(false)
        // eslint-disable-next-line no-unused-vars
        let lastShow = 0
        let showMore = ref(true)
        let isDone = ref(false)
        let hasWithdraw = ref(false)
        let abrcoin_stock = ref()
        let user_stock = ref()
        let invest_id
        let step = ref(1)
        let phone_otp = ref('')
        let submited_phone = ref(false)
        let withdraw_id = ref()
        let confirmLoading = ref(false)
        let withdraw_type = ref('')
        let walletData = ref([])
        let cardData = ref([])
        let cardLoading = ref(true)
        let walletLoading = ref(true)
        let invest_plans = [
            {"name": "طرح سه ماهه", "fee": 30, "backend_name": "۳ ماهه", "min_rial": 50_000_000, "min_rial_text": "۵۰", "min_crypto": "۱۰۰۰"},
            {"name": "طرح شش ماهه", "fee": 20, "backend_name": "۶ ماهه", "min_rial": 50_000_000, "min_rial_text": "۵۰", "min_crypto": "۱۰۰۰"},
            {"name": "طرح سالانه", "fee": 10, "backend_name": "سالانه", "min_rial": 50_000_000, "min_rial_text": "۵۰", "min_crypto": "۱۰۰۰"}
        ]
        
        // let data = ref([{"symbol": "LTC","user_profit": 9943,"abrcoin_profit": 6629,"profit_percent": 0.01,"beg_price": 36700410,"des_price": 71.58,"usdt_price": 516650,"amount": 0.122,"order_id": "1115678520","created_at": "2023-11-05 16:11"},{"symbol": "AVAX","user_profit": 301135,"abrcoin_profit": 200756,"profit_percent": 0.15,"beg_price": 6371220,"des_price": 12.5,"usdt_price": 516910,"amount": 7.723,"order_id": "1115527530","created_at": "2023-11-05 14:00"},{"symbol": "FLOW","user_profit": 92029,"abrcoin_profit": 61353,"profit_percent": 0.05,"beg_price": 293800,"des_price": 0.572,"usdt_price": 516710,"amount": 261.034,"order_id": "1115450069","created_at": "2023-11-05 12:42"},{"symbol": "FTM","user_profit": 362803,"abrcoin_profit": 241869,"profit_percent": 0.18,"beg_price": 133160,"des_price": 0.26100285871357887,"usdt_price": 516270,"amount": 574.804,"order_id": "1115428071","created_at": "2023-11-05 12:20"},{"symbol": "FTM","user_profit": 201744,"abrcoin_profit": 134496,"profit_percent": 0.1,"beg_price": 133020,"des_price": 0.25977513751375136,"usdt_price": 516340,"amount": 574.488,"order_id": "1115426121","created_at": "2023-11-05 12:18"},{"symbol": "Total Small Trade","user_profit": 609,"abrcoin_profit": 406,"profit_percent": 0,"beg_price": 0,"des_price": 0,"usdt_price": 0,"amount": 0,"order_id": "0","created_at": "2023-11-04 23:01"},{"symbol": "XMR","user_profit": -24582,"abrcoin_profit": -16388,"profit_percent": -0.01,"beg_price": 85470010,"des_price": 164.54054054054055,"usdt_price": 517510,"amount": 0.058,"order_id": "1114381597","created_at": "2023-11-04 19:58"},{"symbol": "Total Small Trade","user_profit": -8669,"abrcoin_profit": -5779,"profit_percent": 0,"beg_price": 0,"des_price": 0,"usdt_price": 0,"amount": 0,"order_id": "0","created_at": "2023-11-03 23:07"},{"symbol": "GLM","user_profit": 15985,"abrcoin_profit": 10656,"profit_percent": 0.01,"beg_price": 113930,"des_price": 0.2194,"usdt_price": 524800,"amount": 38.336,"order_id": "1111621173","created_at": "2023-11-03 00:11"},{"symbol": "Total Small Trade","user_profit": 3793,"abrcoin_profit": 2529,"profit_percent": 0,"beg_price": 0,"des_price": 0,"usdt_price": 0,"amount": 0,"order_id": "0","created_at": "2023-11-02 23:06"}])
        let data = ref([])
        function checkRoute(){
            let splitRoute = route.path.split("/")
            if(splitRoute[1] == "investment" && splitRoute[2] != "new"){
            // if(splitRoute[1] == "investment"){
                init()
            }
        }

        watch(route, ()=>{
            checkRoute()
        })
        
        function getStatus(){
            firstLoading.value = true
            axios.get('investment/status')
            .then((res) => {
                if(!res.data.has_invest){
                    router.push("/investment/new")
                }else{
                    store.state.userInvests = res.data.invests
                    let id = route.params.id
                    if(!id){
                        router.push(`/investment/${res.data.invests[0].id}`)
                    }
                }
                firstLoading.value = false
            })
            .catch(() => {
                firstLoading.value = false
            })
        }
        
        function init(){
            let id = route.params.id
            abrcoin_stock.value = null
            if(!id){
                getStatus()
                if(store.state.userInvests[0]){
                    router.push(`/investment/${store.state.userInvests[0].id}`)
                }
                // if(store.state.userInvests[0]){
                //     router.push(`/investment/${store.state.userInvests[0].id}`)
                // }else{
                //     getStatus()
                // }
            }else{
                if(!store.state.userInvests[0]){
                    getStatus()
                }
                get_invest_detail()
                get_trade_history()
            }
        }

        init()

        function get_invest_detail(){
            let id = route.params.id
            firstLoading.value = true
            axios.get(`investment/${id}`)
            .then((res) => {
                today_profit.value = res.data.today_profit
                total_profit.value = res.data.total_profit
                current_balance.value = res.data.current_balance
                user_stock.value = res.data.user_stock
                abrcoin_stock.value = res.data.abrcoin_stock
                hasWithdraw.value = res.data.has_withdraw_request
                name.value = res.data.plan
                invest_id = res.data.id
                firstLoading.value = false
                set_progress_circle(res.data.remain_day, res.data.plan_duration)
                isDone.value = res.data.remain_day <= 0
            })
            .catch(() => {
                firstLoading.value = false
            })
        }

        function set_progress_circle(remain_day, plan_duration){
            document.querySelector(".cprogress-bar").setAttribute("data-before", String(remain_day).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]) + " روز")
            document.documentElement.style.setProperty('--remain_percent', `${remain_day/plan_duration*100}%`);
        }

        
        function get_trade_history(more=false){
            let id = route.params.id
            tradeLoading.value = true
            let btn, btnInner
            if(more){
                btn = document.getElementById("moreBtn")
                // eslint-disable-next-line no-unused-vars
                btnInner = btn.innerHTML
                btn.disabled = true
                btn.innerHTML += '<div class="loader"></div>'
                lastShow += 10
            }

            axios.get(`investment/${id}/${lastShow}`).then((res) => {
                tradeLoading.value = false
                if(more){
                    data.value.push(...res.data.data)
                    // eslint-disable-next-line no-undef
                    btn.disabled = false
                    // eslint-disable-next-line no-undef
                    btn.innerHTML = btnInner
                }else{
                    data.value = res.data.data
                }
                if(res.data.data.length < 10){
                    showMore.value = false
                }
            })
            .catch((res) => {
                console.log(res);
                tradeLoading.value = false
            })

        }

        function createWithdraw(card_or_wallet){
            firstLoading.value = true

            axios.post("/investment/createWithdraw", {
                invest_id: invest_id,
                wallet_id: card_or_wallet.id,
                card_id: card_or_wallet.id,
                type: withdraw_type.value
            }).then((res)=>{
                console.log(res.data);
                withdraw_id.value = res.data.withdraw_id
                firstLoading.value = false
                step.value = 2
            }).catch(()=>{
                firstLoading.value = false
            })
        }

        function getWallets(){
            if(walletLoading.value == false){
                step.value = 1
                return
            }
            axios.get('wallet/list')
            .then((res) => {
                walletLoading.value = false
                walletData.value = res.data.data
                step.value = 1
            })
            .catch(() => {
                walletLoading.value = false
            })
        }

        function getCards(){
            if(cardLoading.value == false){
                step.value = 1
                return
            }

            axios.get('card/list').then((res) => {
                cardLoading.value = false
                cardData.value = res.data.data
                step.value = 1
            })
            .catch(() => {
                cardLoading.value = false
            })
        }

        function confirmWithdraw(){
			confirmLoading.value = true
			axios.post("investment/confirmWithdraw", {
                withdraw_id: withdraw_id.value,
                phone_otp: phone_otp.value
            }).then((res)=>{
                confirmLoading.value = false
                submited_phone.value = true
            if (res.status == 201){
                document.getElementById("closeWithdrawModal").click()
                firstLoading.value = true
                init()
                step.value = 1
            }
            }).catch(()=>{
                confirmLoading.value = false
            })
        }


        function reinvest(plan){
            console.log(plan);

            Swal.fire({
            title: 'درخواست سرمایه گذاری مجدد را تایید میکنید؟ ',
            text: `سرمایه گذاری مجدد مبلغ ${(Number(trans_num(Math.round(current_balance.value/10)))).toLocaleString('fa-IR')} تومان در طرح ${plan}`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'بلی',
            denyButtonText: `خیر`,
            }).then((result) => {
                if (result.isConfirmed) {
                    firstLoading.value = true
                    axios.post("investment/reinvest", {
                        invest_id: invest_id,
                        plan: plan
                    }).then(()=>{
                        Swal.fire(`صندوق سرمایه ${plan} شما با موفقیت ایجاد شد و پس از تایید ادمین سوددهی آن شروع میشود`).then(()=>{
                            // window.location.replace("http://192.168.1.104:8080/investment")
                            window.location.replace("https://dash.abrcoin.com/investment")
                        })
                    }).catch(()=>{
                        firstLoading.value = false
                    })
                }
            })
        }
    
        
        return { firstLoading , name, data, today_profit, total_profit, isDone, hasWithdraw, createWithdraw,
            current_balance, showMore, store, tradeLoading, get_trade_history, abrcoin_stock, user_stock,
            step, phone_otp, submited_phone, withdraw_id, confirmLoading, withdraw_type, getWallets, getCards,
            cardData, walletData, router, cardLoading, walletLoading, confirmWithdraw, reinvest, invest_plans }
        },
        components: {Card ,ConsumptionRoomChart}
    };
</script>

<style>
.cprogress-bar {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 67px;
  height: 67px;
  border-radius: 50%; 
}

.cprogress-bar-light{
    background: 
        radial-gradient(closest-side, white 79%, transparent 80% 100%),
        conic-gradient(rgb(45, 206, 137) var(--remain_percent), rgba(45, 206, 137, 0.3) 0);   
}

.cprogress-bar-dark{
    background: 
        radial-gradient(closest-side, #111C44 79%, transparent 80% 100%),
        conic-gradient(rgb(45, 206, 137) var(--remain_percent), rgba(45, 206, 137, 0.3) 0);   
}

.cprogress-bar::before {
  content: attr(data-before);
  font-size: 14px;
}
</style>
