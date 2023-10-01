<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6> نمودار سوددهی </h6>
      <p class="text-sm">
        <i v-if="detail1 > 0" class="fa fa-arrow-up text-success"></i>
        <i v-else class="fa fa-arrow-down text-danger"></i>
        <span class="font-weight-bold">{{detail1.toLocaleString('fa-IR')}}%</span>
      </p>
    </div>
    <div class="p-1 p-md-3 card-body">
      <div class="chart">
        <canvas id="chart-line" class="chart-canvas" height="300" style="max-height: 300px !important;"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "gradient-line-chart",

  props: {
    detail1: {
      type: String,
    },
    data: {
      type: Object
    }
  },

  mounted() {

    var ctx1 = document.getElementById("chart-line").getContext("2d");
    
    var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

    let persianLabels = []

    for (const label in this.data.lables) {
      persianLabels.push(label.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]))
    }

    gradientStroke1.addColorStop(1, "rgba(94, 114, 228, 0.2)");
    gradientStroke1.addColorStop(0.2, "rgba(94, 114, 228, 0.0)");
    gradientStroke1.addColorStop(0, "rgba(94, 114, 228, 0)");

    new Chart(ctx1, {
      type: "line",
      data: {
        labels: persianLabels,
        datasets: [
          {
            label: "سود به تومان",
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#4BB543 ",
            backgroundColor: gradientStroke1,
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            fill: true,
            data: this.data.data,
            maxBarThickness: 6,
          },
        ],
      },
      options: {
        locale: "fa-IR",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleFont: {
                size: 11,
                family: "iran",
                style: "normal",
                lineHeight: 2,
              },
              bodyFont: {
                size: 11,
                family: "iran",
                style: "normal",
                lineHeight: 2,
              },
          }
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          y: {
            // title: {
            //   display: true,
            //   text: "تست"
            // },
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              padding: 10,
              color: "rgb(127, 127, 127)",
              font: {
                size: 11,
                family: "iran",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
          x: {
            title: {
              display: true,
              text: "تعداد ترید",
              color: "rgb(127, 127, 127)",
              padding: 0,
              font: {
                size: 10,
                family: "iran",
                style: "normal",
                lineHeight: 2,
              },
            },
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              color: "#ccc",
              padding: 10,
              font: {
                size: 11,
                family: "iran",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
        },
      },
    });
  },
};
</script>
