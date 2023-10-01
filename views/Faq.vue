<template>

      <HomeNav/>

      <div class="container pb-5" style="padding-top: 135px;">

        <h5> سوالات متداول </h5>
        <hr><br>
        <p class="font-weight-bold text-dark">در این بخش، به سوالات متداول در مورد خدمات ابرکوین پاسخ داده می‌شود.  اگر پرسشی دارید که در این بخش به آن پاسخ داده نشده، لطفاً با پشتیبانی ابرکوین تماس بگیرید تا کارشناسان ما پاسخگوی شما باشند. </p>
        
        <button class="btn btn-green py-3 text-end w-100 my-2 mt-5" type="button" @click="toggleCollapse('collapse1')"> <i class="fa fa-angle-down ms-3"></i> ابرکوین چه ویژگی‌ها و امتیازاتی دارد؟  </button>
        <div class="collapse" id="collapse1">
            <div class="card card-body">
              <br>ما به صورت ۲۴ ساعته، و در تمام روزهای هفته پاسخگوی کاربران هستیم؛ 
              <br>به کاربران خود، گزارش دقیق و  کامل  از نوع معاملات، واریزی‌ها، برداشت‌ها  و درآمدها ارایه می‌دهیم؛ 
              <br>برای کاربران امکان واریز و برداشت تتر و ریال حداکثر تا ۲۴ ساعت را فراهم کرده‌ایم؛
              <br>امنیت اطلاعات شخصی و حساب‌های کاربران را تضمین می‌کنیم؛ 
              <br>کاملاً متعهد به حفظ اصل سرمایه و سود معاملات کاربران هستیم.
            </div>
        </div>
        
        <button class="btn btn-green py-3 text-end w-100 my-2" type="button" @click="toggleCollapse('collapse2')">
          <i class="fa fa-angle-down ms-3"></i> 
          ربات آربیتراژ ابرکوین برای چه کسانی مناسب است؟ 
        </button>
        <div class="collapse" id="collapse2">
            <div class="card card-body">
              ربات آربیتراژ ابرکوین برای تمام کسانی که واقع‌بین هستند و ذهن خود را از سودهای رویایی و اعداد خیالی، خالی کرده‌اند، مناسب است. ابرکوین بهترین پیشنهاد برای تمام کسانی است که  با ریسک‌ها و نوسانات بازار ارزدیجیتال آشنا هستند و حفظ اصل سرمایه و دستیابی به سود منطقی و پایدار را در دستور کار خود (برای رسیدن به یک زندگی مالی مناسب) قرار داده باشند.
            </div>
        </div>
        
        <button class="btn btn-green py-3 text-end w-100 my-2" type="button" @click="toggleCollapse('collapse3')">
          <i class="fa fa-angle-down ms-3"></i>
          چه میزان از سود به دست آمده در معاملات آربیتراژ به کاربر پرداخت می‌شود؟
        </button>
        <div class="collapse" id="collapse3">
            <div class="card card-body">
              80 درصد از سودهای به‌دست آمده متعلق به کاربر و 20 درصد از آن متعلق به ابرکوین است؛ سود کاربران بلافاصله به کیف پول آنها واریز می‌گردد.
            </div>
        </div>
        
        <button class="btn btn-green py-3 text-end w-100 my-2" type="button" @click="toggleCollapse('collapse4')">
          <i class="fa fa-angle-down ms-3"></i>
          آیا برای انجام معاملات ارزدیجیتال در صرافی ابرکوین نیاز به آموزش خاصی است؟
        </button>
        <div class="collapse" id="collapse4">
            <div class="card card-body">
              خیر. برای انجام معاملات ارزدیجیتال در صرافی ابرکوین نیاز به آموزش خاصی نیست؛ چون ربات معامله‌گر ابرکوین برای شما معامله انجام می‌دهد و سود حاصل از معاملات به حساب کاربری شما واریز می‌شود. 
            </div>
        </div>
        
        <button class="btn btn-green py-3 text-end w-100 my-2" type="button" @click="toggleCollapse('collapse5')">
          <i class="fa fa-angle-down ms-3"></i>
          معاملات آربیتراژ، از چه زمانی برای کاربر آغاز می‌شود؟
        </button>
        <div class="collapse" id="collapse5">
            <div class="card card-body">
              به محض ساخت اکانت کاربری و واریز سرمایه اولیه، ربات آربیتراژ‌‌ ابرکوین برای شما معامله انجام می‌دهد و سود آن نیز همراه با گزارش دقیق و شفاف معاملات، به حساب شما واریز می‌شود.
            </div>
        </div>
        
        <button class="btn btn-green py-3 text-end w-100 my-2" type="button" @click="toggleCollapse('collapse6')">
          <i class="fa fa-angle-down ms-3"></i>
          حداقل سرمایه‌ی موردنیاز برای استفاده از ربات آربیتراژ ابرکوین به چه میزان است؟
        </button>
        <div class="collapse" id="collapse6">
            <div class="card card-body">
              برای فعال کردن ربات معامله‌گر و استفاده از خدمات آن، باید حداقل 100 تتر به اکانت خود واریز کنید. 
            </div>
        </div>
        
        <button class="btn btn-green py-3 text-end w-100 my-2" type="button" @click="toggleCollapse('collapse7')">
          <i class="fa fa-angle-down ms-3"></i>
          نحوه واریز و برداشت در ابرکوین چگونه است؟
        </button>
        <div class="collapse" id="collapse7">
            <div class="card card-body">
              بعد از ثبت‌نام در پنل کاربری، احراز هویت و همچنین ثبت کارت بانکی، می‌توانید به صورت (ریالی) و یا (تتری) اقدام به واریز و یا برداشت نمایید.  
            </div>
        </div>
        
        <button class="btn btn-green py-3 text-end w-100 my-2" type="button" @click="toggleCollapse('collapse8')">
          <i class="fa fa-angle-down ms-3"></i>
          درآمد کسب‌شده توسط ربات معامله‌گر، چه زمانی به کیف پول ما واریز می‌شود؟
        </button>
        <div class="collapse" id="collapse8">
            <div class="card card-body">
              سود حاصل از معاملات ربات آربیتراژ ابرکوین به‌صورت لحظه‌ای، به کیف پول شما واریز می‌شود.
            </div>
        </div>
        
        <button class="btn btn-green py-3 text-end w-100 my-2" type="button" @click="toggleCollapse('collapse9')">
          <i class="fa fa-angle-down ms-3"></i>
          آیا احتمال ضرر و زیان در ابرکوین وجود دارد؟
        </button>
        <div class="collapse" id="collapse9">
            <div class="card card-body">
              خیر؛ تمامی معاملات ابرکوین به‌صورت تضمینی انجام می‌شوند و به هیچ عنوان ریسک از دست رفتن سرمایه وجود ندارد.
            </div>
        </div>
        
        <button class="btn btn-green py-3 text-end w-100 my-2" type="button" @click="toggleCollapse('collapse10')">
          <i class="fa fa-angle-down ms-3"></i>
          برداشت‌های ریالی چه‌مدت بعد از ثبت درخواست، به حساب کاربر واریز می‌شود؟
        </button>
        <div class="collapse" id="collapse10">
            <div class="card card-body">
              برداشت‌های ریالی حداکثر ۲۴ ساعت بعد از ثبت درخواست، به حساب بانکی کاربر واریز می‌‎شود. 
            </div>
        </div>
        
        <button class="btn btn-green py-3 text-end w-100 my-2" type="button" @click="toggleCollapse('collapse11')">
          <i class="fa fa-angle-down ms-3"></i>
          صندوق سپرده ارز دیجیتال مناسب چه کسانی است و میزان سوددهی آن چقدر است؟
        </button>
        <div class="collapse" id="collapse11">
            <div class="card card-body">
              صندوق‌ سپرده ارز دیجیتال ابرکوین به دلیل سوددهی ثابت و تضمینی، بهترین گزینه برای افرادی با ریسک‌پذیری پایین به شمار می‌رود که به دنبال سود پایدار و مطمئن هستند. در این صندوق، سپرده‌ی کاربران به تتر (معادل دلار) نگهداری می‌شود و از این رو نوسانات ارزش ریال، آن را به خطر نمی‌‎اندازد. میزان سوددهی این صندوق، بر اساس نوع پنلی که هر کاربر انتخاب می‌کند، حداقل 5 تا 10 برابر سودهی سپرده‌های مشابه بانکی و غیربانکی است. 
            </div>
        </div>

        <button class="btn btn-green py-3 text-end w-100 my-2" type="button" @click="toggleCollapse('collapse12')">
          <i class="fa fa-angle-down ms-3"></i>
          می‌خواهم مبلغی را به کیف پول خود واریز کنم اما ابرکوین، کارت بانکی مرا قبول نمی‌کند. چرا؟ 
        </button>
        <div class="collapse" id="collapse12">
            <div class="card card-body">
              این اتفاق فقط در صورتی رخ می‌دهد که کاربر هنوز هیچ کارتی ثبت نکرده باشد. می‌توانید وارد قسمت کارت‌های بانکی شوید و کارت خود را ثبت نمایید.
            </div>
        </div>

      </div>

    <Footer></Footer>


</template>

<script>

const body = document.getElementsByTagName("body")[0]
import { activateDarkMode, deactivateDarkMode } from "@/assets/js/dark-mode";
// eslint-disable-next-line no-unused-vars
import { Collapse } from 'bootstrap'
import HomeNav from '@/views/components/HomeNav.vue'
import Footer from '@/views/components/Footer.vue'

export default{
    setup(){

        function toggleCollapse(id){
            let collapse = new Collapse(document.getElementById(id))
            collapse.toggle()
        }

        return { toggleCollapse }
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
    mounted(){

    },
    components: { HomeNav, Footer },

}

</script>

<style>
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
  text-align: justify;
}

header *:not(i){
  font-family: Vazirmatn !important;
}

.gradient-green{
  background: linear-gradient(270deg, #3D9393, #31BAA6);
}

.gradient-button a{
  background: rgb(240,240,240);
  color: rgb(85, 85, 85) !important;
}

.btn-green{
  background: linear-gradient(270deg, #3D9393, #31BAA6) !important;
  color: white !important;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  font-weight: 900;
}

.btn-green:hover{
  filter: brightness(1.25);
}

.card-body{
  padding: 1.8rem 2.2rem !important;
}

</style>
