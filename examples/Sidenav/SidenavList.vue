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
  <div class="pt-3 mx-3 mt-3 sidenav-footer">

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

    return { logout, getRoute }
  },
  components: {
    SidenavItem
  },
};
</script>
