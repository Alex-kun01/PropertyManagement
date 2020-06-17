<template>
    <div class="repairlist_box">
        <!-- 保安报修 -->
        <div class="repair">
            
            <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>保安报修</el-breadcrumb-item>
            </el-breadcrumb>

            <template>
                <el-table
                :data="repairList"
                border
                style="width: 100%">


                        <el-table-column type="index" label="#" align="center"></el-table-column>
                        <el-table-column prop="img" label="图片" align="center">
                            <template slot-scope="scope">
                                <img style="max-width: 100px; max-height:100px;" :src="scope.row.img">
                            </template>
                        </el-table-column>
                        <el-table-column prop="policeId" label="保安id" align="center"></el-table-column>
                        <el-table-column prop="publishTime" label="报修时间" align="center"></el-table-column>
                        <el-table-column prop="state" label="状态" width="180" align="center">
                            <template slot-scope="scope">
                                <span  style="color: #53c553;" v-if="scope.row.state == 1">已处理</span>
                                <span v-if="scope.row.state == 0">未处理</span>
                            </template>
                        </el-table-column>

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
            policeId: '',
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
            this.$http.post('/fault/lookAllFault', { params: {
                current: this.current,
                size: this.size,
                policeId: this.policeId
            }}).then(res => {
                console.log(res.data)
                this.total = res.data.data.total
                this.repairList = res.data.data.records
            })
        },
        // 处理报修单
    editrepair(scope) {
      this.$confirm("确认已处理此条报修，是否继续？")
        .then(() => {
          this.$http
            .post("/fault/dealFault", null, { params: { defaultId: scope.id } })
            .then(res => {
              if (res.data.code == 1000) {
                this.$message({
                  message: "确认成功",
                  type: "success"
                });
                this.getData();
              } else {
                this.$message({
                  message: "确认失败",
                  type: "warning"
                });
              }
            })
            .catch(res => {
              this.$message({
                message: "Error",
                type: "danger"
              });
            });
        })
        .catch(() => {
          this.$message({
            message: "已取消",
            type: "info"
          });
        });
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