<template>
    
    <HomeNav/>
    
    <iframe scrolling="no" allowtransparency="true" 
    style="user-select: none;
          box-sizing: border-box;
          display: block;
          height: 46px;
          width: 100%;
          position: absolute;
          top: 100px;
          z-index: 1000 !important;"
    src="https://s.tradingview.com/embed-widget/ticker-tape/?locale=en#{%22symbols%22:[{%22description%22:%22%22,%22proName%22:%22BINANCE:BTCUSDT%22},{%22description%22:%22%22,%22proName%22:%22BINANCE:ETHUSDT%22},{%22description%22:%22%22,%22proName%22:%22COINBASE:USDTUSD%22},{%22description%22:%22%22,%22proName%22:%22BINANCE:BNBUSDT%22},{%22description%22:%22%22,%22proName%22:%22BINANCE:XRPUSDT%22},{%22description%22:%22%22,%22proName%22:%22BINANCE:DOGEUSDT%22},{%22description%22:%22%22,%22proName%22:%22BINANCE:ADAUSDT%22},{%22description%22:%22%22,%22proName%22:%22BINANCE:SOLUSDT%22},{%22description%22:%22%22,%22proName%22:%22BINANCE:TRXUSDT%22},{%22description%22:%22%22,%22proName%22:%22BINANCE:LTCUSDT%22}],%22showSymbolLogo%22:true,%22colorTheme%22:%22light%22,%22isTransparent%22:false,%22displayMode%22:%22adaptive%22,%22width%22:%22100%25%22,%22height%22:40}" frameborder="0"></iframe>
  
    <div class="main-banner wow fadeIn gradient-green" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
      <div class="container px-0">
  
        <div class="row">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-6 pe-4 px-sm-0 align-self-center">
                <div class="left-content show-up header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                  <div class="row">
                    <div class="col-lg-12 pe-0 pe-sm-5">
                      <h2 class="text-light me-0 me-sm-5" style="font-weight: 900; font-size: 60px;"> ابرکوین؛ </h2>
                      <!-- <p class="text-gold me-3" style="font-weight: 900; text-shadow: 0px 0px 2px black;"> ربات آربیتراژ و صندوق سپرده ارز دیجیتال </p> -->
                      <p class="me-0 me-sm-5 text-light" style="font-weight: 900; font-size: 20px;"> ربات آربیتراژ و صندوق سپرده ارز دیجیتال </p>
                    </div>
                    <div class="col-lg-12 pe-0 pe-sm-5 me-sm-5" v-if="!store.state.isAuthenticated">
                      <div class="white-button first-button scroll-to-section ms-2 me-0">
                        <router-link to="/signin"> ورود </router-link>
                      </div>
                      <div class="white-button scroll-to-section me-0">
                        <router-link to="/signup"> ثبت نام <i class="fa fa-sign-in-alt"></i></router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 ps-0 pe-5">
                <div class="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                  <img src="../assets/images/main-header.png" alt="">
                  <!-- <img src="../assets/images/slider-dec.png" alt=""> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div id="services" class="services section">
      <div class="container" style="margin-bottom: 80px;">
        <div class="row">
          <div class="col p-2 p-md-5 text-start row m-0" style="padding-top: 110px !important;">
            <span class="col"></span>
            <span class="col-12 col-sm-8 col-md-7 col-lg-12 col-xl-9 mb-5 mb-lg-0">
              <img src="../assets/images/logo-2.png" class="w-100">
            </span>
            <span class="col d-block d-lg-none"></span>
          </div>
          <div class="col-lg-7">
            <div class="section-heading  wow fadeInDown position-relative" data-wow-duration="1s" data-wow-delay="0.5s">
              <span id="about-us" style="position: absolute; top: -200px;"></span>
              <h4>معرفی ابرکوین</h4>
              <div class="text-end" style="padding-right: 54px;">
                <img src="../assets/images/heading-line-dec.png">
              </div>
              <p class="ms-0 me-4 text-dark" style="text-align: justify;"> صرافی ابرکوین، از نخستین پلتفرم‌های ‌ارز دیجیتال ایرانی است که با ارائه خدمات متنوع و پشتیبانی ۲۴ ساعته، بروکری شفاف و امن برای مبادلات ارزهای دیجیتال و کسب سود از این بازار جهانی است. </p>
              <p class="ms-0 me-4 text-dark" style="text-align: justify;"> ابرکوین با استفاده از کارشناسان و متخصصان حوزه‌ی کریپتوکارنسی، به یکی از پیشگامان و اثرگذاران بر بازار ارزهای دیجیتال تبدیل شده و ربات آربیتراژ آن، روشی مطمئن برای کسب درآمد آسان از ارزهای دیجیتال است. </p>
              <p class="ms-0 me-4 text-dark" style="text-align: justify;"> بروکر ابرکوین به‌عنوان یکی از نخستین استارت‌آپ‌ها در حوزه آربیتراژ می‌باشد و کاربران می‌توانند کسب درآمد مطمئن و شفاف در حوزه ارزهای دیجیتال را با آن تجربه کنند </p>
            </div>
          </div>
        </div>
      </div>
      <div class="position-relative">
        <div class="gradient-green position-absolute w-100 bottom-0" style="height: 105px;">

        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-3 mb-3 mb-lg-0">
              <div class="service-item first-service h-100">
                <div class="icon"></div>
                <h6> امنیت بالا </h6>
                <p> در صرافی ابرکوین، تامین امنیت تک‌تک حساب‌های کاربران به عهده ماست. </p>
              </div>
            </div>
            <div class="col-lg-3 mb-3 mb-lg-0">
              <div class="service-item second-service h-100">
                <div class="icon"></div>
                <h6> گزارش‌دهی دقیق </h6>
                <p> ما  به شما گزارشی دقیق و  کامل  از نوع معاملات، واریزی‌ها، برداشت‌ها  و درآمدها ارایه می‌دهیم. </p>
              </div>
            </div>
            <div class="col-lg-3 mb-3 mb-lg-0">
              <div class="service-item third-service h-100">
                <div class="icon"></div>
                <h6> واریز و برداشت ریالی و دلاری </h6>
                <p> در ابرکوین، امکان واریز و برداشت آنی ریال و دلار (تتر) به آسان‌ترین شکل ممکن وجود دارد. </p>
              </div>
            </div>
            <div class="col-lg-3 mb-3 mb-lg-0">
              <div class="service-item fourth-service h-100">
                <div class="icon"></div>
                <h6>پشتیبانی ۲۴ ساعت </h6>
                <p> ما به صورت ۲۴ ساعته، و در تمام روزهای هفته، پاسخگوی شما عزیزان هستیم. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div id="about" class="about-us section gradient-green">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 align-self-center">
            <div class="section-heading">
              <h4 class="text-light"> مراحل کار  ربات ابرکوین </h4>
              <img src="../assets/images/heading-line-dec.png" alt="">
              <p class="text-light" style="font-weight: 500;"> افتخار ما این است که تمامی معاملات را در بستر شفاف برای کاربران خود به نمایش بگذارد و با موفقیت صددرصدی و تضمین‌شده، سود مناسب روزانه را به کاربران تقدیم کند. </p>
            </div>
            <div class="row">
              <div class="col-md-6 col-lg-12 col-xl-6 px-0 px-md-1">
                <div class="box-item px-4 mb-3">
                  <h4><a href="#"> مرحله اول </a></h4>
                  <p> بررسی و دریافت نرخ ارزهای دیجیتال </p>
                </div>
              </div>
              <div class="col-md-6 col-lg-12 col-xl-6 px-0 px-md-1">
                <div class="box-item px-4 mb-3">
                  <h4><a href="#"> مرحله دوم </a></h4>
                  <p> کمترین و بیشترین نرخ‌های موجود </p>
                </div>
              </div>
              <div class="col-md-6 col-lg-12 col-xl-6 px-0 px-md-1">
                <div class="box-item px-4 mb-3">
                  <h4><a href="#"> مرحله سوم </a></h4>
                  <p> خرید ارز دیجیتال با قیمت پایین </p>
                </div>
              </div>
              <div class="col-md-6 col-lg-12 col-xl-6 px-0 px-md-1">
                <div class="box-item px-4 mb-3">
                  <h4><a href="#"> مرحله چهارم </a></h4>
                  <p> فروش ارز دیجیتال با بالاترین نرخ </p>
                </div>
              </div>
              <div class="px-0">
                <div class="box-item px-4 mb-3">
                  <h4><a href="#"> مرحله پنجم </a></h4>
                  <p> واریز سود حاصله از اختلاف قیمت به حساب کاربر </p>
                </div>
              </div>
              <div class="col-lg-12">
                <p class="text-light" style="font-weight: 500;"> اصلی‌ترین امتیاز ابرکوین این است که اگر فرصت و یا حتی دانش فنی لازم برای  انجام معاملات ارز دیجیتال و حوزه بلاکچین را ندارید، ربات آربیتراژ‌‌ ابرکوین با بهترین استراتژی بصورت خودکار و اتوماتیک برای شما معامله می‌کند و بدون حتی یک‌درصد ریسک، شما را به سود ثابت و مناسب می‌رساند. </p>
              </div>
            </div>
          </div>
          <div class="col-lg-6 position-relative">
            <div class="right-image position-absolute" style="top: 50%; transform: translateY(-50%);">
              <img src="../assets/images/022.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  
