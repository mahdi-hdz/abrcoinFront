<template>
<div v-if="firstLoading" class="fullscreen">
    <div class="loader"></div>
</div>
<div class="py-4 container-fluid p-0 px-sm-3">
    <div class="row m-0">
        <div class="col-md-5">
            <div class="card">
                <div class="card-header pb-0 px-3">
                    <h6 class="mb-4"> <i class="fa fa-lock ms-1"></i> تغییر رمزعبور </h6>
                </div>
                <div class="card-body p-3">
                    <form class="row m-0" @submit.prevent="changePassword">
                        
                        <div class="col-xxl-7 mx-auto">
                            <label for="inp1" class="form-control-label"> رمزعبور فعلی </label>
                            <div class="position-relative">
                                <input required v-model="password" class="form-control form-control-default" type="password" id="inp1"/>
                                <i class="fa fa-eye eye-absolute" @click="toggleEye('inp1')"></i>
                            </div>
                        </div>
                        
                        <div class="col-xxl-7 mx-auto mt-3">
                            <label for="inp2" class="form-control-label"> رمزعبور جدید </label>
                            <div class="position-relative">
                                <input required v-model="newPass1" class="form-control form-control-default" type="password" id="inp2"/>
                                <i class="fa fa-eye eye-absolute" @click="toggleEye('inp2')"></i>
                            </div>
                        </div>
                        
                        <div class="col-xxl-7 mx-auto mt-2 mb-1">
                            <label for="inp3" class="form-control-label"> تکرار رمزعبور جدید </label>
                            <div class="position-relative">
                                <input required v-model="newPass2" class="form-control form-control-default" type="password" id="inp3"/>
                                <i class="fa fa-eye eye-absolute" @click="toggleEye('inp3')"></i>
                            </div>
                        </div>
                        
                        <div class="mt-4 text-center">
                            <button class="btn mb-0 btn-success btn-md font-iran py-2 px-5" id="passwordBtn" type="submit"> ثبت </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-7">
            <div class="card mb-4 h-100 mt-4 mt-lg-0">
                <div class="card-header pb-0 px-3">
                    <h6 class="mb-4"> <i class="fa fa-shield ms-1"></i> 
                        Google Authenticator
                    
                        <span class="text-xs text-center text-secondary me-1"> وضعیت: 
                            <strong v-if="data.totp_active" class="text-success font-weight-bold"> <i class="fa fa-circle"></i>  فعال </strong>
                            <strong v-else class="text-danger font-weight-bold"> <i class="fa fa-circle"></i>  غیرفعال </strong>
                        </span>
                    </h6>
                </div>
                <div class="card-body p-1 p-xl-3" v-if="!data.totp_active && !firstLoading">
                    <form @submit.prevent="submitAuthenticator">
                        <p class="text-sm mb-5"> برای فعالسازی Google Authenticator کد زیر را در برنامه Authenticator خود اسکن کرده و کد دریافتی را در فرم زیر آن وارد کرده و تایید نمایید. </p>
                        <div id="qrCodeWrapp" class="col-6 col-md-3 mx-auto mt-4 mb-3">
                            <qr-code :text="'otpauth://totp/'+data.phone_number+'?secret='+data.totp_secret+'&issuer=Abrcoin'"></qr-code>
                        </div>
                        <div class="col-md-5 mx-auto">
                            <input class="form-control mb-4 mt-2" type="text" placeholder="کد دریافتی" id="setCode" maxlength="6"/>
                        </div>
                        <div class="text-center">
                            <button class="btn mb-0 bg-gradient-success btn-sm mt-2 mb-3" type="submit" id="setBtn"> تایید </button>
                        </div>
                    </form>
                </div>
                <div class="card-body p-1 p-xl-3" v-else>
                    <div class="row m-0 mt-4">
                        <form class="col-lg-6 mb-5 mb-lg-0" id="border-query" @submit.prevent="deleteAuthenticator">
                            <p class="text-sm mb-5 text-center"> برای غیر فعالسازی کد تایید را وارد کنید. </p>
                            <div class="col-lg-10 col-xl-9 col-xxl-8 mx-auto">
                                <input class="form-control mb-4 mt-2" type="text" placeholder="کد Authenticator" id="deleteCode" maxlength="6"/>
                            </div>
                            <div class="text-center pt-4">
                                <button class="btn mb-0 bg-gradient-danger btn-sm mt-2 mb-3" type="submit" id="deleteBtn"> غیرفعال سازی </button>
                            </div>
                        </form>
                        <form class="col-lg-6" @submit.prevent="resetAuthenticator">
                            
                            <p class="text-sm mb-5 text-center"> برای تنظیم مجدد کد تایید را وارد کنید. </p>
                            
                            <div class="col-lg-10 col-xl-9 col-xxl-8 mx-auto">
                                <input class="form-control mb-4 mt-2" type="text" placeholder="کد Authenticator" id="resetCode" maxlength="6"/>
                            </div>
                            
                            <div class="text-center pt-4">
                                <button class="btn mb-0 bg-gradient-secondary btn-sm mt-2 mb-3" type="submit" id="resetBtn"> تنظیم مجدد </button>
                            </div>
                            
                        </form>
                        
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
import Swal  from 'sweetalert2';
import { trans_num } from '../main.js'


