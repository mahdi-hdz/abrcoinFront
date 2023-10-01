<template>
<div v-if="firstLoading" class="fullscreen">
    <div class="loader"></div>
</div>
<main>
    <div class="container-fluid p-0 px-sm-3">
        <div class="card">
            <div class="card-header pb-0">
                <div class="d-flex align-items-center">
                    <p class="mb-0"> پیام ها </p>
                    <router-link class="btn btn-dark btn-sm px-3 me-auto" to="/support">
                        بازگشت
                        <i class="fa fa-long-arrow-left me-2"></i>
                    </router-link>
                </div>
                <hr class="horizontal dark m-0">
            </div>
            <div class="card-body p-1 p-sm-3 mt-4 mt-sm-1">
                <div class="mb-2">
                    <span class="text-sm"> موضوع: </span> 
                    <strong class="me-1 text-dark"> {{data.subject}} </strong>    
                </div>
                <div class="mb-2">
                    <span class="text-sm"> وضعیت: </span> 
                    <strong class="me-1 text-dark text-sm"> 
                        {{data.status}} 
                        <span class="text-secondary text-xs" v-if="data.status == 'بسته شده'"> (برای بازگشایی تیکت, پیامی ارسال کنید) </span>
                    </strong>
                    <button v-if="data.status != 'بسته شده'" class="me-3 btn btn-danger btn-xs px-2 m-0" @click="closeTicket" id="closeBtn"> بستن تیکت </button>
                </div>
                <div class="mb-5 mb-sm-2">
                    <span class="text-sm"> آخرین بروزرسانی: </span> 
                    <strong class="me-1 text-dark text-sm" dir="ltr" style="direction: ltr; text-align: end;"> 
                        {{ new Date(data.last_change).toLocaleString('fa-IR').slice(0, -3) }} 
                    </strong>    
                </div>
                <div class="px-0 pt-4 border rounded shadow row m-0 my-4">
                    <div v-for="msg, index in data.messages" :key="index" class="px-3">
                        <div class="col-11 col-sm-9 py-4 px-3 user-msg mb-3">
                            <div class="d-flex mb-3 align-items-center">
                                <p class="font-weight-bold text-sm mb-0"> پیام شما </p>
                                <span class="me-auto ms-3 text-xs" dir="ltr" style="direction: ltr; text-align: end;">
                                    {{ new Date(msg.created_at).toLocaleString('fa-IR').slice(0, -3) }}
                                </span>
                            </div>
                            {{msg.text}}
                        </div>
                        <div v-for="ans, index2 in msg.answers" class="col-11 col-sm-9 py-4 px-3 answer-msg me-auto mb-3" :key="index2">
                            <div class="d-flex mb-3 align-items-center">
                                <p class="font-weight-bold text-sm mb-0"> پاسخ پشتیبانی </p>
                                <span class="me-auto ms-3 text-xs" dir="ltr" style="direction: ltr; text-align: end;">
                                    {{ new Date(ans.created_at).toLocaleString('fa-IR').slice(0, -3) }}
                                </span>
                            </div>
                            {{ans.text}}
                        </div>
                    </div>
                    <div class="position-sticky bottom-0 px-0">
                        <form class="position-relative" @submit.prevent="sendMessage">
                            <input type="text" placeholder="پیام شما" class="form-control shadow" v-model="text">
                            <button class="btn btn-dark btn-xs eye-absolute no-hover-btn" type="submit" id="sendBtn">
                                <i class="fa fa-send fs-6"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router'

export default {
    name: "Support",
    
    setup(){
        
        let firstLoading = ref(true)
        let data = ref({})
        let route = useRoute()
        let ticket_id = route.params.id
        let text = ref('')
        
        function getData(){
            firstLoading.value = true
            axios.get(`support/detail/${ticket_id}`)
            .then(response => {
                firstLoading.value = false
                data.value = response.data
            })
            .catch(() => {
                firstLoading.value = false
            })
        }

        getData()
        
        
        function sendMessage(){
            let btn = document.getElementById("sendBtn")
            let btnInner = btn.innerHTML
            btn.disabled = true
            btn.innerHTML += '<div class="loader"></div>'

            axios.post('support/newTicket', {
                conversation_id: ticket_id,
                text: text.value
            })
            .then(() => {
                btn.disabled = false
                btn.innerHTML = btnInner
                getData()
                text.value = ''
            })
            .catch(() => {
                btn.disabled = false
                btn.innerHTML = btnInner
            })
        }
        
        function closeTicket(){
            let btn = document.getElementById("closeBtn")
            let btnInner = btn.innerHTML
            btn.disabled = true
            btn.innerHTML += '<div class="loader"></div>'

            axios.post(`support/closeConversation/${ticket_id}`)
            .then(() => {
                btn.disabled = false
                btn.innerHTML = btnInner
                getData()
            })
            .catch(() => {
                btn.disabled = false
                btn.innerHTML = btnInner
            })
        }
        
        return { firstLoading, data, sendMessage, text, closeTicket }
    }
};
</script>
    