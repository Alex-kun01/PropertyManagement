<template>
  <div class="yunIntercom_box">
    <div class="yunIntercom">
      <!-- 票据管理 -->
      <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>票据管理</el-breadcrumb-item>
      </el-breadcrumb>

      <el-button @click="isAddYun = true" style="margin-bottom:10px;" type="primary">新增</el-button>

      <!-- 展示列表 -->
      <template>
          <!-- id: 13
desc: "周瑶"
state: 0
updateTime: "2020-06-16 15:59:01"
createTime: -->
        <el-table :data="targetData" border style="width: 100%">
          <el-table-column type="index" label="#" align="center"></el-table-column>
          <el-table-column prop="desc" label="描述" align="center"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.state == 0">未知状态1</span>
                  <span v-if="scope.row.state == 1">未知状态2</span>
              </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button  @click="editClick(scope.row)" type="primary" size="mini">编辑</el-button> -->
              <el-button  @click="chakan(scope.row)" type="primary" size="mini">查看票据</el-button>
              <el-button  @click="deleteClick(scope.row)" type="danger" size="mini">删除</el-button>
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
      <el-dialog title="新增" :visible.sync="isAddYun" width="50%" :before-close="addYunClose">
        <el-form
        :model="targetDataForm"
        :rules="targetDataRules"
        ref="targetDataRef"
        label-width="100px"
        class="addpolice_from"
      >
         <!-- <el-form-item label="id" prop="id">
           <el-input type="id" v-model="targetDataForm.id" autocomplete="off"></el-input>
         </el-form-item> -->

         <el-form-item label="公司名" prop="compName">
           <el-input type="compName" v-model="targetDataForm.compName" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="许可证" prop="licenseImg">
           <el-input type="licenseImg" v-model="targetDataForm.licenseImg" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="法人" prop="legName">
           <el-input :disabled="false" type="legName" v-model="targetDataForm.legName" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="法人身份证" prop="legIdCard">
           <el-input type="legIdCard" v-model="targetDataForm.legIdCard" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="银行卡号" prop="bankNum">
           <el-input type="bankNum" v-model="targetDataForm.bankNum" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="余额" prop="account">
           <el-input type="account" v-model="targetDataForm.account" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="总流量帐户" prop="totalFlowAccount">
           <el-input type="totalFlowAccount" v-model="targetDataForm.totalFlowAccount" autocomplete="off"></el-input>
         </el-form-item>

          <el-form-item label="手机号" prop="phone">
           <el-input type="phone" v-model="targetDataForm.phone" autocomplete="off"></el-input>
         </el-form-item>

          <!-- 新加字段 -->
         <el-form-item label="支付宝账号" prop="alipayAccount">
           <el-input type="phone" v-model="targetDataForm.alipayAccount" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="支付宝真实姓名" prop="realNameToAlipayAccount">
           <el-input type="phone" v-model="targetDataForm.realNameToAlipayAccount" autocomplete="off"></el-input>
         </el-form-item>

          <el-form-item label="状态" prop="state">
           <!-- <el-input type="state" v-model="targetDataForm.state" autocomplete="off"></el-input> -->
             <el-select v-model="targetDataForm.state" placeholder="选择">
              <el-option label="可用" value="1"></el-option>
              <el-option label="不可用" value="2"></el-option>
            </el-select>
         </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addYunNo('targetDataRef')">取 消</el-button>
          <el-button type="primary" @click="addYunOk('targetDataRef')">确 定</el-button>
        </span>
      </el-dialog>


       <!-- 编辑对话框 -->
      <el-dialog title="编辑" :visible.sync="isEditYun" width="30%" :before-close="editYunClose">
        <el-form
          :model="editYunFrom"
          :rules="editYunRules"
          ref="editYundRef"
          label-width="100px"
          class="addpolice_from"
        >
          <el-form-item label="公司名" prop="compName">
           <el-input type="compName" v-model="editYunFrom.compName" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="许可证" prop="licenseImg">
           <el-input type="licenseImg" v-model="editYunFrom.licenseImg" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="法人" prop="legName">
           <el-input :disabled="false" type="legName" v-model="editYunFrom.legName" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="法人身份证" prop="legIdCard">
           <el-input type="legIdCard" v-model="editYunFrom.legIdCard" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="银行卡号" prop="bankNum">
           <el-input type="bankNum" v-model="editYunFrom.bankNum" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="余额" prop="account">
           <el-input type="account" v-model="editYunFrom.account" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="总流量账户" prop="totalFlowAccount">
           <el-input type="totalFlowAccount" v-model="editYunFrom.totalFlowAccount" autocomplete="off"></el-input>
         </el-form-item>

          <el-form-item label="手机号" prop="phone">
           <el-input type="phone" v-model="editYunFrom.phone" autocomplete="off"></el-input>
         </el-form-item>

          <!-- 新加字段 -->
         <el-form-item label="支付宝账号" prop="alipayAccount">
           <el-input type="phone" v-model="editYunFrom.alipayAccount" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="支付宝真实姓名" prop="realNameToAlipayAccount">
           <el-input type="phone" v-model="editYunFrom.realNameToAlipayAccount" autocomplete="off"></el-input>
         </el-form-item>

          <el-form-item label="状态" prop="state">
           <!-- <el-input type="state" v-model="editYunFrom.state" autocomplete="off"></el-input> -->
             <!-- <el-select v-model="editYunFrom.state" placeholder="选择">
              <el-option label="可用" value="1"></el-option>
              <el-option label="不可用" value="2"></el-option>
            </el-select> -->
            <el-select v-model="addpvalue" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName"
                :key="item.value" 
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
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
      addpvalue: '',
      addpolicecomName: [
        {
          value: 1,
          label: '可用'
        },
        {
          value: 2,
          label: '不可用'
        }
      ],
      targetDataForm: {
        // id: 1,
        compName: "",
        licenseImg: "",
        legName: "",
        legIdCard: "",
        bankNum: "",
        account: '',
        totalFlowAccount: '',
        phone: "",
        state: 1,
        alipayAccount: '',
        realNameToAlipayAccount: ''
      },
      targetDataRules: {
        eName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        eIp: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        communityName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        location: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        alipayAccount: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        realNameToAlipayAccount:[
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
      },
      isEditYun: false, // 编辑
      editYunFrom: {
        id: '',
        compName: "",
        licenseImg: "",
        legName: "",
        legIdCard: "",
        bankNum: "",
        account: '',
        totalFlowAccount: '',
        phone: "",
        state: 1,
        AlipayAccount: '',
        realNameToAlipayAccount: ''
      },
      editYunRules: {
        //新增数据规则
        id: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        state: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() { 
      const { data: res } = await this.$http.get(
        "/bill/getBillPage",  {params: {
            current: this.current,
            size: this.size
        }}
      );
      console.log("票据列表数据", res);
        // return
      if (res.code == 1003) {
        this.targetData = res.data.records;
        this.total = res.data.total;
        this.current = res.data.current;
      } else {
        this.$message({
          message: "服务器请求出错",
          type: "danger"
        });
      }
    },
    // 跳转票据
    chakan(scope){
        console.log('查看票据', scope)
        // return
        this.$router.push({
            name: 'billpage',
            query: {
                id: scope.id
            }
        })
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
      this.fileList = []
    },
    editYunNo(formName){
        this.isEditYun = false
        this.$refs[formName].resetFields();
        this.fileList2 = []
    },
    // 新增提交
   async addYunOk(formName) {
       let _this = this
       console.log(this.targetDataForm) 
       const {data: res} = await this.$http.post('/comyApply/addorupdate',null, {params:this.targetDataForm})
       console.log('新增返回数据', res)
       if(res.code === 1001){
           this.$message.success('添加成功')
           this.getData()
           this.isAddYun = false
       }else{
           this.$message.error('添加失败')
            this.isAddYun = false
       }
    },
    // 编辑提交
    async editYunOk(formName){
        console.log('编辑',  this.editYunFrom)
        this.editYunFrom.state = this.addpvalue
        // return
       const {data: res} = await this.$http.post('/comyApply/addorupdate',null, {params: this.editYunFrom})
       console.log('修改返回数据', res)
       if(res.code === 1001){
           this.$message.success('修改成功')
           this.getData()
           this.isEditYun = false
       }else{
           this.$message.error('修改失败')
            this.isEditYun = false
       }
       this.addpvalue = ''
    },
    // 编辑按钮
    editClick(scope){
        console.log('scope', scope)
        this.editYunFrom = scope
        this.addpvalue = scope.state
        console.log(this.editYunFrom, 'xxx')
        this.isEditYun = true
    },
    // 删除按钮
   async deleteClick(scope){
      console.log('删除',scope)
     const {data:res} = await this.$http.post('/comyApply/delete', null, {params: {comyApplyId: scope.id}})
     console.log('删除后',res)
     if(res.code === 1001){
       this.$message.success('删除成功')
       this.getData()
     }else{
       this.$message.error('删除失败')
     }
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
