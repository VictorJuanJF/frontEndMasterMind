import Vue from 'vue'
import Router from 'vue-router'
import dashboard from './views/dashboard'
import ideas from './views/navigationPages/ideas.vue'
import dailyGoals from './views/navigationPages/dailyGoals'
import timeManagment from './views/navigationPages/timeManagment'
import start from './views/navigationPages/start'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        component: dashboard,
        children: [{
                path: '/',
                name: 'inicio',
                component: start
            }, {
                path: '/ideas',
                name: 'ideas',
                component: ideas
            },
            {
                path: '/objetivos-diarios',
                name: 'dailyGoals',
                component: dailyGoals
            },
            {
                path: '/administracion-del-tiempo',
                name: 'timeManagment',
                component: timeManagment
            }
        ]
    }]
})