<template>
    <div class="position-fixed text-light" id="chatBtn"
    style="bottom: 15px; left: 10px; z-index: 100;">
        <i class="fa fa-comments p-auto fs-3 pointer" @click="chat_toggle"></i>

        <div id="chat-content" class="text-dark w-100 h-100 p-0 text-sm">
            <div>
                <button @click="chat_toggle" class="btn btn-xs py-1 px-2 mb-0 float-start"> 
                    <i class="fa fa-minus fs-5"></i> 
                </button>
                <button @click="chat_toggle(true)" class="btn btn-xs py-1 px-2 mb-0"> 
                    <i class="fa fa-times fs-5"></i> 
                </button>
            </div>
            <div id="messages" class="px-3 pt-2">
                
                <div class="col-10 me-auto bg-gradient-success rounded p-2 text-dark left-fade-in show mb-2">
                    سلام کاربر عزیز چه کمکی ازم ساخته س؟
                </div>
                <div class="col-10 btn btn-outline-primary m-0 me-auto rounded p-2 mt-3 pointer right-fade-in show" id="start" @click="start">
                    نیاز به راهنمایی یا ارتباط با پشتیبانی دارم
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default{
    setup(){
        function chat_toggle(reset=false){
            let el = document.getElementById("chatBtn")
            el.classList.toggle("chat-open")
            if(reset == true){
                selected = []
                document.getElementById("messages").innerHTML = '<div class="col-10 me-auto bg-gradient-success rounded p-2 text-dark left-fade-in show mb-2">سلام کاربر عزیز چه کمکی ازم ساخته س؟</div><div class="col-10 btn btn-outline-primary m-0 me-auto rounded p-2 mt-3 pointer right-fade-in show" id="start">نیاز به راهنمایی یا ارتباط با پشتیبانی دارم</div>'
                document.getElementById("start").addEventListener("click", start)
            }
        }

        let selected = []
        let router = useRouter()

        let data = {
            "احراز هویت": {
                "چقدر زمان میبره احراز هویت من تایید بشه؟": "کمتر از ۲۴ ساعت کاری",
                "بیش از ۲۴ ساعت کاری گذشته اما احراز هویت من تایید نشده": "میتوانید مورد مربوطه را به پشتیبانی از طریق تیکت اطلاع دهید, در اولین فرصت بررسی و درصورت نیاز پاسخ میدیم.",
                "سوالم توی گزینه ها وجود نداره": "میتونین سوالتون رو با پشتیبانی درمیون بزارین, کافیه دکمه زیر رو لمس کنین"
            },
            "Google Authenticator": {
                "Google Authetication چیه و به چه دردی میخوره؟": "گوگل اتنتیکیتور برنامه تولید رمزهای یکبار مصرف است که بعنوان عامل دوم (بجز رمز عبور همیشگی) برای ورود و سایر امور حساس حساب کاربری شما استفاده شده و باعث افزایش امنیت حساب شما میشود. به زبان ساده تر, شما برای انجام امور خود علاوه بر دانستن رمز عبور همیشگی,نیاز است با در دست داشتن تلفن همراه خود, از رمز عبور تصادفی در نرم افزار گوگل اتنتیکیتور, نیز استفاده کنید.",
                "به کد Google Authenticator م دسترسی ندارم!": "میتونی به پشتیبانی پیام بدی, بعد از تایید هویتت, پشتیبانی میتونه Authenticator ت رو غیرفعال کنه تا مجدد بتونی بدون داشتن رمز قبلی, کد جدیدت رو داشته باشی.",
                "سوالم توی گزینه ها وجود نداره": "میتونین سوالتون رو با پشتیبانی درمیون بزارین, کافیه دکمه زیر رو لمس کنین"
            },
            // "ربات": "",
            // "واریز": "",
            // "برداشت": "",
        }

        function selected_changed(){
            let messages = document.getElementById("messages")
            messages.innerHTML = '<div class="col-10 me-auto bg-gradient-success rounded p-2 text-dark left-fade-in show mb-2"> یکی از گزینه های زیر رو انتخاب کنید </div>'
            let _data = data[selected[0]]
            let show_support = false
            for(const sel of selected.slice(1)){
                if(typeof(_data[sel]) == "string"){
                    show_support = true
                }
                _data = _data[sel]
            }
            if(show_support){
                messages.innerHTML = `<div class="col-10 me-auto bg-gradient-success text-dark rounded p-2 mt-3 pointer left-fade-in show"> ${_data} </div>`
                messages.innerHTML += '<div class="text-xs mt-4 text-center">اگه نیاز به راهنمایی بیشتر دارید میتونین برای ما پیام بفرستن تا درکمترین زمان پاسخگو سوالات و مشکلات شما باشیم <div><button id="goSupport" class="btn btn-sm mt-3 bg-gradient-info"> ارسال پیام </button></div> </div>'
                document.getElementById("goSupport").addEventListener("click", ()=>{
                    router.push("/support")
                    chat_toggle()
                })
            }else{
                for (const key in _data) {
                    let div = document.createElement("div")
                    div.className = "col-10 btn btn-outline-primary m-0 me-auto rounded p-2 mt-3 pointer right-fade-in show"
                    div.innerText = key
                    div.addEventListener("click", (e)=>{
                        selected.push(e.target.innerText)
                        selected_changed()
                    })
                    messages.appendChild(div)
                }
            }
        }

        function start(){
            let messages = document.getElementById("messages")
            messages.innerHTML = '<div class="col-10 me-auto bg-gradient-success rounded p-2 text-dark left-fade-in show mb-2"> دسته بندی سوالتون رو انتخاب کنید. </div>'
            for (const key in data) {
                let div = document.createElement("div")
                div.className = "col-10 btn btn-outline-primary m-0 me-auto rounded p-2 mt-3 pointer right-fade-in show"
                div.innerText = key
                div.addEventListener("click", (e)=>{
                    selected.push(e.target.innerText)
                    selected_changed()
                })
                messages.appendChild(div)
            }
        }

        return { chat_toggle, data, start }
    }
}
</script>

<style>

#chatBtn{
    height: 100%;
    max-height: 70px;
    transition: all 0.1s ease-in !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 70px;
    background: linear-gradient(310deg, #1171ef 0%, #11cdef 100%);
    border-radius: 40%;
}

#chat-content{
    display: none;
}

#messages{
    height: 368px;
    overflow-x: hidden;
    overflow-y: scroll;
}

.chat-open{
    max-height: 400px !important;
    max-width: 300px !important;
    border-radius: 15px !important;
    background: rgb(240, 240, 240) !important;
    border: 1px rgb(199, 199, 199) solid;
    box-shadow: 0px 0px 20px -5px rgb(115, 115, 115);
}

.fa-comments{
    padding: 20px 18px;
    border-radius: 40%;
}

.chat-open .fa-comments{
    display: none;
}

.chat-open #chat-content{
    display: block !important;
    z-index: 101;
}

.left-fade-in{
    transform: translateX(-100%);
    opacity: 0;
}

.right-fade-in{
    transform: translateX(100%);
    opacity: 0;
}

.show{
    animation: fade-in 1s both;
}

@keyframes fade-in {

    100%{
        transform: translate(0%);
        opacity: 1;
    }
}

</style>
