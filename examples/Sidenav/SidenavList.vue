<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="https://abrcoin.com">
          <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
            <i class="fa fa-home text-sm text-info top-0"></i>
          </div>
          <span class="nav-link-text me-1"> صفحه اصلی </span>
        </a>
      </li>

      <li class="nav-item">
        <sidenav-item
          url="/"
          :class="getRoute() === '' ? 'active' : ''"
          navText="داشبورد"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item" id="inverstSideLink">
        <sidenav-item
          url="/investment"
          :class="getRoute() === 'investment' ? 'active' : ''"
          navText="صندوق سپرده گذاری">
          <template v-slot:icon>
            <i class="fa fa-sack-dollar text-dark text-sm"></i>
          </template>
        </sidenav-item>
        <span v-if="getRoute() === 'investment'">
          
          <sidenav-item
            v-for="invest, index in store.state.userInvests"
            :key="index"
            :url="'/investment/'+invest.id"
            :class="`${getRoute() === 'investment' && getIdParam() == invest.id ? 'child-active-link' : ' active'}
            ${invest.is_done ? 'is_done_invest' : '' }`"
            class="me-4"
            :navText="invest.name">
          </sidenav-item>
          
          <sidenav-item
            url="/investment/new"
            class="me-4 border-top"
            :class="route.fullPath === '/investment/new' ? 'child-active-link' : 'active'">
            <template v-slot:icon>
              <span class="ps-2 text-xs text-dark" style="margin-right: 150px;"> ایجاد صندوق </span>
              <i class="fa fa-plus text-dark text-sm"></i>
            </template>
          </sidenav-item>

        </span>
      </li>
      
      <li class="nav-item">
        <sidenav-item
          url="/profile"
          :class="getRoute() === 'profile' ? 'active' : ''"
          navText="حساب کاربری"
        >
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm"></i>
          </template>
        </sidenav-item>
      </li>
      
      <li class="nav-item">
        <sidenav-item
          url="/security"
          :class="getRoute() === 'security' ? 'active' : ''"
          navText="امنیت"
        >
          <template v-slot:icon>
            <i class="fa fa-lock text-primary text-sm"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          url="/bot"
          :class="getRoute() === 'tables' ? 'active' : ''"
          navText="ربات"
        >
          <template v-slot:icon>
            <i
              class="fa fa-robot text-warning text-sm"
            ></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          url="/wallet"
          :class="getRoute() === 'wallet' ? 'active' : ''"
          navText="کیف پول"
        >
          <template v-slot:icon>
            <i class="fad mb-2 fa-wallet text-success text-sm"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          url="/card"
          :class="getRoute() === 'card' ? 'active' : ''"
          navText="کارت بانکی"
        >
          <template v-slot:icon>
            <i class="fad fa-credit-card text-primary text-sm mb-1"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          url="/deposit"
          :class="getRoute() === 'financial' ? 'active' : ''"
          navText="واریز"
        >
          <template v-slot:icon>
            <i class="fa fa-sign-in text-secondary text-sm"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/withdraw"
          :class="getRoute() === 'financial' ? 'active' : ''"
          navText="برداشت"
        >
          <template v-slot:icon>
            <i class="fa fa-sign-out text-secondary text-sm"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          url="/support"
          :class="getRoute() === 'support' ? 'active' : ''"
          navText="پشتیبانی"
        >
          <template v-slot:icon>
            <i class="fa fa-headset text-success text-sm"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <span class="nav-link text-danger text-danger pointer" @click="logout"> 
          <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
            <i class="fa fa-sign-out text-danger text-sm"></i>
          </div>
          خروج
        </span>
      </li>

    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  setup() {
    const store = useStore()
		const route = useRoute()
		const router = useRouter()

    function logout(){
      store.commit('logout')
      router.push('/signin')
    }

    function getRoute() {
      const routeArr = route.path.split("/")
      return routeArr[1];
    }
    function getIdParam() {
      return route.params.id;
    }

    return { logout, getRoute, getIdParam, store, route }
  },
  components: {
    SidenavItem
  },
};
</script>

<style>

.child-active-link{
  background-color: rgba(46, 205, 137, 0.5) !important;
}

.is_done_invest::after{
  content: "*";
  color: red;
  font-size: 18px;
  margin-right: 10px !important;
}

</style>