</template>

<script>
const body = document.getElementsByTagName("body")[0]
import { activateDarkMode, deactivateDarkMode } from "@/assets/js/dark-mode";
import HomeNav from '@/views/components/HomeNav.vue'
import Footer from '@/views/components/Footer.vue'
import { useStore } from 'vuex'

export default {
  name: "Home",
  setup(){
    let store = useStore()


    return { store }
  },
  created() {
      this.$store.state.showNavbar = false;
      this.$store.state.showSidenav = false;
      if (this.$store.state.darkMode){
        deactivateDarkMode()
      }
      body.classList.remove("bg-gray-100");
    },
    beforeUnmount() {
      this.$store.state.showNavbar = true;
      this.$store.state.showSidenav = true;
      if (this.$store.state.darkMode){
        activateDarkMode()
      }
      body.classList.add("bg-gray-100");
    },
    components: { HomeNav, Footer },
};
</script>

<style scoped>
@import url(../assets/css/home.css);
@import url(../assets/css/homeAnimated.css);
@import url(../assets/css/homeCarousel.css);


@font-face {
  font-family: Vazirmatn;
  src: url('../assets/vazir/Vazirmatn-Thin.woff2') format('woff2');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Vazirmatn;
  src: url('../assets/vazir/Vazirmatn-ExtraLight.woff2') format('woff2');
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Vazirmatn;
  src: url('../assets/vazir/Vazirmatn-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Vazirmatn;
  src: url('../assets/vazir/Vazirmatn-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Vazirmatn;
  src: url('../assets/vazir/Vazirmatn-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Vazirmatn;
  src: url('../assets/vazir/Vazirmatn-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Vazirmatn;
  src: url('../assets/vazir/Vazirmatn-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Vazirmatn;
  src: url('../assets/vazir/Vazirmatn-ExtraBold.woff2') format('woff2');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Vazirmatn;
  src: url('../assets/vazir/Vazirmatn-Black.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}


*{
  direction: rtl;
  font-family: Vazirmatn;
}

.gradient-green{
  background: linear-gradient(270deg, #3D9393, #31BAA6);
}

.gradient-button a{
  background: rgb(240,240,240);
  color: rgb(85, 85, 85) !important;
}

.main-banner:after{
  background-image: none;
}

.text-gold{
  color: #f8b550 !important;
}
.services::before {
  background-image: none;
}

.service-item{
  border-radius: 15px !important;
  text-align: center;
  padding: 30px 20px 50px 20px;
}

.service-item h6{
  font-weight: 900;
}

.service-item .icon{
  padding-bottom: 60px;
}

.service-item p{
  padding-top: 5px;
  color: rgb(100, 100, 100);
}

.about-us::after {
  background-image: none;
}

.about-us{
  padding-bottom: 100px;
}

footer{
  margin-top: 30px;
}


</style>
