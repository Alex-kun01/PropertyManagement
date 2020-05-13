<template>
    <div class="parking_box">
        <!-- 查看云对讲设备 -->
        <div class="parking">
            <el-breadcrumb
                style="margin-bottom: 10px;"
                separator-class="el-icon-arrow-right"
                >
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>门禁管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name: 'yunintercom'}">云对讲设备</el-breadcrumb-item>
                <el-breadcrumb-item>查看设备</el-breadcrumb-item>
            </el-breadcrumb>

            <!-- <el-button style="margin-buttom:10px" type="primary">新增</el-button> -->
 
            <template>
                <el-table :data="showList" border style="width: 100%">
                <el-table-column
                    prop="eId"
                    label="设备ID"
                    align="center"
                ></el-table-column>

                <el-table-column
                    prop="eNum"
                    align="center"
                    label="设备编号"
                ></el-table-column>

                <el-table-column
                    prop="location"
                    align="center"
                    label="设备名称"
                ></el-table-column>

                <el-table-column
                    align="center"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="primary" @click="edit(scope.row)" size="mini">编辑</el-button>
                        <!-- <el-button type="danger" size="mini">删除</el-button> -->
                    </template>
                </el-table-column>

                </el-table>
            </template>

            <!-- 编辑对话框 -->
        <el-dialog
            title="修改设备名称"
            :visible.sync="isAddPolice"
            width="30%"
            :before-close="handleClose">

                <el-form :model="addpoliceForm"  :rules='addpoliceRules' ref="addpoliceRef" label-width="100px" class="addpolice_from">
                    <el-form-item
                    label="设备编号"
                    prop="eNum"
                    >
                        <el-input disabled type="pAccount" v-model="addpoliceForm.eNum" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item
                    label="设备名称"
                    prop="location"
                    >
                        <el-input type="pPassword" v-model="addpoliceForm.location" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item
                    label="备注"
                    prop="note"
                    >
                        <el-input type="pPassword" v-model="addpoliceForm.note" autocomplete="off"></el-input>
                    </el-form-item>

                </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="quxiao('addpoliceRef')">取 消</el-button>
                <el-button type="primary" @click="addPoliceOk('addpoliceRef')">提交</el-button>
            </span>
        </el-dialog>

            <!-- 分页 -->
            <div class="paging">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="current"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            total: 0,
            current: 1,
            size: 10,
            data: {}, // 接受参数
            showList: [], // 渲染数据
            isAddPolice: false, 
            addpoliceForm: {
                key: 'e098214294ad13f23e16ae5ebecf970d',
                token:'1bbd886460827015e5d605ed44252251',
                eNum: '',
                location: '',
                note: ''
            },
            addpoliceRules:{
                eNum: [
                   { required: true, message: '设备编号不能为空', trigger: 'blur' },
                ],
                location: [
                   { required: true, message: '设备名称不能为空', trigger: 'blur' },
                ],
            }
        }
    },
    mounted(){
        this.data = this.$route.params.data
        console.log('接受参数', this.data)
        this.getData()
    },
    methods:{
       async getData(){
           const { data: res } = await this.$http.post('http://www.hbzayun.com/ACSystem/findEquip', null, { params: this.data })
           console.log('查看设备返回数据', res)
           if(res.code == 200){
               this.showList = res.extend.data.list
               this.total = res.extend.data.total
           }
        },
        handleSizeChange(newSize){
            this.size = newSize
            this.getData()
        },
        handleCurrentChange(newCurrent){
            this.current = newCurrent
            this.getData()
        },
        handleClose(formName){
            this.isAddPolice = false
        },
        edit(scope){
            this.addpoliceForm.eNum = scope.eNum
            this.addpoliceForm.location = scope.location
            this.isAddPolice = true
        },
        quxiao(formName){
            this.isAddPolice = false
            this.$refs[formName].resetFields();
        },
        addPoliceOk(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
              
              // 请求
                this.$http.post('http://www.hbzayun.com/ACSystem/updateEquipAttributewithNotification', null, { params: this.addpoliceForm }).then(res =>{
                    console.log('修改设备名称', res)
                    if(res.data.code == 200){
                        this.isAddPolice = false
                        this.getData()
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        this.$refs[formName].resetFields();
                    }
                })

            } else {
                this.$message({
                    message: 'Error',
                    type: 'warning'
                })
                return false;
            }
            });
        },

        
    },
    
}
</script>
<style lang="less" scoped>
    html,
    body{
        width: 100%;
        height: 100%;
        .parking_box{
            width: 100%;
            height: 100%;
            overflow: scroll;
            .parking{
                width: 100%;
                height: 100%;
                
                .paging{
                    display: flex;
                    justify-content: center;
                    margin: 10px 0;
                }

            }
        }
    }
</style>