export default {
    name: "security",
    components: {
    },
    setup() {
        let data = ref({})
        let password= ref()
        let firstLoading = ref(true)
        
        let newPass1= ref()
        let newPass2= ref()
        
        function getData(){
            axios.get('/account/authenticator')
            .then((res) => {
                data.value = res.data.data
                firstLoading.value = false
                console.log(res.data);
            })
            .catch(() => {
                firstLoading.value = false
            })
        }

        getData()
        
        
        function submitAuthenticator(){
            
            let inp = document.getElementById("setCode")
            
            if(inp.value.length != 6){
                Swal.fire("کد ۶ رقمی ساخته شده در نرم افزار را وارد کنید", "", "warning")
                return
            }
            
            let btn = document.getElementById("setBtn")
            let btnInner = btn.innerHTML
            btn.disabled = true
            btn.innerHTML += '<div class="loader"></div>'
            
            axios.post("account/authenticator", {
                code: trans_num(inp.value)
            }).then(()=>{
                btn.disabled = false
                btn.innerHTML = btnInner
                inp.value = ""
                firstLoading.value = true
                getData()
            }).catch(()=>{
                btn.disabled = false
                btn.innerHTML = btnInner
            })
            
        }
        
        
        function deleteAuthenticator(){
            let inp = document.getElementById("deleteCode")
            if(inp.value.length != 6){
                Swal.fire("کد ۶ رقمی ساخته شده در نرم افزار را وارد کنید", "", "warning")
                return
            }
            let btn = document.getElementById("deleteBtn")
            let btnInner = btn.innerHTML
            btn.disabled = true
            btn.innerHTML += '<div class="loader"></div>'
            axios.delete(`account/authenticator?code=${trans_num(inp.value)}`).then(()=>{
                Swal.fire("Google Authenticator حساب شما با غیرفعال شد.", "", "success")
                btn.disabled = false
                btn.innerHTML = btnInner
                inp.value = ""
                firstLoading.value = true
                getData()
            }).catch(()=>{
                btn.disabled = false
                btn.innerHTML = btnInner
            })
        }

        function resetAuthenticator(){
            let inp = document.getElementById("resetCode")
            if(inp.value.length != 6){
                Swal.fire("کد ۶ رقمی ساخته شده در نرم افزار را وارد کنید", "", "warning")
                return
            }
            let btn = document.getElementById("resetBtn")
            let btnInner = btn.innerHTML
            btn.disabled = true
            btn.innerHTML += '<div class="loader"></div>'
            axios.delete(`account/authenticator?code=${trans_num(inp.value)}`).then(()=>{
                Swal.fire("QR Code جدید را اسکن کرده و کد آن را وارد کنید.", "", "info")
                btn.disabled = false
                btn.innerHTML = btnInner
                inp.value = ""
                firstLoading.value = true
                getData()
            }).catch(()=>{
                btn.disabled = false
                btn.innerHTML = btnInner
            })
        }

        
        function changePassword(){
            if(newPass1.value != newPass2.value){
                Swal.fire("پسورد ها یکسان وارد نشدند", "", "warning")
                return
            }
            let btn = document.getElementById("passwordBtn")
            let btnInner = btn.innerHTML
            btn.disabled = true
            btn.innerHTML += '<div class="loader"></div>'
            
            axios.post('account/changePassword', {
                old_password: password.value,
                new_password: newPass1.value,
            })
            .then(() => { 
                btn.disabled = false
                btn.innerHTML = btnInner
                password.value = ''
                newPass1.value = ''
                newPass2.value = ''
            })
            .catch(() => {
                btn.disabled = false
                btn.innerHTML = btnInner
            })
        }

        function toggleEye(id){
            let el = document.getElementById(id)
            el.type == 'password' ? el.type = 'text' : el.type = 'password'
            el.parentElement.lastElementChild.classList.toggle("fa-eye-slash")
        }
        
        return { data, submitAuthenticator, changePassword, password, newPass1, trans_num,
            newPass2, firstLoading, resetAuthenticator, deleteAuthenticator, toggleEye }
        }
    }
</script>

<style>

@media screen and (max-width: 991px) {
    #border-query{
        border-bottom: 1px solid #dee2e6;
    }
}
@media screen and (min-width: 992px) {
    #border-query{
        border-left: 1px solid #dee2e6;
    }
}

</style>
