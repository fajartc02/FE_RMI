console.log('router/index.js')
import { createRouter, createWebHashHistory, Route } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
import DefaultLayoutStandAlone from '@/standalone/layouts/DefaultLayoutStandAlone'
/*define const other in here*/

console.log(process.env.VUE_APP_STANDALONE_SINGLE_SPA)
const routes = [{
        path: '/',
        name: 'Home',
        component: process.env.VUE_APP_STANDALONE_SINGLE_SPA === 'true' ?
            DefaultLayoutStandAlone :
            DefaultLayout,
        redirect: process.env.VUE_APP_STANDALONE_SINGLE_SPA !== 'true' &&
            (!localStorage.id_token || localStorage.id_token == '') ?
            () => {
                window.location.href = process.env.dc + '/#/sc/login'
                    // return '/redirectingToLogin' // not important since redirecting
            } :
            '/dashboard-ingot',
        children: [{
                path: '/dashboard-ingot',
                name: 'Dashboard Ingot',
                component: () =>
                    import ('@/views/pages/RawMaterialCheck/Dashboard/DashboardIngot'),
            },
            {
                path: '/dashboard-sand',
                name: 'Dashboard Sand',
                component: () =>
                    import ('@/views/pages/RawMaterialCheck/Dashboard/DashboardSand'),
            },
            {
                path: '/inspection/ingot/vendor',
                name: 'InspectionIngotVendor',
                component: () =>
                    import (
                        '@/views/pages/RawMaterialCheck/IngotScreen/InspectionIngotVendor'
                    ),
            },
            {
                path: '/inspection/ingot/internal',
                name: 'InspectionIngotInternal',
                component: () =>
                    import (
                        '@/views/pages/RawMaterialCheck/IngotScreen/InspectionIngotInternal'
                    ),
            },
            {
                path: '/inspection/ingot/historical',
                name: 'HistoricalIngot',
                component: () =>
                    import ('@/views/pages/RawMaterialCheck/IngotScreen/HistoricalIngot'),
            },
            {
                path: '/inspection/sand/internal',
                name: 'InspectionSandInternal',
                component: () =>
                    import (
                        '@/views/pages/RawMaterialCheck/SandScreen/InspectionSandInternal'
                    ),
            },
            {
                path: '/inspection/sand/historical',
                name: 'HistoricalSand',
                component: () =>
                    import ('@/views/pages/RawMaterialCheck/SandScreen/HistoricalSand'),
            },
            {
                path: '/master/line',
                name: 'MasterLine',
                component: () =>
                    import ('@/views/pages/RawMaterialCheck/Master/MasterLinePage.vue'),
            },
            {
                path: '/master/mesin',
                name: 'MasterMesin',
                component: () =>
                    import ('@/views/pages/RawMaterialCheck/Master/MasterMesinPage.vue'),
            },
            {
                path: '/master/gauge',
                name: 'MasterGauge',
                component: () =>
                    import ('@/views/pages/RawMaterialCheck/Master/MasterGaugePage.vue'),
            },
            {
                path: '/master/element-standard/ingot',
                name: 'MasterElementStandardIngot',
                component: () =>
                    import (
                        '@/views/pages/RawMaterialCheck/Master/MasterStandardIngotPage.vue'
                    ),
            },
            {
                path: '/master/element-standard/sand',
                name: 'MasterElementStandardSand',
                component: () =>
                    import (
                        '@/views/pages/RawMaterialCheck/Master/MasterStandardSandPage.vue'
                    ),
            },
            {
                path: '/master/shift',
                name: 'MasterShift',
                component: () =>
                    import ('@/views/pages/RawMaterialCheck/Master/MasterShiftPage.vue'),
            },
            {
                path: '/master/user',
                name: 'MasterUser',
                component: () =>
                    import ('@/views/pages/RawMaterialCheck/Master/MasterUserPage.vue'),
            },
            {
                path: '/master/system',
                name: 'MasterSystem',
                component: () =>
                    import ('@/views/pages/RawMaterialCheck/Master/MasterSystemPage.vue'),
            },
            {
                path: '/master/vendor',
                name: 'MasterVendor',
                component: () =>
                    import ('@/views/pages/RawMaterialCheck/Master/MasterVendorPage.vue'),
            },
            {
                path: '/master/element/ingot',
                name: 'MasterIngot',
                component: () =>
                    import ('@/views/pages/RawMaterialCheck/Master/MasterIngotPage.vue'),
            },
            {
                path: '/master/element/sand',
                name: 'MasterSand',
                component: () =>
                    import ('@/views/pages/RawMaterialCheck/Master/MasterSandPage.vue'),
            },
        ],
    },
    {
        path: '/404',
        name: 'Page404',
        component: () =>
            import ('@/views/pages/Page404'),
    },
    {
        path: '/500',
        name: 'Page500',
        component: () =>
            import ('@/views/pages/Page500'),
    },
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        // always scroll to top
        return { top: 0 }
    },
})

export default router