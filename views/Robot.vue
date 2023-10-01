<template>
  <div v-if="firstLoading" class="fullscreen">
    <div class="loader"></div>
  </div>
  <div class="py-4 container-fluid p-0 px-sm-3">
    <div class="row m-0">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <h6> وضعیت ربات </h6>
          </div>
          <div class="card-body">
            <div class="row m-0" v-if="data.active_days !== undefined">
              <div class="col-6 col-md-4">
                <div class="text-secondary text-sm mb-4">
                  مدت فعال بودن ربات:
                  <span class="pe-2 text-dark font-weight-bold"> {{data.active_days.toLocaleString('fa-IR')}} روز </span>
                </div>
                <div class="text-secondary text-sm mb-4">
                  درصد سود کلی:
                  <span class="pe-2 text-dark font-weight-bold"> {{data.total_profit_percent.toLocaleString('fa-IR')}}% </span>
                </div>
                <div class="text-secondary text-sm mb-3">
                  سود کلی:
                  <span class="pe-2 text-dark font-weight-bold"> {{Math.round(data.total_profit/10).toLocaleString('fa-IR')}} تومان </span>
                </div>
              </div>
              <div class="col-6 col-md-4 border-end">
                <div class="text-secondary text-sm mb-4">
                  تعداد معاملات امروز:
                  <span class="pe-2 text-dark font-weight-bold"> {{data.today_trades.toLocaleString('fa-IR')}} </span>
                </div>
                <div class="text-secondary text-sm mb-4">
                  درصد سود امروز:
                  <span class="pe-2 text-dark font-weight-bold"> {{data.today_profit_percent.toLocaleString('fa-IR')}}% </span>
                </div>
                <div class="text-secondary text-sm mb-3">
                  سود امروز:
                  <span class="pe-2 text-dark font-weight-bold"> {{Math.round(data.today_profit/10).toLocaleString('fa-IR')}} تومان </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0 mt-4">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-4">
            <h6> لیست سودهای روزانه </h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2" :class="{'pb-10' : data.active_days == 0}">
            <div v-if="data.active_days == 0" class="text-center position-absolute" style="transform: translateX(-50%); bottom: 70px; left: 50%;">
              <strong> سابقه ای برای شما وجود ندارد </strong>
            </div>
            <div class="table-responsive p-0">
              <table class="table text-center mb-0">
                <thead class="text-dark">
                  <tr>
                    <th class="text-xs font-weight-bolder"> شناسه </th>
                    <th class="text-xs font-weight-bolder ps-2"> مقدار کل </th>
                    <th class="text-xs font-weight-bolder ps-2"> سهم شما </th>
                    <th class="text-xs font-weight-bolder ps-2"> سهم سایت </th>
                    <th class="text-xs font-weight-bolder ps-2"> درصد سود </th>
                    <th class="text-xs font-weight-bolder ps-2"> موجودی جدید </th>
                    <th class="text-xs font-weight-bolder ps-2"> زمان </th>
                    <th class="text-xs font-weight-bolder ps-2"> وضعیت </th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <tr v-for="row, index in table" :key="index">
                    <td class="py-3">
                      {{row.id.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])}}
                    </td>
                    <td class="py-3">
                      {{Math.round(row.total_profit/10).toLocaleString('fa-IR')}} تومان
                    </td>
                    <td class="py-3">
                      {{Math.round(row.user_profit/10).toLocaleString('fa-IR')}} تومان
                    </td>
                    <td class="py-3">
                      {{Math.round(row.abrcoin_profit/10).toLocaleString('fa-IR')}} تومان
                    </td>
                    <td class="py-3">
                      {{row.profit_percent.toLocaleString('fa-IR')}}%
                    </td>
                    <td class="py-3">
                      <span v-if="!row.new_balance"> بدون تغییر </span>
                      <span v-else>{{Math.round(row.new_balance/10).toLocaleString('fa-IR')}} تومان</span>
                    </td>
                    <td class="py-3">
                      {{new Date(row.date).toLocaleString('fa-IR').split(", ")[0]}}
                    </td>
                    <td class="py-3">
                      <span v-if="row.is_success">موفق</span>
                      <span v-else>ناموفق</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios';

export default {
  name: "robot",
  setup() {
    let firstLoading = ref(true)
    let data = ref({})
    let table = ref([])

    function getData(){
      axios.get('/trade/bot')
      .then((res) => {
        console.log(res.data.data);
        data.value = res.data.data
        table.value = res.data.table
        firstLoading.value = false
      })
      .catch(() => {
        firstLoading.value = false
      })
    }
    getData()

    return {firstLoading, data, table}
  },
};
</script>
