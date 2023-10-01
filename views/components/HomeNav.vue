<template>
    
    <header class="header-area header-sticky wow slideInDown gradient-green" data-wow-duration="0.75s" data-wow-delay="0s">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <nav class="main-nav">
                        <!-- ***** Logo Start ***** -->
                        <a href="#" class="logo d-block d-md-none d-lg-block">
                            <img src="@/assets/images/logo.png" alt="ابرکوین" style="max-width: 150px;">
                        </a>
                        <!-- ***** Logo End ***** -->
                        <!-- ***** Menu Start ***** -->
                        <ul class="nav">
                            <li class="scroll-to-section"><router-link class="text-light" to="/">خانه</router-link></li>
                            <li class="scroll-to-section"><router-link class="text-light" to="/faq"> سوالات متداول </router-link></li>
                            <li class="scroll-to-section"><router-link class="text-light" to="/rules"> قوانین </router-link></li>
                            <li class="scroll-to-section"><router-link class="text-light" to="/training"> آموزش ها </router-link></li>
                            <li class="scroll-to-section"><router-link class="text-light" to="/#about-us"> درباره ما </router-link></li>
                            <li class="scroll-to-section"><router-link class="text-light" to="/contact"> تماس باما </router-link></li>
                            <li v-if="store.state.isAuthenticated">
                                <div class="gradient-button button-light">
                                    <router-link id="modal_trigger" to="/dashboard" style="font-size: 15px;">
                                        <i class="fa fa-user-alt"></i>
                                        پنل کاربری
                                    </router-link>
                                </div>
                            </li> 
                        </ul>        
                        <a class='menu-trigger' @click="menu_trigger">
                            <span>Menu</span>
                        </a>
                        <!-- ***** Menu End ***** -->
                    </nav>
                </div>
            </div>
        </div>
    </header>

</template>

<script>
import { useStore } from 'vuex'

export default{
    name: "HomeNav",
    setup(){
        let store = useStore()

        function menu_trigger(){
            document.querySelector(".menu-trigger").classList.toggle("active")
            document.querySelector(".header-area .nav").classList.toggle("d-block")
        }

        return { store, menu_trigger }
        
    }
}

</script>
