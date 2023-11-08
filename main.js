import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import './assets/fontawesome/css/all.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Swal from 'sweetalert2'
import axios from 'axios'
import ArgonDashboard from "./argon-dashboard";
import VueQRCodeComponent from 'vue-qrcode-component'

axios.defaults.baseURL = 'http://127.0.0.1:8000';
// axios.defaults.baseURL = 'https://api.abrcoin.com';

axios.interceptors.response.use(
    (success) =>{
        if(success.data.detail){
            Swal.fire(success.data.message, success.data.detail, 'success')
        }else if(success.data.message){
            Swal.fire(success.data.message, '', 'success')
        }
    return success
}, (error) => {
    try{
        if(error.response.status == 500){
            Swal.fire("خطا داخلی سرور", "این مورد جهت بررسی به پشتیبانی ارسال شد.", 'error')
            return Promise.reject(error);
        }
        if(error.response.data.code == "token_not_valid"){
            return Promise.reject(error);
        }
        if(error.response.data.detail){
            Swal.fire(error.response.data.message, error.response.data.detail, 'error')
        }
        else{
            Swal.fire(error.response.data.message, "", 'error')
        }

        return Promise.reject(error);
    }catch (error) {
        Swal.fire("خطا در ارتباط با سرور", "لطفا از اتصال اینترنت خود اطمینان حاصل کرده و صفحه را رفرش کنید.", 'error')
      }
})

function trans_num(num){
    try {
        let res = num.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
        res.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
        return res
    } catch {
        return num
    }
}


const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.component('qr-code', VueQRCodeComponent)
appInstance.mount("#app");

export {trans_num}