import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/IndexPage'
import LoginPage from '@/pages/LoginPage'
import ShowPage from '@/pages/Showpage'
import BillPage from '@/pages/BillPage'

// 二级路由
import OvnerPage from '@/components/user/OvnerPage'
import PoliceRepair from '@/components/user/PoliceRepair'
import FirstShow from '@/components/user/FirstShow'
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
import TicketList from '@/components/finance/TicketList'
import livingExpenses from '@/components/finance/livingExpenses'
import CostCategory from '@/components/finance/CostCategory'
import AdvancePayment from '@/components/finance/AdvancePayment'
import UsageDetails from '@/components/finance/UsageDetails'
import ArrearsDetails from '@/components/finance/ArrearsDetails'
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
import ManeuverCar from '@/components/carset/ManeuverCar'
import NotmaneuverCar from '@/components/carset/NotmaneuverCar'
import YunIntercomsee from '@/components/access/YunIntercomsee'
import OtherCamera from '@/components/hardware/OtherCamera'
import SnapshotCamera from '@/components/hardware/SnapshotCamera'
import MotorvhicleTool from '@/components/finance/MotorvhicleTool'
import CompanySet from '@/components/hardware/CompanySet'
import MenuSet from '@/components/hardware/MenuSet'
import SystemUser from '@/components/hardware/SystemUser'
import RolesSet from '@/components/hardware/RolesSet'

