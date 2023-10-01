import { createRouter, createWebHistory } from "vue-router";
import store from '../store'


import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Robot from "../views/Robot.vue";
import Wallet from "../views/Wallet.vue";
import Card from "../views/Card.vue";
import Profile from "../views/Profile.vue";
import Security from "../views/Security.vue";
import Withdraw from "../views/Withdraw.vue";
import Deposit from "../views/Deposit.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import ResetPassword from "../views/ResetPassword.vue";
import VerifyPay from "../views/VerifyPay.vue";
import Support from "../views/Support.vue";
import SingleTicket from "../views/SingleTicket.vue";
import Faq from "../views/Faq.vue";
import Rules from "../views/Rules.vue";
import Contact from "../views/Contact.vue";
import Training from "../views/Training.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { loginRedirect: false, loginRequired: false }
    // redirect: "/dashboard",
  },
  {
    path: "/faq",
    name: "Faq",
    component: Faq,
    meta: { loginRedirect: false, loginRequired: false }
  },
  {
    path: "/rules",
    name: "Rules",
    component: Rules,
    meta: { loginRedirect: false, loginRequired: false }
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: { loginRedirect: false, loginRequired: false }
  },
  {
    path: "/training",
    name: "Training",
    component: Training,
    meta: { loginRedirect: false, loginRequired: false }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { loginRequired: true }
  },
  {
    path: "/bot",
    name: "Robot",
    component: Robot,
    meta: { loginRequired: true }
  },
  {
    path: "/wallet",
    name: "Wallet",
    component: Wallet,
    meta: { loginRequired: true }
  },
  {
    path: "/card",
    name: "Card",
    component: Card,
    meta: { loginRequired: true }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { loginRequired: true }
  },
  {
    path: "/security",
    name: "Security",
    component: Security,
    meta: { loginRequired: true }
  },
  {
    path: "/withdraw",
    name: "Withdraw",
    component: Withdraw,
    meta: { loginRequired: true }
  },
  {
    path: "/deposit",
    name: "Deposit",
    component: Deposit,
    meta: { loginRequired: true }
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    meta: { loginRedirect: true }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { loginRedirect: true }
  },
  {
    path: '/verifyPay/',
    name: 'verifyPay',
    component: VerifyPay,
  },
  {
    path: '/resetPassword/:token?/:id?',
    name: 'resetPassword',
    component: ResetPassword
  },
  {
    path: '/support',
    name: 'Support',
    component: Support,
    meta: { loginRequired: true }
  },
  {
    path: '/ticket/:id',
    name: 'SingleTicket',
    component: SingleTicket,
    meta: { loginRequired: true }
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});


router.beforeEach((to, from, next) => {
  let app = document.getElementById("app")
  let width = window.innerWidth
  if(app.classList.contains("g-sidenav-pinned") && width < 1200){
    // store.commit("toggleSidebarColor", "bg-white")
    store.commit("navbarMinimize")
  }
  if (to.matched.some(record => record.meta.loginRequired)) {
    if (store.state.isAuthenticated) {
      next()
    } else {
      next("/signin")
    }
  }else if (to.matched.some(record => record.meta.loginRedirect)) {
    if (store.state.isAuthenticated) {
      next("/dashboard")
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
