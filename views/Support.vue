<template>
<div v-if="firstLoading" class="fullscreen">
    <div class="loader"></div>
</div>
<main>
    <div class="container-fluid p-0 px-sm-3">
        <div class="row m-0">
            <div class="col-md-8 mb-3">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="d-flex align-items-center">
                            <p class="mb-0"> تیکت های پشتیبانی </p>
                        </div>
                    </div>
                    <div class="card-body" style="overflow-x: scroll;">
                        <div class="font-weight-bold text-center mt-5 py-5" v-if="!data[0]"> تیکتی برای نمایش وجود ندارد </div>
                        <table v-else class="table text-center mb-0 mt-4 w-100">
                            <thead class="text-dark">
                                <tr>
                                    <th class="text-xs font-weight-bolder ps-2"> موضوع </th>
                                    <th class="text-xs font-weight-bolder ps-2"> وضعیت </th>
                                    <th class="text-xs font-weight-bolder ps-2"> آخرین بروزرسانی </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="text-sm">
                                <!-- <tr v-for="ticket, index in data" :key="index" class="vertical-align text-center" :class="{'bg-gray-100' : ticket.is_seen}"> -->
                                <tr v-for="ticket, index in data" :key="index" class="vertical-align text-center">
                                    <td class="py-3">
                                        {{ticket.subject}}
                                    </td>
                                    <td class="py-3">
                                        {{ticket.status}}
                                    </td>
                                    <td class="py-3" dir="ltr" style="direction: ltr; text-align: end;">
                                        {{new Date(ticket.last_change).toLocaleString('fa-IR').slice(0, -3)}}
                                    </td>
                                    <td class="py-3">
                                        <router-link class="btn btn-sm btn-primary my-0" :to="'/ticket/'+ticket.id" :class="{'btn-secondary' :  ticket.is_seen}"> جزییات </router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card h-100 mb-4">
                    <div class="card-header pb-0 px-3">
                        <h6 class="mb-4"> <i class="fa fa-circle text-sm ms-2"></i> ایجاد تیکت  </h6>
                    </div>
                    
                    <div class="card-body pt-4 p-3">
                        <form class="row m-0" @submit.prevent="createTicket">
                            <div>
                                <label for="ticketSubject" class="form-control-label"> موضوع </label>
                                <input v-model="subject" class="form-control form-control-default" id="ticketSubject" type="text"/>
                            </div>
                            <div class="mt-3">
                                <label for="ticketText" class="form-control-label"> متن پیام </label>
                                <textarea id="ticketText" rows="4" class="form-control form-control-default" v-model="text"></textarea>
                            </div>
                            
                            <div class="mt-5">
                                <button class="btn mb-0 btn-success btn-md font-iran py-2 px-5" id="ticketBtn" type="submit"> ثبت </button>
                            </div>
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

export default {
    name: "Support",
    
    setup(){
        
        let firstLoading = ref(true)
        let data = ref({})
        let subject = ref('')
        let text = ref('')
        
        function getConversationList(){
            firstLoading.value = true
            axios.get('support/conversationList')
            .then(response => {
                firstLoading.value = false
                data.value = response.data.data
            })
            .catch(() => {
                firstLoading.value = false
            })
        }

        getConversationList()
        
        
        function createTicket(){
            let btn = document.getElementById("ticketBtn")
            let btnInner = btn.innerHTML
            btn.disabled = true
            btn.innerHTML += '<div class="loader"></div>'

            axios.post('support/newConversation', {
                subject: subject.value,
                text: text.value
            })
            .then(() => {
                btn.disabled = false
                btn.innerHTML = btnInner
                subject.value = ''
                text.value = ''
                getConversationList()
            })
            .catch(() => {
                btn.disabled = false
                btn.innerHTML = btnInner
            })
        }

        
        return { firstLoading, data, createTicket, subject, text }
    }
};
</script>
    