import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

Vue.use(Router);

const layout = r => require.ensure([], () => r(require('../views/layout/layout')), 'layout');
const home = r => require.ensure([], () => r(require('../views/home/home')), 'home');
const articleList = r => require.ensure([], () => r(require('../views/articleList/articleList')), 'articleList');
const management = r => require.ensure([], () => r(require('../views/management/management')), 'management');
const articleDetail = r => require.ensure([], () => r(require('../views/articleList/articleDetail')), 'articleDetail');

const routes = [{
    path: '/',
    component: layout,
    children: [
        {
            path: '',
            redirect: '/home'
        },
        {
            path: '/home',
            component: home
        },
        {
            path: '/articleList',
            component: articleList
        },
        {
            path: '/articleDetail',
            component: articleDetail
        },
        {
            path: '/management',
            component: management,
            meta: { requiresAuth: true }
        }


    ]
}]

const router =  new Router({
    routes,
    scrollBehavior: () => ({ y: 0 })
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.isLogin) {
            next();
        } else {
            store.commit('SET_OPENDIALOG', true);
        }
    } else {
        next();
    }
});

export default router;
