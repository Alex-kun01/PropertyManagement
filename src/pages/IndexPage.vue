<template>
    <div class="index_page">

        <el-container style="height: 100%">
        <el-header>
            <div class="title">
               <img src="../../static/images/logo.png">
               <!-- <img src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1618065806,14298536&fm=26&gp=0.jpg"> -->
               后台管理系统
           </div>
           <div class="number">
                <div>管理员:{{number}}</div>
                <el-button @click="endSigin" type="info" plain >退出</el-button>
           </div>
        </el-header>
        <el-container>
            <el-aside :width="isFold ? '64px' : '200px'">
                <!-- 收起菜单/展开菜单 -->
                <div class="menu_btn" @click="changeMenuLang">
                    <i class="el-icon-more"></i>
                </div>
                
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    @open="handleOpen"
                    @close="handleClose"
                    @select="select"
                    unique-opened
                    :collapse="isFold"
                    :collapse-transition="false"
                    >
                    

                    <el-submenu index="1"
                    v-if="authority.includes('财务管理') || role == 1"
                    >
                        <template slot="title">
                            <i class="el-icon-s-check"></i>
                            <span>财务管理</span>
                        </template>

                        <router-link :to="{name: 'parkingrate'}">
                            <el-menu-item index="1-1">
                                <i class="el-icon-s-flag"></i>
                                停车费
                            </el-menu-item>
                        </router-link>

                        <!-- <router-link :to="{name: 'garbagecharge'}">
                            <el-menu-item index="1-2">
                                <i class="el-icon-delete-solid"></i>
                                垃圾管理费
                            </el-menu-item>
                        </router-link> -->

                        <router-link :to="{name: 'propertyfee'}">
                            <el-menu-item index="1-3">
                                <i class="el-icon-guide"></i>
                                物业费
                            </el-menu-item>
                        </router-link>

                        <router-link :to="{name: 'propertyset'}">
                            <el-menu-item index="1-4">
                                <i class="el-icon-thumb"></i>
                                物业费设置
                            </el-menu-item>
                        </router-link>

                        <router-link :to="{name: 'motorvhicletool'}">
                            <el-menu-item index="1-5">
                                <i class="el-icon-c-scale-to-original"></i>  
                                机动车收费标准
                            </el-menu-item>
                        </router-link>

                        <router-link :to="{name: 'costcategory'}">
                            <el-menu-item index="1-6">
                                <i class="el-icon-info"></i>  
                                费用类别设置
                            </el-menu-item>
                        </router-link>

                        <router-link :to="{name: 'arrearsdetails'}">
                            <el-menu-item index="1-7">
                                <i class="el-icon-s-finance"></i>  
                                欠费明细
                            </el-menu-item>
                        </router-link>

                        <router-link :to="{name: 'advancepayment'}">
                            <el-menu-item index="1-8">
                                <i class="el-icon-s-marketing"></i>  
                                预交费管理
                            </el-menu-item>
                        </router-link> 
                        
                        <router-link :to="{name: 'livingexpenses'}">
                            <el-menu-item index="1-9">
                                <i class="el-icon-s-help"></i>  
                                生活费管理
                            </el-menu-item>
                        </router-link> 

                        <router-link :to="{name: 'ticketlist'}">
                            <el-menu-item index="1-10">
                                <i class="el-icon-edit-outline"></i>  
                                票据管理
                            </el-menu-item>
                        </router-link> 
                            
                        
                    </el-submenu>

                    <el-submenu index="2"
                    v-if="authority.includes('用户管理') || role == 1"
                    >
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>用户管理</span>
                        </template>
                           <router-link :to="{name: 'ovnerpage'}"><el-menu-item index="2-1">
                               <i class="el-icon-s-grid"></i>
                               业主列表
                               </el-menu-item></router-link>
                            <router-link :to="{name: 'policePage'}"><el-menu-item index="2-2">
                                <i class="el-icon-s-flag"></i>
                                保安列表
                                </el-menu-item></router-link>
                                <router-link :to="{name: 'policerepair'}"><el-menu-item index="2-2">
                                <i class="el-icon-s-flag"></i>
                                保安报修
                                </el-menu-item></router-link>
                        
                    </el-submenu>

                    <el-submenu index="3"
                    v-if="authority.includes('房屋管理') || role == 1"
                    >
                        <template slot="title">
                            <i class="el-icon-s-home"></i>
                            <span>房屋管理</span>
                        </template>
                            <router-link :to="{name: 'storbuilder'}"><el-menu-item index="3-1">
                                <i class="el-icon-office-building"></i>
                                房屋列表
                                </el-menu-item></router-link>

                            <router-link :to="{name: 'repairlist'}">
                                <el-menu-item index="3-2" id="showyuan">
                                    <i class="el-icon-brush"></i>
                                    报修列表
                                    <div class="yuan"
                                    v-if="isRedDianShow"
                                    ></div>
                                </el-menu-item>
                            </router-link>


                            <router-link :to="{name: 'housingshen'}"><el-menu-item index="3-3">
                                <i class="el-icon-school"></i>
                                房屋审核
                            </el-menu-item></router-link>
                    </el-submenu>

                    <el-submenu index="4"
                     v-if="authority.includes('系统消息') || role == 1"
                    >
                        <template slot="title">
                            <i class="el-icon-cpu"></i>
                            <span>系统消息</span>
                        </template>
                            
                            <router-link :to="{name: 'servicephone'}"><el-menu-item index="4-1">
                                <i class="el-icon-phone"></i>
                                服务电话
                                </el-menu-item></router-link>
                        
                    </el-submenu>

                    <el-submenu index="5"
                    v-if="authority.includes('APP管理') || role == 1"
                    >
                        <template slot="title">
                            <i class="el-icon-mobile-phone"></i>
                            <span>APP管理</span>
                        </template>

                            <router-link :to="{name: 'ovnerrotion'}"><el-menu-item index="5-1">
                                <i class="el-icon-price-tag"></i>
                                业主轮播图
                                </el-menu-item></router-link>

                            <router-link :to="{name: 'policerotion'}"><el-menu-item index="5-2">
                                <i class="el-icon-s-opportunity"></i>
                                保安轮播图
                                </el-menu-item></router-link>

                            <router-link :to="{name: 'editionpage'}"><el-menu-item index="5-4">
                                <i class="el-icon-news"></i>
                                版本管理
                                </el-menu-item></router-link>

                                <router-link :to="{name: 'punchclock'}"><el-menu-item index="5-5">
                                <i class="el-icon-timer"></i>
                                打卡设置
                                </el-menu-item></router-link>

                                <router-link :to="{name: 'announecment'}"><el-menu-item index="5-6">
                                <i class="el-icon-reading"></i>
                                公告设置
                                </el-menu-item></router-link>

                                <router-link :to="{name: 'communityactivity'}"><el-menu-item index="5-7">
                                <i class="el-icon-basketball"></i>
                                社区活动
                                </el-menu-item></router-link>
                                
                    </el-submenu>

                    <el-submenu index="6"
                    v-if="authority.includes('门禁管理') || role == 1"
                    >
                        <template slot="title">
                            <i class="el-icon-message-solid"></i>
                            <span>门禁管理</span>
                        </template>
                        
                        <router-link :to="{name: 'adset'}"><el-menu-item index="6-1">
                                <i class="el-icon-s-platform"></i>
                                广告设置
                                </el-menu-item></router-link>

                                <router-link :to="{name: 'faceset'}"><el-menu-item index="6-2">
                                <i class="el-icon-view"></i>
                                人脸设置
                                </el-menu-item></router-link>

                                <router-link :to="{name: 'openingrecord'}"><el-menu-item index="6-3">
                                <i class="el-icon-bank-card"></i>
                                开门记录
                                </el-menu-item></router-link>

                                <router-link :to="{name: 'yunintercom'}"><el-menu-item index="6-4">
                                <i class="el-icon-bank-card"></i>
                                云对讲设备
                                </el-menu-item></router-link>
                                
                                <router-link :to="{name: 'appface'}"><el-menu-item index="6-5">
                                <i class="el-icon-bank-card"></i>
                                人脸审核
                                </el-menu-item></router-link>
                        
                    </el-submenu>

                    <el-submenu index="7"
                    v-if="authority.includes('车辆管理') || role == 1"


                    >
                        <template slot="title">
                            <i class="el-icon-truck"></i>
                            <span>车辆管理</span>
                        </template>
                        <router-link :to="{name: 'maneuvercar'}"><el-menu-item index="7-1">
                                <i class="el-icon-truck"></i>
                                机动车管理
                                </el-menu-item></router-link>
                            <router-link :to="{name: 'notmaneuvercar'}"><el-menu-item index="7-2">
                                <i class="el-icon-bicycle"></i>
                                非机动车管理
                                </el-menu-item></router-link>

                                 <router-link :to="{name: 'parkingset'}"><el-menu-item index="7-3">
                                <i class="el-icon-odometer"></i>
                                    停车场管理
                                </el-menu-item></router-link>
                            
                    </el-submenu>

                    <el-submenu index="8"
                     v-if="authority.includes('硬件管理') || role == 1"
                    >
                        <template slot="title">
                            <i class="el-icon-connection"></i>
                            <span>硬件管理</span>
                        </template>
                        <router-link :to="{name: 'snapshotcamera'}"><el-menu-item index="8-1">
                                <i class="el-icon-camera-solid"></i>
                                抓拍摄像头
                                </el-menu-item></router-link>
                            <router-link :to="{name: 'othercamera'}"><el-menu-item index="8-2">
                                <i class="el-icon-camera"></i>
                                其他摄像头
                                </el-menu-item></router-link>
                            
                    </el-submenu>

                    <el-submenu index="9"
                    v-if="authority.includes('权限管理') || role == 1"
                    >
                        <template slot="title">
                            <i class="el-icon-postcard"></i>
                            <span>权限管理</span>
                        </template>
                        <router-link :to="{name: 'companyset'}"><el-menu-item index="9-1">
                                <i class="el-icon-takeaway-box"></i>
                                公司管理
                                </el-menu-item></router-link>
                        <router-link :to="{name: 'menuset'}"><el-menu-item index="9-2">
                            <i class="el-icon-document-copy"></i>
                            菜单管理
                            </el-menu-item></router-link>  

                        <router-link :to="{name: 'systemuser'}"><el-menu-item index="9-3">
                            <i class="el-icon-files"></i>
                            系统用户
                            </el-menu-item></router-link>

                            <router-link :to="{name: 'rolesset'}"><el-menu-item index="9-4">
                            <i class="el-icon-attract"></i>
                            角色管理
                            </el-menu-item></router-link>
                            
                    </el-submenu>


                    </el-menu>
            </el-aside>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
    data (){
        return {
            number: '',
            isFold: false, // 菜单是否折叠
            authority: [], //  权限
            role: 1, // 超级管理员
            isRedDianShow: false, // 是否显示红点 
            websock: null, 
        }
    },
    created() {
      this.init();
    },
    destroyed() {
    //   this.websock.close() //离开路由之后断开websocket连接
    },
    mounted() {
        this.number = window.localStorage.getItem('userName')
        // 获取权限数据
       let arr = window.localStorage.getItem('authority')
       let newRole = window.localStorage.getItem('role')
       this.role = newRole
       console.log('超级管理员', this.role)
       let newArr = arr.split(',')
        this.authority = newArr
       console.log('获取到的权限数据', newArr)
       console.log('查看权限是否存在',newArr.includes('财务管理'))
    },
    methods: {
        init() { //    192.168.31.142:8091
            let url = 'ws://47.108.80.252:8091/imserver'
            // 创建websocket连接
            this.websock = new WebSocket(url);
        　　　　// 监听打开
            this.websock.onopen= this.websockOpen;
        　　　　// 监听关闭
            this.websock.onclose = this.websockClose;
        　　　　//监听异常
            this.websock.onerror = this.websockError;
        　　　　//监听服务器发送的消息
            this.websock.onmessage = this.websockMessage;
        },
        websockOpen(e){
            console.log('监听打开', e)
            let data = {
                userName: window.localStorage.getItem('userName')
            }
            console.log('this.websock',this.websock, data)
            this.websock.send(JSON.stringify(data))
        },
        websockClose(){
            console.log('监听关闭')
        },
        websockError(){
         console.log('监听异常')
        },
        websockMessage(e){
            console.log('监听服务器发送的消息',JSON.parse(e.data))
            if(JSON.parse(e.data).message == "有业主报修待处理"){
                this.isRedDianShow = true
            }else{
                this.isRedDianShow = false
            }
        },

        // 选中菜单
        select(index){
            console.log('选中',index)
            // 改变是否查看报修列表
            // if(index == '3-2'){
            //     this.isRedDianShow = false
            // }
        },
        // 管理菜单
        handleClose(index){
            console.log(index)
        },
        // 打开菜单
        handleOpen(index){
            console.log(index)
        },
        // 退出当前账号
        endSigin(){
            this.$confirm('确认退出吗？').then(() =>{
                window.localStorage.removeItem('userName')
                window.localStorage.removeItem('password')
                window.localStorage.removeItem('authority')
                window.localStorage.removeItem('role')
                this.$router.push({path: '/'})
            }).catch(() =>{
                this.$message({
                    message: '已取消',
                    type: 'info'
                })
            })
        },
        // 
        changeMenuLang(){
            this.isFold = !this.isFold
        }
    }
}
</script>
<style lang="less" scoped>
*{
    padding: 0;
    margin: 0;
}
a{
    color: #999;
    text-decoration: none;
}
html,
body{
    width: 100%;
    height: 100%;
    #showyuan{
        position: relative;
        .yuan{
            width: 10px;
            height: 10px;
            background: red;
            border-radius: 50%;
            position: absolute;
            right: 5px;
            top: calc(50% - 5px);
        }
    }

    .index_page{
        height: 100%;
        .el-container{
            height: 90%;
            .el-header{
                background-color: #545c60;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                color: #ffffff;
                padding: 0 20px;
                .title{
                    display: flex;
                    align-items: center;
                }
                .number{
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    color: #999;
                    .el-button{
                        margin-left: 10px;
                    }
                }
                img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
            }
            .el-aside{
                height: 100%;
                background-color: #545c60;
                .menu_btn{
                    height: 20px;
                    background-color: #999;
                    display: flex;
                    justify-content: center;
                    cursor: pointer;
                }
                .el-menu{
                    border-right: none;
                }
            }
            .el-main{
                height: 100%;
                box-sizing: border-box;
                padding: 10px;
            }
        }
    }
}

</style>