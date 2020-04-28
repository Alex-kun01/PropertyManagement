<template>
    <div class="punchClock_box">
        <!-- 打卡设置 -->
        <div class="punchClock">

            <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>APP管理</el-breadcrumb-item>
                <el-breadcrumb-item>打卡设置</el-breadcrumb-item>
            </el-breadcrumb>

            <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="折叠" name="1">
                    <div class="input">
                        <div class="pun_item">
                        <span>经度:</span>
                        <el-input v-model="editPunchFrom.longitude" placeholder="经度"></el-input>
                        </div>
                        <div class="pun_item">
                            <span>纬度:</span>
                            <el-input v-model="editPunchFrom.latitude" placeholder="纬度"></el-input>
                        </div>
                        <div class="pun_item">
                            <span>范围:</span>
                            <el-input v-model="editPunchFrom.limit" placeholder="范围"></el-input>
                        </div>
                        <div class="pun_item">
                            <span>上班时间:</span>
                            <el-input v-model="editPunchFrom.morningTime" placeholder="上班时间"></el-input>
                        </div>
                        <div class="pun_item">
                            <span>下班时间:</span>
                            <el-input v-model="editPunchFrom.evevingTime" placeholder="下班时间"></el-input>
                        </div>
                        <div class="pun_item">
                            <span></span>
                            <el-button @click="editBtn" style="width: 300px" type="primary">修改</el-button>
                        </div>
                        
                    </div>
                </el-collapse-item>
            </el-collapse>

        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            activeName: '1',
            editPunchFrom: {
                longitude: '',
                latitude: '',
                limit:'',
                morningTime:'',
                evevingTime:''
            }
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        async getData(){
            const {data: res} = await this.$http.post('/clockLocation/getClock', null, {})
            console.log(res)
            if(res.data){
                this.editPunchFrom = res.data
                this.$message({
                    message: '当前数据已刷新',
                    type: 'success'
                })
        }
            
        },
        editBtn(){

            if(this.editPunchFrom.morningTime.length == 7 || this.editPunchFrom.morningTime.length == 8){
                this.$confirm('该操作将修改打卡设置，是否继续？').then(()=>{
                        this.$http.post('/clockLocation/setting', null, { params: this.editPunchFrom }).then(res =>{
                            console.log(res)
                            if(res.data.code ==1000){
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                })
                                this.getData()
                            }else{
                                this.$message({
                                    message: '修改失败',
                                    type: 'danger'
                                })
                            }
                        })
                    }).catch(()=>{
                        this.$message('已取消')
                    })
            }else{
                this.$confirm('上班/下班时间必须为 xx:xx:xx 格式！ 例：9:00:00 / 12:00:00 ').then(()=>{
                    
                }).catch(()=>{

                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
    html,
    body{
        width: 100%;
        height: 100%;
        .punchClock_box{
            width: 100%;
            height: 100%;
            overflow: scroll;
            .punchClock{
                width: 100%;
                height: 100%;
                
                .el-collapse-item{
                    .input{
                        .pun_item{
                            display: flex;
                            align-items: center;
                            margin-bottom: 20px;
                            span{
                                display: inline-block;
                                width: 100px;
                                text-align: right;
                                margin-right: 10px;
                                color: #777;
                                font-weight: bold;
                            }
                            .el-input{
                                width: 300px;
                            }
                        }
                }
                }
                
                .paging{
                    display: flex;
                    justify-content: center;
                    margin: 10px 0;
                }

            }
        }
    }
</style>