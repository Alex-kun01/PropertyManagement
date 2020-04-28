<template>
    <div class="serverPhone_box">
        <!-- 服务电话 -->

        <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统消息</el-breadcrumb-item>
                <el-breadcrumb-item>服务电话</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="edit_btn">
                <el-input v-model="editPhone" type="text" placeholder="此处修改服务电话"></el-input>
                <el-button @click="editPhoneOk" type="info">修改</el-button>
            </div>
        <div class="serverPhone">
            
            <div class="phone">
                服务电话：{{phone}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            phone: '',
            editPhone: ''
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        async getData(){
           const {data: res} = await this.$http.post('/dictionary/gainServicePhone', null, {})
           console.log(res.msg)
           if(res.code == 1001){
               this.phone = res.msg
           }else{
               this.$message({
                   message: '数据请求失败',
                   type: 'danger'
               })
           }
        },

        // 修改密码
        editPhoneOk(){
            this.$confirm('您当前操作将修改服务密码，是否继续？').then(() =>{
                if(this.editPhone){
                    this.$http.post('/dictionary/editServicePhone', null, {params: {servicePhone: this.editPhone}}).then(res =>{
                        console.log(res)
                        if(res.data.code == 1001){
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                })
                            this.getData()
                            this.editPhone = ''
                        }else{
                            this.$message({
                                message: '修改失败',
                                type: 'danger'
                            }) 
                        }
                        
                    })
                    
                }else{
                   this.$message({
                    message: '请填写正确的号码',
                    type: 'danger'
                }) 
                }
            }).catch(() =>{
                this.$message({
                    message: '已取消',
                    type: 'info'
                })
            })
        }
    }
}
</script>
<style lang="less" scoped>
    html,
    body{
        width: 100%;
        height: 100%;
        .serverPhone_box{
            width: 100%;
            height: 100%;
            overflow: scroll;
            .edit_btn{
                width: 300px;
                display: flex;
                .el-input{
                    margin-right: 10px;
                }
            }
            .serverPhone{
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                box-sizing: border-box;
                padding-top: 100px;
                .phone{
                    font-size: 22px;
                    color: #666;

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