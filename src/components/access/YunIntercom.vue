<template>
  <div class="yunIntercom_box">
    <div class="yunIntercom">
      <!-- 云对讲设备 -->
      <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>门禁管理</el-breadcrumb-item>
        <el-breadcrumb-item>云对讲设备</el-breadcrumb-item>
      </el-breadcrumb>

      <el-button @click="isAddYun = true" style="margin-bottom:10px;" type="primary">新增</el-button>

      <!-- 云对讲列表 -->
      <template>
        <el-table :data="targetData" border style="width: 100%">
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="key" label="key" align="center"></el-table-column>
          <el-table-column prop="token" label="token" align="center"></el-table-column>
          <el-table-column prop="location" label="位置" align="center"></el-table-column>
          <el-table-column prop="communityName" label="小区名" align="center"></el-table-column>
          <el-table-column prop="canUse" label="状态" align="center">
            <template slot-scope="scope">
              <span style="color: green;" v-if="scope.row.canUse == 1">可用</span>
              <span v-else style="color: red;">不可用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="editClick(scope.row)" type="primary" size="mini">
                <i class="el-icon-edit"></i>
                编辑</el-button>
              <el-button @click="seeClick(scope.row)" type="warning" size="mini">
                <i class="el-icon-view"></i>
                查看</el-button>
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
          :total="total"
        ></el-pagination>
      </div>

      <!-- 新增对话框 -->
      <el-dialog title="添加人脸" :visible.sync="isAddYun" width="50%" :before-close="addYunClose">
        <el-form
          :model="addYunFrom"
          :rules="addYunRules"
          ref="addYundRef"
          label-width="100px"
          class="addpolice_from"
        >
          <el-form-item label="硬件的key" prop="key">
            <el-input type="key" v-model="addYunFrom.key" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="硬件token" prop="token">
            <el-input type="token" v-model="addYunFrom.token" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="位置" prop="location">
            <el-input type="location" v-model="addYunFrom.location" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="小区名" prop="communityName">
            <el-input type="communityName" v-model="addYunFrom.communityName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="呼叫号码" prop="callNum">
            <el-input type="callNum" v-model="addYunFrom.callNum" autocomplete="off"></el-input>
          </el-form-item>


        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addYunNo('addYundRef')">取 消</el-button>
          <el-button type="primary" @click="addYunOk('addYundRef')">确 定</el-button>
        </span>
      </el-dialog>


       <!-- 编辑对话框 -->
      <el-dialog title="添加人脸" :visible.sync="isEditYun" width="50%" :before-close="editYunClose">
        <el-form
          :model="editYunFrom"
          :rules="editYunRules"
          ref="editYundRef"
          label-width="100px"
          class="addpolice_from"
        >
          <el-form-item label="硬件的key" prop="key">
            <el-input type="key" v-model="editYunFrom.key" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="硬件token" prop="token">
            <el-input type="token" v-model="editYunFrom.token" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="位置" prop="location">
            <el-input type="location" v-model="editYunFrom.location" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="小区名" prop="communityName">
            <el-input type="communityName" v-model="editYunFrom.communityName" autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="呼叫号码" prop="callNum">
            <el-input type="callNum" v-model="editYunFrom.callNum" autocomplete="off"></el-input>
          </el-form-item>
          
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editYunNo('editYundRef')">取 消</el-button>
          <el-button type="primary" @click="editYunOk('editYundRef')">确 定</el-button>
        </span>
      </el-dialog>


    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      size: 10, // 一页显示条数
      pages: 1, //总页数
      current: 1, // 当前页码
      total: 0, // 总共条数
      targetData: [], // 渲染数据
      isAddYun: false, // 是否展示新增对话框
      addYunFrom: {
        // 新增数据
        key: "",
        token: "",
        location: "",
        communityName: "",
        callNum: ''
      },
      addYunRules: {
        //新增数据规则
        key: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        token: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        location: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        communityName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        callNum: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ]
      },
      isEditYun: false, // 编辑
      editYunFrom: {
            id:"",
            key: "",
            token: "",
            location: "",
            communityName: "",
            callNum: ''
      },
      editYunRules: {
        //新增数据规则
        key: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        token: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        location: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        communityName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        callNum: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ]
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const { data: res } = await this.$http.post(
        "/cloudSpeak/lookAllCloud",
        null,
        {
          params: {
            current: this.current,
            size: this.size
          }
        }
      );
      console.log("云对讲数据", res);
      if (res.code == 1002) {
        this.targetData = res.data.records;
        this.total = res.data.total;
        // this.current = res.data.current;
      } else {
        this.$message({
          message: "服务器请求出错",
          type: "danger"
        });
      }
    },
    // 跳转查看云对讲设备
    seeClick(scope){
      let data = {
       token: scope.token,
       key: scope.key
      }
      this.$router.push({ name: 'yunintercomsee', params: {data} })
    },
    // 每页显示条数变化
    handleSizeChange(newSize) {
      this.size = newSize;
      this.getData();
    },
    // 当前页变化
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      this.getData();
    },
    addYunClose() {
      this.isAddYun = false;
    },
    editYunClose(){
        this.isEditYun = false;
    },
    addYunNo(formName) {
      this.isAddYun = false;
      this.$refs[formName].resetFields();
    },
    editYunNo(formName){
        this.isEditYun = false
        this.$refs[formName].resetFields();
    },
    // 新增提交
   addYunOk(formName) {
       let _this = this
        
        this.$refs[formName].validate( async valid => {
        if (valid) {


          console.log(this.addYunFrom)
         const { data: res } = await _this.$http.post("/cloudSpeak/addCloud",null, { params: this.addYunFrom })
         console.log(res)
         if(res.code == 1000){
             this.$message({
                 message: '添加成功',
                 type: 'success'
             })
             this.isAddYun = false
             this.getData()
             this.$refs[formName].resetFields();
         }
          
        //   
        } else {
          this.$message({
            message: "Error",
            type: "warning"
          });
          return false;
        }
      });
    },
    // 编辑提交
    editYunOk(formName){
        this.$refs[formName].validate( async valid => {
        if (valid) {
            console.log(this.isEditYun)
            const { data: res } = await this.$http.post('/cloudSpeak/editCloud', null, { params: this.editYunFrom })
            console.log('修改云对讲返回数据', res)
            if(res.code == 1001){
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.isEditYun = false
              this.getData()
             this.$refs[formName].resetFields();
            }else{
              this.$message('修改失败')
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
    editClick(scope){
        console.log(scope)
        this.editYunFrom = scope
        this.isEditYun = true
    }
  },
};
</script>
<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
  .yunIntercom_box {
    width: 100%;
    height: 100%;
    overflow: scroll;
    .yunIntercom {
      width: 100%;
      height: 100%;

      .paging {
        display: flex;
        justify-content: center;
        margin: 10px 0;
      }
    }
  }
}
</style>
