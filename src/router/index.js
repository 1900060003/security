import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'vue-cookies'
import store from '@/store'
import Layout from '@/components/layout/Layout'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  // mode: 'history',
  base: '/',
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Layout,
    children: [{
      path: '',
      name: 'home',
      component: () => import('@/views/Home')
    }]
  }, {
    path: '/sign',
    name: 'sign',
    component: () => import('@/views/Sign')
  }]
})

const parseRouter = function(list, parent) {
  list.forEach(item => {
    if (item.children) {
      router.addRoute({
        path: '/' + item.path,
        name: item.path,
        component: Layout
      })
      parseRouter(item.children, item.path)
    } else {
      if (parent) {
        router.addRoute(parent, {
          path: '/' + parent + '/' + item.path,
          name: parent + item.path.substring(0, 1).toUpperCase() + item.path.substring(1),
          component: (resolve) => require([`@/views/${parent}/${item.path}/index.vue`], resolve)
        })
      } else {
        router.addRoute({
          path: '/' + item.path,
          component: Layout,
          children: [{
            path: '',
            name: item.path,
            component: (resolve) => require([`@/views/${item.path}/index.vue`], resolve)
          }]
        })
      }
    }
  })
}

router.beforeEach((to, from, next) => {
  if (Cookies.get('auth_token')) {
    if (!store.getters.user) {
      store.dispatch('getUser').then(res => {
        parseRouter(store.getters.menus, '')
        return next({ ...to, replace: true })
      })
    } else {
      if (to.name === 'sign') {
        return next(router.push({ path: '/' }))
      } else {
        return next()
      }
    }
  } else {
    if (to.name === 'sign') {
      return next()
    } else {
      return next(router.push({ path: '/sign' }))
    }
  }
})

export default router
