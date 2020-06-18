<template>
  <div class="yunIntercom_box">
    <div class="yunIntercom">
      <!-- 系统用户 -->
      <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统用户</el-breadcrumb-item>
      </el-breadcrumb>

      <el-button @click="isAddYun = true" style="margin-bottom:10px;" type="primary">新增</el-button>

      <!-- 展示列表 -->
      <template>
        <el-table :data="targetData" border style="width: 100%">
          <el-table-column type="index" label="#" align="center"></el-table-column>
          <!-- <el-table-column prop="id" label="id" align="center"></el-table-column> -->
          <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
          <!-- <el-table-column prop="password" label="密码" align="center"></el-table-column> -->
          <el-table-column prop="publishTime" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="account" label="账户" align="center"></el-table-column>
          <el-table-column prop="comFeeId" label="小区id" align="center"></el-table-column>

          <el-table-column prop="userRole" label="管理员" align="center">
             <template slot-scope="scope">
                  <span v-if="scope.row.userRole == 1">总管理员</span>
                  <span v-if="scope.row.userRole == 2">公司管理员</span>
                  <span v-if="scope.row.userRole == 3">小区管理员</span>
              </template>
          </el-table-column>

          <el-table-column prop="canUse" label="状态" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.canUse == 1">可用</span>
                  <span v-else>不可用</span>
              </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button  @click="editClick(scope.row)" type="primary" size="mini">编辑</el-button>
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

         <el-form-item label="用户名" prop="userName">
           <el-input type="userName" v-model="targetDataForm.userName" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="密码" prop="password">
           <el-input type="" v-model="targetDataForm.password" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="是否可用" prop="canUse">
           <el-select v-model="targetDataForm.canUse" placeholder="选择">
              <el-option label="可用" value="1"></el-option>
              <el-option label="不可用" value="2"></el-option>
            </el-select>
         </el-form-item>

         <el-form-item label="姓名" prop="name">
           <el-input type="name" v-model="targetDataForm.name" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="账户" prop="account">
           <el-input type="account" v-model="targetDataForm.account" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="角色" prop="roleIds">
           <el-select v-model="addpvalue1" multiple placeholder="请选择">
            <el-option
              v-for="item in addpolicecomName1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
         </el-form-item>

         <el-form-item label="管理员">
           <el-select v-model="addpvalue3" placeholder="请选择管理员">
            <el-option
              v-for="item in addpolicecomName3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
         </el-form-item>

          <el-form-item label="公司"
          v-if="addpvalue3 == 2 || isUserRole == 1"
          >
           <el-select :disabled="isSelect" v-model="addpvalue2" placeholder="请选择">
              <el-option
              v-for="item in addpolicecomName2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
         </el-form-item>

         <el-form-item label="小区"
         v-if="userRole == 2 || isUserRole == 1"
         >
           <el-select  v-model="addpvalue4" placeholder="请选择">
              <el-option
              v-for="item in addpolicecomName4"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
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
        <el-form-item label="id" prop="id">
           <el-input disabled type="id" v-model="editYunFrom.id" autocomplete="off"></el-input>
         </el-form-item>

          <el-form-item label="用户名" prop="userName">
           <el-input type="userName" v-model="editYunFrom.userName" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="密码" prop="password">
           <el-input type="text" v-model="editYunFrom.password" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="是否可用" prop="canUse">
           <el-select v-model="editYunFrom.canUse" placeholder="选择">
              <el-option label="可用" value="1"></el-option>
              <el-option label="不可用" value="2"></el-option>
            </el-select>
         </el-form-item>

         <el-form-item label="姓名" prop="name">
           <el-input type="name" v-model="editYunFrom.name" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="账户" prop="account">
           <el-input type="account" v-model="editYunFrom.account" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="角色" prop="roleIds">
           <!-- <el-input type="roleIds" v-model="targetDataForm.roleIds" autocomplete="off"></el-input> -->
           <el-select v-model="addpvalue1" multiple placeholder="请选择">
            <el-option
              v-for="item in addpolicecomName1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              {{item.label}}
            </el-option>
          </el-select>
         </el-form-item>

          <el-form-item label="管理员">
           <el-select v-model="addpvalue3" placeholder="请选择管理员">
            <el-option
              v-for="item in addpolicecomName3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
         </el-form-item>

          <el-form-item label="公司"
          v-if="addpvalue3 == 2 || isUserRole == 1"
          >
           <el-select :disabled="isSelect" v-model="addpvalue2" placeholder="请选择">
              <el-option
              v-for="item in addpolicecomName2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
         </el-form-item>

         <el-form-item label="小区"
         v-if="isUserRole == 1"
         >
           <el-select  v-model="addpvalue4" placeholder="请选择">
              <el-option
              v-for="item in addpolicecomName4"
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
      addpvalue1: [],
      userRole: '', // 用户管理员
      companyId: '', // 本公司id
      compName: '', // 本公司名
      isSelect: false, // 是否可以选择
      addpvalue2: '',
      addpvalue3: '', // 选择的管理员
      addpvalue4: '',
      addpolicecomName1: [], // 角色列表1
      addpolicecomName2: [], // 公司列表1
      addpolicecomName4:[],  // 小区
      addpolicecomName3: [
          {
            value: 1,
            label: '总管理员'
          },
          {
            value: 2,
            label: '公司管理员'
          },
          {
            value: 3,
            label: '小区管理员'
          }
      ],
      targetDataForm: {
        userName: "",
        password: "",
        canUse: '',
        name: '',
        account: '',
        roleIds: '',
        companyId: '',
        userRole: '',
        comFeeId: ''
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
        ]
      },
      isEditYun: false, // 编辑
      editYunFrom: {
        id: '',
        userName: "",
        password: "",
        role: 1,
        canUse: '',
        name: '',
        account: '',
        roleIds: '',
        companyId: '',
        userRole: '',
        comFeeId: ''
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
    this.getRoleList()
    this.getComList()
    this.getComName()
    this.userRole = window.localStorage.getItem('userRole')
    this.companyId = window.localStorage.getItem('companyId')
    this.getComyApply()
  },
  computed:{
    isUserRole(){
      if(this.addpvalue3 == 3){
        if(this.userRole != 1){
          // 判断不为总管理员
          this.addpvalue2 = this.compName
          this.isSelect = true
        }
        return 1
      }else{
        return 2
      }
    }
  },
  methods: {
    async getData() { 
      const { data: res } = await this.$http.post(
        "/sysUser/getSysUsers", null, {params: {
            current: this.current,
            size: this.size
        }}
      );
      console.log("系统用户返回数据列表", res);
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
    // 根据公司id查询公司名
   async getComyApply(){
      let _this = this
      const {data:res} = await this.$http.post('/comyApply/getComyApply', null, {params: {comyApplyId: this.companyId}})
      console.log('获取到的公司', res)
      if(res.code === 1003){
        this.compName = res.data.compName
      }else{
        this.$message.error('默认公司获取失败')
      }
    },
    // 获取角色列表 
    async getRoleList(){
      const {data:res} = await this.$http.post('/sysRole/getRoleList')
      console.log('角色列表数据', res)
       let menuArr = []
     if(res.code === 1003){

       res.data.forEach(item => {
         let options = {
              value: item.id,
              label: item.roleName
          }
          menuArr.push(options)
       })
       


       this.addpolicecomName1 = menuArr
       console.log('转换后',this.addpolicecomName1)
     }
    },
    // 获取公司列表
    async getComList(){
      const {data:res} = await this.$http.post('/comyApply/getComyApplyList')
      console.log('公司列表数据', res)
       let menuArr = []
     if(res.code === 1003){

       res.data.forEach(item => {
         let options = {
              value: item.id,
              label: item.compName
          }
          menuArr.push(options)
       })
       


       this.addpolicecomName2 = menuArr
       console.log('转换后',this.addpolicecomName2)
     }
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
        let newStr = this.addpvalue1.join(',')
       this.targetDataForm.roleIds = newStr 
            
       if(this.userRole == 1){
         this.targetDataForm.companyId = this.companyId
       }else{
          this.targetDataForm.companyId = this.addpvalue2
       }
       this.targetDataForm.userRole = this.addpvalue3
       this.targetDataForm.comFeeId = this.addpvalue4
       delete this.editYunFrom.role
       delete this.editYunFrom.publishTime
       delete this.editYunFrom.sysMenus
       delete this.editYunFrom.sysRoles
       delete this.editYunFrom.sysRoleArray
       delete this.editYunFrom.comyApply
       
       
       console.log('xxYy',  this.targetDataForm)
      //  return
       const {data: res} = await this.$http.post('/sysUser/addOrupdate',null, {params:this.targetDataForm})
       console.log('新增返回数据', res)
       if(res.code === 1000){
           this.$message.success('添加成功')
           this.getData()
           this.isAddYun = false
           this.addpvalue1 = ''
           this.addpvalue2 = ''
           this.addpvalue3 = ''
           this.addpvalue4 = ''
           this.targetDataForm = {
             userName: "",
            password: "",
            canUse: '',
            name: '',
            account: '',
            roleIds: '',
            companyId: '',
            userRole: '',
            comFeeId: ''
           }
       }else{
           this.$message.error('添加失败')
            this.isAddYun = false
       }
    },
    // 编辑提交
    async editYunOk(formName){
        console.log('编辑',  this.editYunFrom)
        let newStr = this.addpvalue1.join(',')
       this.editYunFrom.roleIds = newStr 
       if(this.userRole == 1){
         this.editYunFrom.companyId = this.companyId
       }else{
          this.editYunFrom.companyId = this.addpvalue2
       }
       this.editYunFrom.userRole = this.addpvalue3
       this.editYunFrom.comFeeId = this.addpvalue4
       console.log('编辑提交', this.editYunFrom)
       delete this.editYunFrom.role
       delete this.editYunFrom.publishTime
       delete this.editYunFrom.sysMenus
       delete this.editYunFrom.sysRoles
       delete this.editYunFrom.sysRoleArray
       delete this.editYunFrom.comyApply
       console.log('修改后的编辑',this.editYunFrom)
        // return
       const {data: res} = await this.$http.post('/sysUser/addOrupdate',null, {params: this.editYunFrom})
       console.log('修改返回数据', res)
       if(res.code === 1000){
           this.$message.success('修改成功')
           this.getData()
           this.isEditYun = false
           this.addpvalue2 = ''
           this.addpvalue3 = ''
           this.addpvalue4 = ''
       }else{
           this.$message.error('修改失败')
            this.isEditYun = false
       }
    },
    // 获取小区列表
       async getComName(){
            //addpolicecomName  communityName
            const {data: res} = await this.$http.get('/house/changeCom')
            console.log('请求小区列表', res.data)
            let data = res.data || []
            let dataArr = []
            let index = 1
            data.forEach(item=>{
                let options = {
                    value: item.id,
                    label: item.communityName
                }
                dataArr.push(options)
            })
            this.addpolicecomName4 = dataArr
            console.log('小区列表', this.addpolicecomName4 )
        },
    editClick(scope){
        console.log('前scope', scope)
          if(scope.comyApply != null){
            this.addpvalue2 = scope.comyApply.id // 回显公司
          }
          this.addpvalue3 = scope.userRole
            
        
        let newArr = []
        let roles = scope.sysRoles || {}
        console.log('bbbbbbbb',scope.sysRoles)
        // return
        for(let key in roles){
          if(scope.sysRoles[key] != null){
            newArr.push(roles[key].id)
          }
        }

        // this.addpolicecomName1 = newArr
        this.addpvalue1 = newArr
        console.log('oooooooo', this.addpolicecomName1)
        this.editYunFrom = scope
        
        console.log(this.editYunFrom, 'xxx')
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
