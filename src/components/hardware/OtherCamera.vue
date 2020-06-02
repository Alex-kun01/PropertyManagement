<template>
    <div class="garbage_box">
        <!-- 其他摄像头 -->
        <div class="garbage">
            <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>硬件管理</el-breadcrumb-item>
                <el-breadcrumb-item>其他摄像头</el-breadcrumb-item>
            </el-breadcrumb>

            <!-- 云对讲列表 -->
      <template>
        <el-table :data="targetData" border style="width: 100%">
          <el-table-column type="index" label="#" align="center"></el-table-column>
          <!-- <el-table-column prop="id" label="id" align="center"></el-table-column> -->
          <el-table-column prop="deviceId" label="设备id" align="center"></el-table-column>
          <el-table-column prop="p2pId" label="p2pId" align="center"></el-table-column>
          <!-- <el-table-column prop="token" label="token" align="center"></el-table-column> -->
          <el-table-column prop="publishTime" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="deviceName" label="设备名称" align="center"></el-table-column>
          <el-table-column prop="deciveLocation" label="设备位置" align="center"></el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button  @click="editClick(scope.row)" type="primary" size="mini">
                  <i class="el-icon-edit"></i>
                  编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 编辑对话框 -->
      <el-dialog title="添加人脸抓拍" :visible.sync="isAddYun" width="50%" :before-close="addYunClose">
        <el-form
        :model="targetDataForm"
        :rules="targetDataRules"
        ref="targetDataRef"
        label-width="100px"
        class="addpolice_from"
      >
         <el-form-item label="id" prop="id">
           <el-input type="eName" disabled v-model="targetDataForm.id" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="设备位置" prop="deciveLocation">
           <el-input type="eIp" v-model="targetDataForm.deciveLocation" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="设备名称" prop="deviceName">
           <el-input type="communityName" v-model="targetDataForm.deviceName" autocomplete="off"></el-input>
         </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addYunNo('targetDataRef')">取 消</el-button>
          <el-button type="primary" @click="addYunOk('targetDataRef')">确 定</el-button>
        </span>
      </el-dialog>



        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            targetData:[],
            isAddYun: false,
            targetDataForm: {
                id: '',
                deciveLocation: '',
                deviceName: ''
            },
            targetDataRules: {
                id: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
                deciveLocation: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
                deviceName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ]
            }

        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        async getData(){
            const {data:res} = await this.$http.post('/camera/lookCamera')
            console.log('其他摄像头返回数据', res)
            if(res.code == 1002){
                this.targetData = res.data
            }
        },
        editClick(scope){
            console.log(scope)
            this.targetDataForm.id = scope.id
            this.targetDataForm.deciveLocation = scope.deciveLocation
            this.targetDataForm.deviceName = scope.deviceName
            this.isAddYun = true
        },
        addYunNo(formName){
        this.isAddYun = false
        this.$refs[formName].resetFields();
        // this.fileList2 = []
    },
    // 新增提交
   addYunOk(formName) {
       let _this = this
        this.$refs[formName].validate( async valid => {
        if (valid) {
            const {data:res} = await this.$http.post('/camera/editCamera', null, {params: this.targetDataForm})
            console.log('修改后返回数据', res)
            if(res.code == 1001){
                this.$message.success('修改成功')
                this.isAddYun = false
                this.$refs[formName].resetFields()
                this.getData()
            }else{
                this.$message.error('修改失败')
                this.isAddYun = false
                this.$refs[formName].resetFields()
            }

        } else {
          this.$message({
            message: "Error",
            type: "warning"
          });
          return false;
        }
      });
    },
    addYunClose() {
      this.isAddYun = false;
    },
    }
}
</script>
<style lang="less" scoped>
    html,
    body{
        width: 100%;
        height: 100%;
        .garbage_box{
            width: 100%;
            height: 100%;
            overflow: scroll;
            .garbage{
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