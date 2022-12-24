import Kdu from 'kdu'
<%_ if (hasTypeScript) { _%>
import KduRouter, { RouteConfig } from 'kdu-router'
<%_ } else { _%>
import KduRouter from 'kdu-router'
<%_ } _%>
import HomeView from '../views/HomeView.kdu'

Kdu.use(KduRouter)

<%_ if (hasTypeScript) { _%>
const routes: Array<RouteConfig> = [
<%_ } else { _%>
const routes = [
<%_ } _%>
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    <%_ if (doesCompile) { _%>
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.kdu')
    <%_ } else { _%>
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.kdu')
    }
    <%_ } _%>
  }
]

const router = new KduRouter({
  <%_ if (historyMode) { _%>
  mode: 'history',
  base: process.env.BASE_URL,
  <%_ } _%>
  routes
})

export default router
