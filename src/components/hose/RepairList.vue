<template>
    <div class="repairlist_box">
        <!-- 报修列表 -->
        <div class="repair">
            
            <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>房屋管理</el-breadcrumb-item>
                <el-breadcrumb-item>报修列表</el-breadcrumb-item>
            </el-breadcrumb>

            <template>
                <el-table
                :data="repairList"
                border
                style="width: 100%">


                        <el-table-column prop="id" label="#" align="center"></el-table-column>
                        <el-table-column prop="img" label="图片" align="center">
                            <template slot-scope="scope">
                                <img style="width: 40px; height:40px;" :src="scope.row.img">
                            </template>
                        </el-table-column>
                        <el-table-column prop="isDel" label="是否删除" align="center" >
                            <template slot-scope="scope">
                                <span v-if="scope.row.isDel == 1">未删除</span>
                                <span style="color: #f00" v-if="scope.row.isDel == 0">已删除</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="reason" label="报修原因" align="center"></el-table-column>
                        <el-table-column prop="repairName" label="修理人" align="center"></el-table-column>
                        <el-table-column prop="repairNumber" label="报修编号" width="180" align="center"></el-table-column>
                        <el-table-column prop="repairTelephone" label="修理人电话" width="180" align="center"></el-table-column>
                        <el-table-column prop="repairTime" label="报修时间" width="180" align="center"></el-table-column>
                        <el-table-column prop="reportName" label="上报人" align="center"></el-table-column>
                        <el-table-column prop="reportTelephone" label="上报人电话" width="120" align="center"></el-table-column>
                        <el-table-column prop="publishTime" label="上报时间" width="180" align="center"></el-table-column>
                        <el-table-column prop="status" label="状态" align="center">
                            <template slot-scope="scope">
                                <!--   0---已提交  1---已接单   2----已修好,待评价  3----已评价 -->
                                <span v-if="scope.row.status == 0">已提交</span>
                                <span style="color: #f40;"  v-if="scope.row.status == 1">已接单</span>
                                <span style="color: #53c553;"  v-if="scope.row.status == 2">已修好,待评价</span>
                                <span style="color: #999;" v-if="scope.row.status == 3">已评价</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="userId" label="用户ID" align="center" width="0"></el-table-column>
                        <el-table-column prop="wishRepairTime" label="期望维修时间" align="center" width="180"></el-table-column>

                        <el-table-column label="操作" align="center" width="100">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="editrepair(scope.row)" size="mini"><i class="el-icon-edit"></i>处理</el-button>
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
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 处理保修单对话框 -->
        <el-dialog
        title="报修单处理"
        :visible.sync="isEditRepar"
        width="30%"
        :before-close="editHandleReparClose">

        <el-form :model="editReparFrom"  :rules='editReparRules' ref="editReparRef" label-width="100px" class="addovner_from">

            <el-form-item
                label="报修原因"
                prop="reason"
                >
                    <el-input type="reason" disabled  v-model="editReparFrom.reason" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item
                label="维修师傅"
                prop="repairName"
                >
                    <el-input type="repairName"  v-model="editReparFrom.repairName" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item
                label="师傅电话"
                prop="telephone"
                >
                    <el-input type="telephone"  v-model="editReparFrom.telephone" autocomplete="off"></el-input>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
                <el-button @click="editReparNo('editReparRef')">取 消</el-button>
                <el-button type="primary" @click="editReparOk('editReparRef')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import publicFun from '../../store/public.js'
export default {
    data(){
        return {
            size: 10,
            current: 1,
            total: 10,
            repairList: [],
            showList: [],
            isEditRepar: false, 
            editReparFrom: { // 处理报修单对话框数据
                repairId:'',
                repairName: '',
                telephone: '',
                reason: ''
            },
            editReparRules: { // 处理报修单对话框填写规则
                repairId: [{ required: true, message: '此项不能为空，请填写', trigger: 'blur' }],
                repairName: [{ required: true, message: '请填写维修师傅姓名', trigger: 'blur' }],
                telephone: [{ required: true, message: '请填写维修师傅电话', trigger: 'blur' }]
            }
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        getData(){
            this.$http.get('/repair/lookRepairOrder', { params: {
                current: this.current,
                size: this.size
            }}).then(res => {
                console.log(res.data)
                this.total = res.data.data.total
                this.repairList = res.data.data.records
            })
        },
        // 处理报修单
        editrepair(scope){
            this.editReparFrom.repairId = scope.id
            this.editReparFrom.reason = scope.reason
            this.isEditRepar = true
        },
        // 一页显示条数变化
        handleSizeChange(newSize){
            this.size = newSize
            this.getData()
        },
        // 当前页码变化
        handleCurrentChange(newCurrent){
            this.current = newCurrent
            this.getData()
        },
        // 处理对话框关闭
        editHandleReparClose(){
            this.isEditRepar = false
        },
        // 处理对话框取消
        editReparNo(formName){
            this.isEditRepar = false
            this.$refs[formName].resetFields();
        },
        // 处理对话框确认
        editReparOk(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                const data = {
                    repairId: this.editReparFrom.repairId,
                    repairName: this.editReparFrom.repairName,
                    telephone: this.editReparFrom.telephone
                }
                console.log(this.addovnerRotionFrom)
                this.$http.post('/repair/planRepair', null, { params: data }).then(res => {
                    console.log(res.data.code)
                    if(res.data.code == 1000){
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        })
                        this.$refs[formName].resetFields();
                        this.isEditRepar = false
                    }else{
                       this.$message({
                            message: '操作失败',
                            type: 'danger'
                        }) 
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
        }
    }
}
</script>
<style lang="less" scoped>
    html,
    body{
        width: 100%;
        height: 100%;
        .repairlist_box{
            width: 100%;
            height: 100%;
            overflow: scroll;
            .repair{
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