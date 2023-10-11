<template>
  <div v-if="firstLoading" class="fullscreen">
    <div class="loader"></div>
  </div>
  <div class="container-fluid py-4 p-0 px-sm-3">
    <div class="row m-0">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-12">
            <card
              title="سود امروز"
              :value="today_profit != null ? Math.round(today_profit/10).toLocaleString('fa-IR') : '-'"
              percentage="تومان"
              percentageColor=""
              iconClass="ni ni-money-coins"
              iconBackground="bg-gradient-primary"
              detail=""
              directionReverse
            ></card>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <card
              title="سود ۳۰ روز گذشته"
              :value="past_30_profit != null ? Math.round(past_30_profit/10).toLocaleString('fa-IR') : '-'"
              percentage="تومان"
              percentageColor=""
              iconClass="ni ni-world"
              iconBackground="bg-gradient-danger"
              detail=""
              directionReverse
            ></card>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <card
              title="موجودی فعلی"
              :value="this.$store.state.profile.balance != null ? Math.round(this.$store.state.profile.balance/10).toLocaleString('fa-IR') : '-'"
              percentage="تومان"
              iconClass="ni ni-paper-diploma"
              iconBackground="bg-gradient-success"
              percentageColor=""
              detail=""
              directionReverse
            ></card>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2" v-if="!firstLoading">
              <gradient-line-chart :data="chartData" :detail1="totalProfit" style="height: 427px !important;"/>
            </div>
          </div>
          <div class="col-lg-4">
            <ConsumptionRoomChart/>
          </div>
        </div>
        <div class="row mt-4">
          <div class="mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2"> آخرین معاملات </h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table text-center">
                  <thead>
                    <tr>
                      <th class="text-sm py-3 font-weight-bold text-end"> شناسه </th>
                      <th class="text-sm py-3 font-weight-bold"> ارز </th>
                      <th class="text-sm py-3 font-weight-bold"> سهم شما </th>
                      <th class="text-sm py-3 font-weight-bold"> سهم ابرکوین </th>
                      <th class="text-sm py-3 font-weight-bold"> قیمت ارز مبدا </th>
                      <th class="text-sm py-3 font-weight-bold"> قیمت ارز مقصد </th>
                      <th class="text-sm py-3 font-weight-bold"> نرخ تتر </th>
                      <th class="text-sm py-3 font-weight-bold"> زمان </th>
                      <th class="text-sm py-3 font-weight-bold"> درصد سود/ضرر </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(trd, index) in data" :key="index">
                      <td class="text-sm py-3 text-end pe-4"> #{{trd.order_id.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])}} </td>
                      <td class="text-sm py-3"> 
                        <i v-if="trd.profit_percent > 0" class="fa fa-arrow-up text-success ms-2"></i>
                        <i v-else class="fa fa-arrow-down text-danger ms-2"></i>
                        {{ trd.symbol }} 
                      </td>
                      <td class="text-sm py-3"> {{ Math.round(trd.user_profit/10).toLocaleString('fa-IR') }} تومان </td>
                      <td class="text-sm py-3"> {{ Math.round(trd.abrcoin_profit/10).toLocaleString('fa-IR') }} تومان </td>
                      <td class="text-sm py-3"> {{ Math.round(trd.beg_price/10).toLocaleString('fa-IR') }} تومان </td>
                      <td class="text-sm py-3"> {{ trd.des_price.toLocaleString('fa-IR') }}$ </td>
                      <td class="text-sm py-3"> {{ Math.round(trd.usdt_price/10).toLocaleString('fa-IR') }} تومان </td>
                      <td class="text-sm py-3" dir="ltr" style="direction: ltr; text-align: end;"> 
                        {{ new Date(trd.created_at).toLocaleString('fa-IR').slice(0, -3) }} 
                      </td>
                      <td class="text-sm py-3"> {{ trd.profit_percent.toLocaleString('fa-IR') }}% </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex">
                <button class="btn bg-gradient-success btn-sm mx-auto" v-show="showMore" @click="getData(true)" id="moreBtn">
                  بیشتر
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
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import ConsumptionRoomChart from "@/examples/Charts/ConsumptionRoomChart.vue";

import { ref } from 'vue'
import axios from 'axios';

export default {
  name: "dashboard",
  setup() {
    let firstLoading = ref(true)
    let data = ref([])
    let chartData = ref([])
    let today_profit = ref()
    let past_30_profit = ref()
    let lastShow = 0
    let showMore = ref(true)
    let totalProfit = ref()

    function getChartData(){
      axios.get('/trade/chart')
      .then((res) => {
        chartData.value = res.data.chart
        today_profit.value = res.data.today_profit
        past_30_profit.value = res.data.past_30_profit
        console.log(res.data.total_profit);
        totalProfit.value = res.data.total_profit
        firstLoading.value = false
      })
      .catch(() => {
        firstLoading.value = false
      })
    }

    getChartData()

    function getData(more=false){
      let btn, btnInner

      if(more){
        btn = document.getElementById("moreBtn")
        // eslint-disable-next-line no-unused-vars
        btnInner = btn.innerHTML
        btn.disabled = true
        btn.innerHTML += '<div class="loader"></div>'
        lastShow += 10
      }
      axios.get(`/trade/history/${lastShow}`)
      .then((res) => {
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
    }

    getData()

    return { firstLoading, data, chartData, today_profit, past_30_profit, showMore, getData, totalProfit }
    
  },
  components: {
    Card,
    GradientLineChart,
    ConsumptionRoomChart
  },
};
</script>
