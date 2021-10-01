import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            component: () =>
                import ('@/components/Main.vue'),
            // children: [{
            //     name: 'Lexiskulls',
            //     path: '/lexiskulls',
            //     component: () =>
            //         import ('@/components/lexiskulls/LexiMain.vue')
            // }]
        },
        {
            path: '/lexiskulls',
            name: 'Lexiskulls',
            component: () =>
                import ('@/components/lexiskulls/LexiMain.vue')
        }
    ]
})

export default router