import ParkingSet from '@/components/carset/ParkingSet'



Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: LoginPage,
            meta: {
                role: '登录'
            }
        },
        {
            path: '/showpage',
            name: 'showpage',
            component: ShowPage,
            meta: {
                role: '首页'
            }
        },
        {
            path: '/billpage',
            name: 'billpage',
            component: BillPage,
            meta: {
                role: '票据'
            }
        },
        {
            path: '/index',
            name: 'index',
            component: IndexPage,
            children: [{
                    path: 'firstshow',
                    name: 'irstshow',
                    component: FirstShow,
                    meta: {
                        role: '首页'
                    }
                },

                {
                    path: 'policePage',
                    name: 'policePage',
                    component: PolicePage,
                    meta: {
                        role: '用户管理'
                    }
                },
                {
                    path: 'ovnerpage',
                    name: 'ovnerpage',
                    component: OvnerPage,
                    meta: {
                        role: '用户管理'
                    }
                },
                {
                    path: 'editionpage',
                    name: 'editionpage',
                    component: EditionPage,
                    meta: {
                        role: 'APP管理'
                    }
                },
                {
                    path: 'storbuilder',
                    name: 'storbuilder',
                    component: StorBuilder,
                    meta: {
                        role: '房屋管理'
                    }
                },
                {
                    path: 'adlist',
                    name: 'adlist',
                    component: AdList,
                    meta: {
                        role: 'APP管理'
                    }
                },
                {
                    path: 'ovnerrotion',
                    name: 'ovnerrotion',
                    component: OvnerRotion,
                    meta: {
                        role: 'APP管理'
                    }
                },
                {
                    path: 'policerotion',
                    name: 'policerotion',
                    component: PoliceRotion,
                    meta: {
                        role: 'APP管理'
                    }
                },
                {
                    path: 'toupdate',
                    name: 'toupdate',
                    component: ToUpdate,
                    meta: {
                        role: '管理'
                    }
                },
                // {
                //     path: 'userapplication',
                //     name: 'userapplication',
                //     component: UserApplication
                // },
                {
                    path: 'repairlist',
                    name: 'repairlist',
                    component: RepairList,
                    meta: {
                        role: '房屋管理'
                    }
                },
                {
                    path: 'adset',
                    name: 'adset',
                    component: AdSet,
                    meta: {
                        role: '门禁管理'
                    }
                },
                {
                    path: 'faceset',
                    name: 'faceset',
                    component: FaceSet,
                    meta: {
                        role: '门禁管理'
                    }
                },
                {
                    path: 'openingrecord',
                    name: 'openingrecord',
                    component: OpeningRecord,
                    meta: {
                        role: '门禁管理'
                    }
                },
                {
                    path: 'punchclock',
                    name: 'punchclock',
                    component: PunchClock,
                    meta: {
                        role: 'APP管理'
                    }
                },
                // {
                //     path: 'garbagecharge',
                //     name: 'garbagecharge',
                //     component: GarbageCharge
                // },
                {
                    path: 'parkingrate',
                    name: 'parkingrate',
                    component: ParkingRate,
                    meta: {
                        role: '财务管理'
                    }
                },
                {
                    path: 'propertyfee',
                    name: 'propertyfee',
                    component: PropertyFee,
                    meta: {
                        role: '财务管理'
                    }
                },
                {
                    path: 'propertyset',
                    name: 'propertyset',
                    component: PropertySet,
                    meta: {
                        role: '财务管理'
                    }
                },
                {
                    path: 'servicephone',
                    name: 'servicephone',
                    component: ServicePhone,
                    meta: {
                        role: '系统消息'
                    }
                },
                {
                    path: 'housingshen',
                    name: 'housingshen',
                    component: HousingShen,
                    meta: {
                        role: '房屋管理'
                    }
                },
                {
                    path: 'announecment',
                    name: 'announecment',
                    component: AnnounCement,
                    meta: {
                        role: 'APP管理'
                    }
                },
                {
                    path: 'communityactivity',
                    name: 'communityactivity',
                    component: CommunityActivity,
                    meta: {
                        role: 'APP管理'
                    }
                },
                {
                    path: 'yunintercom',
                    name: 'yunintercom',
                    component: YunIntercom,
                    meta: {
                        role: '门禁管理'
                    }
                },
                {
                    path: 'appface',
                    name: 'appface',
                    component: AppFace,
                    meta: {
                        role: '门禁管理'
                    }
                },
                {
                    path: 'facecamera',
                    name: 'facecamera',
                    component: FaceCamera,
                    meta: {
                        role: '门禁管理'
                    }
                },
                {
                    path: 'maneuvercar',
                    name: 'maneuvercar',
                    component: ManeuverCar,
                    meta: {
                        role: '车辆管理'
                    }
                }, {
                    path: 'notmaneuvercar',
                    name: 'notmaneuvercar',
                    component: NotmaneuverCar,
                    meta: {
                        role: '车辆管理'
                    }
                },
                {
                    path: 'yunintercomsee',
                    name: 'yunintercomsee',
                    component: YunIntercomsee,
                    meta: {
                        role: '门禁管理'
                    }
                },
                {
                    path: 'snapshotcamera',
                    name: 'snapshotcamera',
                    component: SnapshotCamera,
                    meta: {
                        role: '硬件管理'
                    }
                },
                {
                    path: 'othercamera',
                    name: 'othercamera',
                    component: OtherCamera,
                    meta: {
                        role: '硬件管理'
                    }
                },
                {
                    path: 'motorvhicletool',
                    name: 'motorvhicletool',
                    component: MotorvhicleTool,
                    meta: {
                        role: '财务管理'
                    }
                },
                {
                    path: 'companyset',
                    name: 'companyset',
                    component: CompanySet,
                    meta: {
                        role: '权限管理'
                    }
                },
                {
                    path: 'systemuser',
                    name: 'systemuser',
                    component: SystemUser,
                    meta: {
                        role: '权限管理'
                    }
                },
                {
                    path: 'menuset',
                    name: 'menuset',
                    component: MenuSet,
                    meta: {
                        role: '权限管理'
                    }
                },
                {
                    path: 'rolesset',
                    name: 'rolesset',
                    component: RolesSet,
                    meta: {
                        role: '权限管理'
                    }
                },
                {
                    path: 'parkingset',
                    name: 'parkingset',
                    component: ParkingSet,
                    meta: {
                        role: '车辆管理'
                    }
                },
                {
                    path: 'policerepair',
                    name: 'policerepair',
                    component: PoliceRepair,
                    meta: {
                        role: '用户管理'
                    }
                },
                {
                    path: 'costcategory',
                    name: 'costcategory',
                    component: CostCategory,
                    meta: {
                        role: '财务管理'
                    }
                },
                {
                    path: 'usagedetails',
                    name: 'usagedetails',
                    component: UsageDetails,
                    meta: {
                        role: '财务管理'
                    }
                },
                {
                    path: 'arrearsdetails',
                    name: 'arrearsdetails',
                    component: ArrearsDetails,
                    meta: {
                        role: '财务管理'
                    }
                },
                {
                    path: 'advancepayment',
                    name: 'advancepayment',
                    component: AdvancePayment,
                    meta: {
                        role: '财务管理'
                    }
                },
                {
                    path: 'livingexpenses',
                    name: 'livingexpenses',
                    component: livingExpenses,
                    meta: {
                        role: '财务管理'
                    }
                },
                {
                    path: 'ticketlist',
                    name: 'ticketlist',
                    component: TicketList,
                    meta: {
                        role: '财务管理'
                    }
                },
            ]
        },

    ]

})