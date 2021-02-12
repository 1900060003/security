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
  var routerList = []
  list.forEach(item => {
    let router
    if (item.children) {
      router = {
        path: '/' + item.path,
        component: Layout,
        children: []
      }
      router.children = parseRouter(item.children, parent + '/' + item.path)
    } else {
      if (parent) {
        router = {
          path: item.path,
          name: item.path,
          component: (resolve) => require([`@/views${parent}/${item.path}/index.vue`], resolve)
        }
      } else {
        router = {
          path: '/' + item.path,
          component: Layout,
          children: [{
            path: '',
            name: item.path,
            component: (resolve) => require([`@/views/${item.path}/index.vue`], resolve)
          }]
        }
      }
    }
    routerList.push(router)
  })
  return routerList
}

router.beforeEach((to, from, next) => {
  if (Cookies.get('auth_token')) {
    if (!store.getters.user) {
      store.dispatch('getUser').then(res => {
        const routerList = parseRouter(store.getters.menus, '')
        console.log(routerList)
        router.addRoutes(routerList.concat([{
          path: '*',
          component: () => import('@/views/404')
        }]))
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
