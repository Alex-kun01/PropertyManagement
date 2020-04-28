<template>
    <div class="police_box">
        <div class="poice">
            <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>保安列表</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 保安管理 -->
            <div class="top_btn">
                <el-button type="primary" @click="addPoliceBtn">添加保安</el-button>
            </div>
    <template>
        <el-table
            :data="showList"
            border
            style="width: 100%">

            <!-- <el-table-column type="index" label="#"></el-table-column> -->
            <el-table-column prop="id" label="ID"  align="center"></el-table-column>
            <el-table-column prop="pAccount" label="姓名"  align="center"></el-table-column>
            <el-table-column prop="pNickName"  label="昵称" align="center"></el-table-column>
            <el-table-column prop="pHeadImg" label="头像" align="center">
                <template slot-scope="scope">
                    <img style="width: 30px; height:30px" :src="scope.row.pHeadImg">
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号" align="center" ></el-table-column>
            <!-- <el-table-column prop="pPassword" label="密码"></el-table-column> -->
            <el-table-column prop="canUse" label="账号状态" align="center" >
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.canUse" @change='switchChange(scope.row)' :active-value='1' :inactive-value='0' active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </template>
            </el-table-column>
            <el-table-column align="center" width="200" label="操作">
                <template slot-scope="scope">
                    <el-button @click="openPolice(scope.row)" type="primary" size="mini"><i class="el-icon-edit"></i>编辑</el-button>
                    <el-button @click="deletePolice(scope.row)" type="danger" size="mini"><i class="el-icon-delete"></i>删除</el-button>
                </template>
            </el-table-column>

        </el-table>
    </template>

    <!-- 分页 -->
            <div class="paging">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="current"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 新增保安对话框 -->
        <el-dialog
            title="新增保安"
            :visible.sync="isAddPolice"
            width="30%"
            :before-close="handleClose">

                <el-form :model="addpoliceForm"  :rules='addpoliceRules' ref="addpoliceRef" label-width="100px" class="addpolice_from">
                    <el-form-item
                    label="姓名"
                    prop="pAccount"
                    >
                        <el-input type="pAccount" v-model="addpoliceForm.pAccount" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item
                    label="密码"
                    prop="pPassword"
                    >
                        <el-input type="pPassword" v-model="addpoliceForm.pPassword" autocomplete="off"></el-input>
                    </el-form-item>

                </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isAddPolice = false">取 消</el-button>
                <el-button type="primary" @click="addPoliceOk('addpoliceRef')">提交</el-button>
            </span>
        </el-dialog>

        <!-- 修改 -->
        <el-dialog
        title="修改密码"
        :visible.sync="isEditPolice"
        width="30%"
        :before-close="editHandleClose">

                <el-form :model="editPoliceFrom"  :rules='edtiPoliceRules' ref="editpoliceRef" label-width="100px" class="addpolice_from">
                    <el-form-item
                    label="姓名"
                    prop="pAccount"
                    >
                        <el-input type="pAccount" disabled  v-model="editPoliceFrom.pAccount" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item
                    label="新密码"
                    prop="newPassword"
                    >
                        <el-input type="newPassword" v-model="editPoliceFrom.newPassword" autocomplete="off"></el-input>
                    </el-form-item>

                </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editPoliceNo">取 消</el-button>
                <el-button type="primary" @click="editPoliceOk">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>
