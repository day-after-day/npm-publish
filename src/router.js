import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


const Main =  resolve => require(['./pages/index.vue'], resolve);

const router = new Router({
    routes: [
        {path: '/', name: '主页', component: Main},
    ]
})

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: router
})
