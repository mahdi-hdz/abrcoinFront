<template>
    <div class="py-5 mt-5" style="text-align: center;">

        <div v-if="firstLoading" class="spinner-grow text-dark d-block mx-auto" role="status"></div>

        <div v-else>
            <div v-if="success">
                <i class="fa fa-check-circle text-success display-1"></i>
                <h3 class="pt-3 ebold"> پرداخت موفق </h3>
                <h5 class="pt-5" dir="rtl"> {{ msg }} </h5>
            </div>
            <div v-else>
                <i class="fa fa-exclamation-triangle text-danger display-1"></i>
                <h3 class="pt-3 ebold">پرداخت ناموفق</h3>

                <h5 class="pt-5" dir="rtl"> {{ msg }} </h5>
                <!-- <p class="text-muted">( درصورتی که پول از حسابتان کم شده تا دقایقی دیگر بازمیگردد )</p> -->
            </div>
            <hr class="col-10 col-sm-8 col-md-5 col-lg-3 mx-auto">
            <a href="https://abrcoin.com" class="btn btn-primary mt-4"> رفتن به صفحه اصلی <i class="fa fa-home ms-2"></i> </a><br>
        </div>

    </div>
</template>

<script>
const body = document.getElementsByTagName("body")[0]

import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


export default{
    setup() {
        window.addEventListener('beforeunload',function (e) {
            e.preventDefault()
            return "رفرش کردن صفحه ممکن است باعث عدم پرداخت صحیح شود"
        })
        window.onbeforeunload = function(e){
            e.preventDefault()
           return "رفرش کردن صفحه ممکن است باعث عدم پرداخت صحیح شود"
        }
        let data = ref([]);
        let firstLoading = ref(true)
        let success = ref(false)
        let route = useRoute()
        let router = useRouter()
        let msg = ref("")
        let authority = route.query.Authority
        let status = route.query.Status
        let NP_id = route.query.NP_id
        let botId = ref(1)

        if(NP_id){
            router.push("/verifyPay")
            nowVerifyPay()
        }

        else{
            
            if(!status || !authority){
                firstLoading.value = false
                success.value = false
                msg.value = "تراکنش یافت نشد"
            }else if(status !== "OK"){
                    firstLoading.value = false
                    success.value = false
                    msg.value = "تراکنش ناموفق یا لغو شده توسط کاربر"
            }else{
                router.push("/verifyPay")
                verifyPay()
            }            
        }
        

        function verifyPay() {
            axios.post("/financial/zarinVerifyDeposit", {
                authority: authority
            }).then((res) => {
                if(res.data.botId){
                    botId.value = res.data.botId
                }
                success.value = true
                msg.value = res.data.message
                firstLoading.value = false
            }).catch((res)=>{
                success.value = false
                msg.value = res.response.data.message
                firstLoading.value = false
            })
        }

        
        function nowVerifyPay() {
            axios.post("/financial/verifyDeposit", {
                NP_id: NP_id
            }).then((res) => {
                if(res.data.botId){
                    botId.value = res.data.botId
                }
                success.value = true
                msg.value = res.data.message
                firstLoading.value = false
            }).catch((res)=>{
                success.value = false
                msg.value = res.response.data.message
                firstLoading.value = false
            })
        }
        

        return { data, firstLoading, success, msg, botId };
    },
    created() {
        this.$store.state.showNavbar = false;
        this.$store.state.showSidenav = false;
        body.classList.remove("bg-gray-100");
    },
    beforeUnmount() {
        this.$store.state.showNavbar = true;
        this.$store.state.showSidenav = true;
        body.classList.add("bg-gray-100");
    },
}
</script>

<style scoped>

*{
    text-align: center !important;
}

</style>