<script>
import publicFun from '../../store/public.js'
export default {
    data(){
        return {
            current: 1, // 当前页
            pageSize: 10, // 一页显示条数
            total: 0, // 总共的条数
            policeList: [],
            showList: [], // 展示数据
            isAddPolice: false, // 新增保安对话框显示
            addpoliceForm: { // 新增保安数据
                pAccount: '',
                pPassword: ''
            },
            // 新增保安填写规则
            addpoliceRules: {
                pAccount: [
                    { required: true, message: '请您填写姓名', trigger: 'blur' },
                    { min: 2, max: 6, message: '名字长度在2-6之间', trigger: 'blur' }
                ],
                pPassword: [
                   { required: true, message: '请您填写密码', trigger: 'blur' },
                ]
            },
            // 修改保安信息对话框显示
            isEditPolice: false,
            // 修改保安信息数据
            editPoliceFrom: {
                policeId: '',
                newPassword: ''
            },
            // 修改保安填写规则
            edtiPoliceRules: {
                newPassword: [
                    { required: true, message: '请您填写密码', trigger: 'blur' },
                    // { min: 2, max: 6, message: '密码长度在2-6之间', trigger: 'blur' }
                ]
            }

        }
    },
    mounted() {
        this.getData();
    },
    computed: {
    },
    methods: {
        // 请求数据
        async getData(){
          const { data: res } = await this.$http.get('/policeUser/lookAllPolice')
          console.log(res)
          if(res.data){
            this.policeList = res.data
            this.total = res.data.length
            this.showList = publicFun.filterList(this.current, this.pageSize, this.policeList)

          }else{
              this.$message({
                  message: '数据请求失败',
                  type: 'danger'
              })
          }
        },
        // 每页显示条数变化
        handleSizeChange(newSize){
            this.pageSize = newSize;
            this.showList = publicFun.filterList(this.current, this.pageSize, this.policeList)
        },
        // 当前页index变化
        handleCurrentChange(newCurrent){
            this.current = newCurrent;
            this.showList = publicFun.filterList(this.current, this.pageSize, this.policeList)
        },
        // 打开新增保安对话框
        addPoliceBtn(){
            this.isAddPolice = true
        },
        // 关闭添加保安对话框
        handleClose(){
            this.isAddPolice = false
        },
        // 提交新增保安请求
        addPoliceOk(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$http.post('/policeUser/addPolice', null, { params: this.addpoliceForm }).then(res => {
                    this.getData();
                    this.isAddPolice = false;
                    this.$message({
                    message: '添加成功',
                    type: 'success'
                })
                 this.$refs[formName].resetFields();
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
        // 清空添加保安已填写数据
        resetForm(formName){
            this.$refs[formName].resetFields();
        },
        // 注销保安账号
        deletePolice(scope){
            this.$confirm(`确认注销${scope.pAccount}的账号？`).then(_ =>{
                

                this.$message({
                    message: '该功能尚未完善!',
                    type: 'info'
                })
            }).catch(_ => {
                this.$message('已取消')
            })
        },
        // 保安状态改变
        switchChange(scope){
            console.log(scope.canuse)
            // return
            let apiOpen = '/policeUser/openPolice'
            let apiClose = '/policeUser/banpolice'
            let goApi = ''
            if (scope.canUse == 0) {
                goApi = apiClose
            } else {
                goApi = apiOpen
            }
                this.$http.post(goApi, null, {params: {policeId: scope.id}}).then(res => {
                    console.log(res.data)
                    if(res.data.code >= 1000) {
                          this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                        this.getData()
                    }else{
                        this.$message({
                            message: res.data.msg,
                            type: 'danger'
                        })
                    }
                })
        },
        // 取消修改保安信息
        editPoliceNo(){ 
            this.isEditPolice = false
            this.$message({
                message: '已取消',
                type: 'info'
            })
        },
        // 确认提交修改保安信息
        editPoliceOk(){ 
            this.$http.post('/policeUser/modifyPassword', null, { params: this.editPoliceFrom }).then(res =>{
                console.log(res)
                if(res.data.code == 1000){
                    this.isEditPolice = false
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                }
            }).catch(res =>{
                this.$message({
                    message: '服务器请求出错',
                    type: 'warning'
                })
            })
        },
        // 关闭修改保安信息对话框
        editHandleClose(){
            this.isEditPolice = false
        },
        // 打开修改保安对话框
        openPolice(scope){
            this.isEditPolice = true
            this.editPoliceFrom.policeId = scope.id
            this.editPoliceFrom.pAccount = scope.pAccount 
            console.log(scope)
        }




    }
}
</script>
<style lang="less" scoped>
html,
body{
    width: 100%;
    height: 100%;
}
    .paging{
        display: flex;
        justify-content: center;
        margin: 10px 0;
    }
    .police_box{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 10px;
        overflow: scroll;
        .poice{
            width: 100%;
            height: 100%;
            
            background-color: #fff;
            .top_btn{
                margin-bottom: 10px;
            }
        }
    }
</style>