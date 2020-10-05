import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  fb
} from "@/firebase/init";
import Home from '@/views/core/Home'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: "home",
    component: Home
  },
  {
    path: '/terms',
    name: "terms",
    component: () => import('@/views/footer/Terms')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login'),
    meta: {
      alreadyAuth: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/auth/Signup'),
    meta: {
      alreadyAuth: true
    }

  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('@/views/user/User'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/order/:id',
    name: 'order',
    component: () => import('@/views/user/Order'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/Dashboard'),
    meta: {
      requiresAdmin: true
    },
    children: [{
        path: "placedOrders",
        name: "placedOrders",
        component: () => import('@/views/admin/admin-orders/PlacedOrders'),
      },
      {
        path: "verifiedOrders",
        name: "verifiedOrders",
        component: () => import('@/views/admin/admin-orders/VerifiedOrders'),
      },
      {
        path: "deliveredOrders",
        name: "deliveredOrders",
        component: () => import('@/views/admin/admin-orders/DeliveredOrders'),
      },
      {
        path: "completedOrders",
        name: "completedOrders",
        component: () => import('@/views/admin/admin-orders/CompletedOrders'),
      }
    ]
  },
  {
    path: "/admin/options",
    name: "options",
    component: () => import('@/views/admin/Options'),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/updateProducts",
    name: "updateProducts",
    component: () => import('@/views/admin/UpdateProducts'),
    meta: {
      requiresAdmin: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = fb.auth().currentUser
  let admin = undefined;
  if (to.matched.some(rec => rec.meta.requiresAdmin)) {
    user
      .getIdTokenResult()
      .then(idTokenResult => {
        admin = idTokenResult.claims.admin;
      }).then(() => {
        if (admin) {
          next()
        } else {
          next({
            path: `/user/${user.uid}`
          })
        }
      })
  } else if (to.matched.some(rec => rec.meta.requiresAuth)) {
    if (user) {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  } else if (to.matched.some(rec => rec.meta.alreadyAuth)) {
    if (user) {
      next({
        path: `/user/${user.uid}`
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router