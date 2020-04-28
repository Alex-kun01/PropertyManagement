import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/IndexPage'
import LoginPage from '@/pages/LoginPage'

// 二级路由
import OvnerPage from '@/components/user/OvnerPage'
import PolicePage from '@/components/user/PolicePage'
import EditionPage from '@/components/system/EditionPage'
import StorBuilder from '@/components/hose/StorBuilder'
import AdList from '@/components/app/AdList'
import OvnerRotion from '@/components/app/OvnerRotion'
import PoliceRotion from '@/components/app/PoliceRotion'
import ToUpdate from '@/components/app/ToUpdate'
// import UserApplication from '@/components/user/UserApplication'
import RepairList from '@/components/hose/RepairList'
import AdSet from '@/components/access/AdSet'
import FaceSet from '@/components/access/FaceSet'
import OpeningRecord from '@/components/access/OpeningRecord'
import PunchClock from '@/components/app/PunchClock'
import GarbageCharge from '@/components/finance/GarbageCharge'
import ParkingRate from '@/components/finance/ParkingRate'
import PropertyFee from '@/components/finance/PropertyFee'
import PropertySet from '@/components/finance/PropertySet'
import ServicePhone from '@/components/system/ServicePhone'
import HousingShen from '@/components/hose/HousingShen'
import AnnounCement from '@/components/app/AnnounCement'
import CommunityActivity from '@/components/app/CommunityActivity'
import YunIntercom from '@/components/access/YunIntercom'
import AppFace from '@/components/access/AppFace'
import FaceCamera from '@/components/access/FaceCamera'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/index',
            name: 'index',
            component: IndexPage,
            children: [{
                    path: 'ovnerpage',
                    name: 'ovnerpage',
                    component: OvnerPage
                },
                {
                    path: 'policePage',
                    name: 'policePage',
                    component: PolicePage
                },
                {
                    path: 'editionpage',
                    name: 'editionpage',
                    component: EditionPage
                },
                {
                    path: 'storbuilder',
                    name: 'storbuilder',
                    component: StorBuilder
                },
                {
                    path: 'adlist',
                    name: 'adlist',
                    component: AdList
                },
                {
                    path: 'ovnerrotion',
                    name: 'ovnerrotion',
                    component: OvnerRotion
                },
                {
                    path: 'policerotion',
                    name: 'policerotion',
                    component: PoliceRotion
                },
                {
                    path: 'toupdate',
                    name: 'toupdate',
                    component: ToUpdate
                },
                // {
                //     path: 'userapplication',
                //     name: 'userapplication',
                //     component: UserApplication
                // },
                {
                    path: 'repairlist',
                    name: 'repairlist',
                    component: RepairList
                },
                {
                    path: 'adset',
                    name: 'adset',
                    component: AdSet
                },
                {
                    path: 'faceset',
                    name: 'faceset',
                    component: FaceSet
                },
                {
                    path: 'openingrecord',
                    name: 'openingrecord',
                    component: OpeningRecord
                },
                {
                    path: 'punchclock',
                    name: 'punchclock',
                    component: PunchClock
                },
                // {
                //     path: 'garbagecharge',
                //     name: 'garbagecharge',
                //     component: GarbageCharge
                // },
                {
                    path: 'parkingrate',
                    name: 'parkingrate',
                    component: ParkingRate
                },
                {
                    path: 'propertyfee',
                    name: 'propertyfee',
                    component: PropertyFee
                },
                {
                    path: 'propertyset',
                    name: 'propertyset',
                    component: PropertySet
                },
                {
                    path: 'servicephone',
                    name: 'servicephone',
                    component: ServicePhone
                },
                {
                    path: 'housingshen',
                    name: 'housingshen',
                    component: HousingShen
                },
                {
                    path: 'announecment',
                    name: 'announecment',
                    component: AnnounCement
                },
                {
                    path: 'communityactivity',
                    name: 'communityactivity',
                    component: CommunityActivity
                },
                {
                    path: 'yunintercom',
                    name: 'yunintercom',
                    component: YunIntercom
                },
                {
                    path: 'appface',
                    name: 'appface',
                    component: AppFace
                },
                {
                    path: 'facecamera',
                    name: 'facecamera',
                    component: FaceCamera
                }
            ]
        },

    ]
})