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
              <el-button  @click="addClick"
              style="margin:10px 0 10px 0"
              type="primary" size="mini">
                  新增</el-button>
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
                  <el-button  @click="deleteClick(scope.row)" type="danger" size="mini">
                  <i class="el-icon-delete"></i>
                  删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 新增对话框 -->

      <el-dialog title="新增" :visible.sync="isAddYun1" width="50%" :before-close="addYunClose1">
        <el-form
        :model="targetDataForm1"
        :rules="targetDataRules1"
        ref="targetDataRef1"
        label-width="100px"
        class="addpolice_from"
      >
         <!-- <el-form-item label="id" prop="id">
           <el-input type="eName" disabled v-model="targetDataForm1.id" autocomplete="off"></el-input>
         </el-form-item> -->

         <el-form-item label="设备id" prop="deviceId">
           <el-input type="deviceId" v-model="targetDataForm1.deviceId" autocomplete="off"></el-input>
         </el-form-item>
         
         <el-form-item label="p2pId" prop="p2pId">
           <el-input type="p2pId" v-model="targetDataForm1.p2pId" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="token" prop="token">
           <el-input type="token" v-model="targetDataForm1.token" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="设备Mac" prop="deviceMac">
           <el-input type="deviceMac" v-model="targetDataForm1.deviceMac" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="设备位置" prop="deciveLocation">
           <el-input type="deciveLocation" v-model="targetDataForm1.deciveLocation" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="设备名称" prop="deviceName">
           <el-input type="deviceName" v-model="targetDataForm1.deviceName" autocomplete="off"></el-input>
         </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addYunNo1('targetDataRef1')">取 消</el-button>
          <el-button type="primary" @click="addYunOk1('targetDataRef1')">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑对话框 -->
      <el-dialog title="编辑" :visible.sync="isAddYun" width="50%" :before-close="addYunClose">
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
            isAddYun1: false,
            targetDataForm: {
                id: '',
                deciveLocation: '',
                deviceName: ''
            },
            targetDataForm1: {
                deviceId:'',
                p2pId:'',
                token:'',
                deviceMac:'',
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
            },
            targetDataRules1: {
                deciveLocation: [
              { required: true, message: "此项不能为空，请填写", trigger: "blur" }
            ],
                    deviceName: [
              { required: true, message: "此项不能为空，请填写", trigger: "blur" }
            ],
                deviceId:[
              { required: true, message: "此项不能为空，请填写", trigger: "blur" }
            ],
                p2pId:[
              { required: true, message: "此项不能为空，请填写", trigger: "blur" }
            ],
                token:[
              { required: true, message: "此项不能为空，请填写", trigger: "blur" }
            ],
                deviceMac:[
              { required: true, message: "此项不能为空，请填写", trigger: "blur" }
            ],
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
        // 编辑按钮
        editClick(scope){
            console.log(scope)
            this.targetDataForm.id = scope.id
            this.targetDataForm.deciveLocation = scope.deciveLocation
            this.targetDataForm.deviceName = scope.deviceName
            this.isAddYun = true
        },
        // 删除按钮
       async deleteClick(scope){
          console.log(scope)
          let id = scope.id
          const {data:res} = await this.$http.post('/camera/deleteCamera', null, {params: {id:id}})
          console.log('删除',res)
          if(res.code === 1001){
            this.$message.success('删除成功')
            this.getData()
          }else{
            this.$message.error('删除失败')
          }

        },
        addYunNo(formName){
        this.isAddYun = false
        this.$refs[formName].resetFields();
        // this.fileList2 = []
    },
    addYunNo1(formName){
        this.isAddYun1 = false
        this.$refs[formName].resetFields();
        // this.fileList2 = []
    },
    // 编辑提交
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
    // 新增提交
   addYunOk1(formName) {
       let _this = this
        this.$refs[formName].validate( async valid => {
        if (valid) {
          console.log('新增',this.targetDataForm1)
          // return
            const {data:res} = await this.$http.post('/camera/addCamera', null, {params: this.targetDataForm1})
            console.log('修改后返回数据', res)
            if(res.code == 1001){
                this.$message.success('修改成功')
                this.isAddYun1 = false
                this.$refs[formName].resetFields()
                this.getData()
            }else{
                this.$message.error('修改失败')
                this.isAddYun1 = false
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
    addYunClose1() {
      this.isAddYun1 = false;
    },
    addClick(){
      this.isAddYun1 = true
    }
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