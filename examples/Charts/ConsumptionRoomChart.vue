<template>
  <div class="row m-0">
    <strong class="text-dark font-weight-bold">{{this.plan_name}}</strong>
    <div class="text-center">
      <div class="chart">
        <canvas :id="'chart-consumption'+this.id" class="chart-canvas" height="215"></canvas>
      </div>
      <h4 class="font-weight-bold mt-n8 text-center">
        <span class="text-center">۱۰۰%</span>
        <span class="text-sm d-block text-body text-center"> سهم از  </span>
      </h4>
    </div>
    <div style="margin-top: 95px; margin-bottom: 27px;">
      <div class="table-responsive">
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
                <span class="text-xs font-weight-bold">{{Number(this.user_stock).toLocaleString('fa-IR')}}%</span>
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
                <span class="text-xs font-weight-bold">{{Number(this.abrcoin_stock).toLocaleString('fa-IR')}}%</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "consumption-by-room-chart",
  props: ["abrcoin_stock", "user_stock", "plan_name", "id", "noBg"],
  mounted() {
    var ctx1 = document.getElementById(`chart-consumption${this.id}`).getContext("2d");

    new Chart(ctx1, {
      type: "doughnut",
      data: {
        labels: ["سهم شما", "پورسانت سایت"],
        datasets: [
          {
            label: "Consumption",
            weight: 9,
            cutout: 90,
            tension: 0.9,
            pointRadius: 2,
            borderWidth: 2,
            backgroundColor: [
              "#11cdef",
              "#2dce89",
            ],
            data: [this.user_stock, this.abrcoin_stock],
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    });
  },
};
</script>
