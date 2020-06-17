<template>
  <div class="adSet_box">
    <!-- 广告设置 -->

   <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
      <el-breadcrumb-item>机动车管理</el-breadcrumb-item>
   </el-breadcrumb>



    <div class="adSet">
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="tabclick"
        :tab-click="handleClick"
      >
        <el-tab-pane label="后台导入" name="appAd">
          <!-- 后台导入 -->

          <el-upload
          style="margin-top:10px;display:inline-block;"
          class="upload-demo"
          action="http://47.108.80.252:8090/userCar/importCar"
          :on-preview="handlePreview"
          :on-success="uploadSuccess"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :on-exceed="handleExceed"
          accept="excel"
        >
          <el-button type="danger">导入车辆表格(excel)</el-button>
        </el-upload>
        
          <a href="https://fsllnb.oss-cn-chengdu.aliyuncs.com/excel/CarImport.xlsx">
            <el-button type="primary">下载Excel导入模板</el-button>
          </a>
          <el-button @click="isDaoruadd2 = true" type="primary" style="margin: 0 0 10px 10px;">新增</el-button>
          <template>
                <el-table
                :data="showList"
                border
                style="width: 100%;margin-top: 10px">


                  <el-table-column type="index" label="#"></el-table-column>
                  <el-table-column prop="id" label="id"></el-table-column>
                  <el-table-column prop="carNum" label="车牌号"></el-table-column>
                  <el-table-column prop="manType" label="管理类型">
                    <template slot-scope="scope">
                      <span v-if="scope.row.manType == 1">长租车</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="carType" label="车辆类型">
                    <template slot-scope="scope">
                      <span v-if="scope.row.carType == 1">小型车</span>
                      <span v-if="scope.row.carType == 2">中型车</span>
                      <span v-if="scope.row.carType == 3">大型车</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="carAmo" label="车位数"></el-table-column>
                  <el-table-column prop="totalCarNum" label="共车位车牌"></el-table-column>
                  <el-table-column prop="effDate" label="生效日期"></el-table-column>
                  <el-table-column prop="endDate" label="截止日期"></el-table-column>
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="phone" label="手机号"></el-table-column>
                  <el-table-column prop="address" label="住址"></el-table-column>
                  <el-table-column prop="authPlace" label="授权区域"></el-table-column>

                  <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button  @click="editClickd(scope.row)" type="primary" size="mini">编辑</el-button>
                    <el-button  @click="deleteClickd(scope.row)" type="danger" size="mini">删除</el-button>
                  </template>
                </el-table-column>

                </el-table>
            </template>
          <!-- 分页 -->
          <div class="paging">
            <el-pagination
              @size-change="handleSizeChangeApp"
              @current-change="handleCurrentChangeApp"
              :current-page="current"
              :page-sizes="[5, 10, 20, 30]"
              :page-size="size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="业主自填" name="eqAd">
          <!-- 业主自填 -->
            <el-button @click="isEditYun = true" type="primary" style="margin: 0 0 10px 0;">新增</el-button>
          <template>
                <el-table
                :data="showListEq"
                border
                style="width: 100%">


                  <el-table-column type="index" label="#"></el-table-column>
                  <el-table-column prop="id" label="id"></el-table-column>
                  <el-table-column prop="userId" label="用户id"></el-table-column>
                  <el-table-column prop="carNum" label="车牌号"></el-table-column>
                  <el-table-column prop="type" label="车辆类型">
                    <template slot-scope="scope">
                      <span v-if="scope.row.type == 1">小型车</span>
                      <span v-if="scope.row.type == 2">中型车</span>
                      <span v-if="scope.row.type == 3">大型车</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="state" label="状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.state == 1">未删除</span>
                      <span v-if="scope.row.state == 0">已删除</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button  @click="editClick(scope.row)" type="primary" size="mini">编辑</el-button>
                    <el-button  @click="deleteClick(scope.row)" type="danger" size="mini">删除</el-button>
                  </template>
                </el-table-column>  

                </el-table>
            </template>
          <!-- 分页 -->
          <div class="paging">
            <el-pagination
              @size-change="handleSizeChangeEq"
              @current-change="handleCurrentChangeEq"
              :current-page="currentEq"
              :page-sizes="[5, 10, 20, 30]"
              :page-size="sizeEq"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalEq"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

     <!-- 新增对话框 -->
      <el-dialog title="新增" :visible.sync="isEditYun" width="30%" :before-close="editYunClose">
        <el-form
          :model="editYunFrom"
          :rules="editYunRules"
          ref="editYundRef"
          label-width="100px"
          class="addpolice_from"
        >
         
        
          <el-form-item label="userId" prop="userId">
           <el-input type="userId" v-model="editYunFrom.userId" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="车牌号" prop="carNum">
           <el-input type="carNum" v-model="editYunFrom.carNum" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="车辆类型" prop="type">
           <!-- <el-input type="type" v-model="editYunFrom.type" autocomplete="off"></el-input> -->
           <el-select v-model="addpvalue1" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>

         <el-form-item label="状态" prop="state">
           <!-- <el-input type="state" v-model="editYunFrom.state" autocomplete="off"></el-input> -->
           <el-select v-model="addpvalue2" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName2"
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

    <!-- 编辑对话框 -->
      <el-dialog title="编辑" :visible.sync="isaddYun" width="30%" :before-close="addYunClose">
        <el-form
          :model="addYunFrom"
          :rules="addYunRules"
          ref="addYundRef"
          label-width="100px"
          class="addpolice_from"
        >
         <el-form-item label="id" prop="id">
           <el-input disabled type="id" v-model="addYunFrom.id" autocomplete="off"></el-input>
         </el-form-item>
        
          <el-form-item label="userId" prop="userId">
           <el-input type="userId" v-model="addYunFrom.userId" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="车牌号" prop="carNum">
           <el-input type="carNum" v-model="addYunFrom.carNum" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="车辆类型" prop="type">
           <!-- <el-input type="type" v-model="addYunFrom.type" autocomplete="off"></el-input> -->
           <el-select v-model="addpvalue1" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>

         <el-form-item label="状态" prop="state">
           <!-- <el-input type="state" v-model="addYunFrom.state" autocomplete="off"></el-input> -->
           <el-select v-model="addpvalue2" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>


        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addYunNo('addYundRef')">取 消</el-button>
          <el-button type="primary" @click="addYunOk('addYundRef')">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑导入 -->
      <el-dialog title="编辑" :visible.sync="isDaoruadd1" width="50%" :before-close="DaoruaddClose1">
        <el-form
        :model="daoruaddDataForm1"
        :rules="daoruaddDataRules1"
        ref="daoruaddDataRef1"
        label-width="100px"
        class="addpolice_from"
      >
         <!-- <el-form-item label="id" prop="id">
           <el-input type="id" v-model="targetDataForm1.id" autocomplete="off"></el-input>
         </el-form-item> -->

         <el-form-item label="编号" prop="carNum">
           <el-input type="" v-model="daoruaddDataForm1.carNum" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="管理类型" prop="manType">
           <el-select v-model="addpvalue5" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName5"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
           <!-- <el-select v-model="daoruaddDataForm1.manType" placeholder="选择">
              <el-option label="长租车" value="1"></el-option>
            </el-select> -->
         </el-form-item>

         <el-form-item label="车辆类型" prop="carType">
           <el-select v-model="addpvalue4" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>

         <el-form-item label="车位数" prop="carAmo">
           <el-input type="number" v-model="daoruaddDataForm1.carAmo" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="公共车位车牌 " prop="totalCarNum">
           <el-input type="" v-model="daoruaddDataForm1.totalCarNum" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="生效日期" prop="effDate">
            <el-date-picker
              v-model="meffDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
         </el-form-item>

         <el-form-item label="截至日期" prop="endDate">
            <el-date-picker
              v-model="mendDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
         </el-form-item>

         <el-form-item label="姓名" prop="name">
           <el-input type="" v-model="daoruaddDataForm1.name" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="手机号" prop="phone">
           <el-input type="" v-model="daoruaddDataForm1.phone" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="地址" prop="address">
           <el-input type="" v-model="daoruaddDataForm1.address" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="授权区域" prop="authPlace">
           <el-input type="" v-model="daoruaddDataForm1.authPlace" autocomplete="off"></el-input>
         </el-form-item>

         </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="daoruaddNo1('daoruaddDataRef1')">取 消</el-button>
          <el-button type="primary" @click="daoruaddOk1('daoruaddDataRef1')">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 新增导入 -->
      <el-dialog title="新增" :visible.sync="isDaoruadd2" width="50%" :before-close="DaoruaddClose2">
        <el-form
        :model="daoruaddDataForm2"
        :rules="daoruaddDataRules2"
        ref="daoruaddDataRef1"
        label-width="100px"
        class="addpolice_from"
      >
         <!-- <el-form-item label="id" prop="id">
           <el-input type="id" v-model="targetDataForm1.id" autocomplete="off"></el-input>
         </el-form-item> -->

         <el-form-item label="编号" prop="carNum">
           <el-input type="" v-model="daoruaddDataForm2.carNum" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="管理类型" prop="manType">
           <el-select v-model="addpvalue5" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName5"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
           <!-- <el-select v-model="daoruaddDataForm2.manType" placeholder="选择">
              <el-option label="长租车" value="1"></el-option>
            </el-select> -->
         </el-form-item>

         <el-form-item label="车辆类型" prop="carType">
           <el-select v-model="addpvalue4" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>

         <el-form-item label="车位数" prop="carAmo">
           <el-input type="number" v-model="daoruaddDataForm2.carAmo" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="公共车位车牌 " prop="totalCarNum">
           <el-input type="" v-model="daoruaddDataForm2.totalCarNum" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="生效日期" prop="effDate">
            <el-date-picker
              v-model="meffDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
         </el-form-item>

         <el-form-item label="截至日期" prop="endDate">
            <el-date-picker
              v-model="mendDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
         </el-form-item>

         <el-form-item label="姓名" prop="name">
           <el-input type="" v-model="daoruaddDataForm2.name" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="手机号" prop="phone">
           <el-input type="" v-model="daoruaddDataForm2.phone" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="地址" prop="address">
           <el-input type="" v-model="daoruaddDataForm2.address" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="授权区域" prop="authPlace">
           <el-input type="" v-model="daoruaddDataForm2.authPlace" autocomplete="off"></el-input>
         </el-form-item>

         </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="daoruaddNo2('daoruaddDataRef2')">取 消</el-button>
          <el-button type="primary" @click="daoruaddOk2('daoruaddDataRef2')">确 定</el-button>
        </span>
      </el-dialog>

 
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 后台导入
      total: 0,
      size: 10,
      current: 1,
      showList: [],
      // 业主自填
      addDialogVisible: false,
      isEditYun: false, // 编辑
      isaddYun: false, 
      effDate:'',
      endDate: '',
      editYunFrom:{
        userId: '',
        carNum: '',
        type: '',
        state: '',
      },
      editYunRules: {
        userId: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        carNum: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        type: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        state: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ]
      },
      addpvalue1: '',
      addpolicecomName: [
        {
          value: 1,
          label: '小型车'
        },
         {
          value: 2,
          label: '中型车'
        },
         {
          value: 3,
          label: '大型车'
        }
      ],
      addpvalue2: '',
      addpolicecomName2:[
        {
          value: 1,
          label:'未删除'
        },
        {
          value: 0,
          label:'已删除'
        }
      ],
      addYunFrom:{
        id: 1,
        userId: '',
        carNum: '',
        type: '',
        state: '',
      },
      addYunRules: {
        userId: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        carNum: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        type: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        state: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ]
      },
      totalEq: 1,
      sizeEq: 10,
      currentEq: 1,
      showListEq: [],
      activeName: 'appAd',
      isDaoruadd1: false,
      isDaoruadd2: false,
      startTime: '',
      meffDate: "",
      mendDate: "",
      addpvalue4:'',
      addpolicecomName4:[
          {
            value: 1,
            label: '小型车'
          },
          {
            value: 2,
            label: '中型车'
          },
          {
            value: 3,
            label: '大型车'
          }
      ],
      addpvalue5:'',
      addpolicecomName5:[
        {
            value: 1,
            label: '长租车'
          },
      ],
      daoruaddDataForm1: {
        id: '',
        carNum: "",
        manType: '',
        carType: '',
        carAmo: '',
        totalCarNum: '',
        name: "",
        phone: "",
        address: "",
        authPlace: ""
      },
      daoruaddDataForm2: {
        id: '',
        carNum: "",
        manType: '',
        carType: '',
        carAmo: '',
        totalCarNum: '',
        name: "",
        phone: "",
        address: "",
        authPlace: ""
      },
      daoruaddDataRules1:{},
      daoruaddDataRules2:{}
    };
  },
  mounted() {
    this.getData();
    this.getDataEq()
  },
  methods: {
    // 后台导入
    async getData(){
       let data = {
         current: this.current,
         size: this.size
       }
       const {data:res} = await this.$http.post('/userCar/lookAllCar', null, { params: data })
       console.log('机动车导入数据', res)
       if(res.code == 1002){
         this.total = res.data.total
         this.showList = res.data.records
       }else{
         this.$message('获取数据失败')
       }
      },
      // 编辑按钮
      editClick(scope){
        console.log('scope',scope)
        this.addYunFrom = scope
        this.addpvalue1 = scope.type
        this.addpvalue2 = scope.state
        this.isaddYun = true
      },
      editYunNo(formName){
        this.isEditYun = false
        this.$refs[formName].resetFields();
    },
    addYunNo(formName){
        this.isaddYun = false
        this.$refs[formName].resetFields();
    },
     // 新增提交
    async editYunOk(formName){
      this.editYunFrom.type = this.addpvalue1
      this.editYunFrom.state = this.addpvalue2
        console.log('新增参数',  this.editYunFrom)
        // return
       const {data: res} = await this.$http.post('/userCar/addCar',null, {params: this.editYunFrom})
       console.log('新增返回数据', res)
       if(res.code === 1001){
           this.$message.success('添加成功')
           this.getDataEq()
           this.isEditYun = false
           this.$refs[formName].resetFields();
       }else{
           this.$message.error('添加失败')
            this.isEditYun = false
            this.$refs[formName].resetFields();
       }
    },
     // 导入 编辑按钮
    editClickd(scope){
      console.log('scope', scope)
      this.daoruaddDataForm1 = scope
      this.addpvalue4 = scope.carType
      this.addpvalue5 = scope.manType
      this.meffDate = scope.effDate
      this.mendDate = scope.endDate
      this.isDaoruadd1 = true
    },
     // 导入数据删除
    deleteClickd(scope){
      console.log('scope', scope)
        this.$confirm("此操作将永久删除该条信息，是否继续？")
        .then(async () => {
          // return
           const {data: res} = await this.$http.post('/userCar/deleteUserCar',null, {params:{
               id: scope.id
           }}) 
           console.log('删除返回',res)
           if(res.code == 1001){
               this.$message.success('删除成功')
               this.getData()
           }else{
               this.$message.error('删除失败')
           }
          
        })
        .catch(() => {
          this.$message({
            message: "已取消",
            type: "info"
          });
        });
    },
    // 编辑提交
    async addYunOk(formName){
       this.addYunFrom.type = this.addpvalue1
      this.addYunFrom.state = this.addpvalue2
        console.log('编辑',  this.addYunFrom)
        // return
       const {data: res} = await this.$http.post('/userCar/editCar',null, {params: this.addYunFrom})
       console.log('修改返回数据', res)
       if(res.code === 1001){
           this.$message.success('修改成功')
           this.getDataEq()
           this.isaddYun = false
           this.$refs[formName].resetFields();
       }else{
           this.$message.error('修改失败')
            this.isaddYun = false
            this.$refs[formName].resetFields();
       }
    },
      // 删除按钮
      // deleteClick(scope){
      //   console.log('scope',scope)
      // },
      async getDataEq(){
        let data = {
          current: this.currentEq,
          size: this.sizeEq
        }
        const {data: res} = await this.$http.post('/userCar/lookAllCarByUser', null, { params: data })
        console.log('业主自填', res)
        if(res.code == 1002){
          this.totalEq = res.data.total
          this.showListEq = res.data.records
        }else{
         this.$message('获取数据失败')
       }

      },
      handleSizeChangeApp(newSize){
        this.size = newSize 
        this.getData()
      },
      handleCurrentChangeApp(newCurrent){
        this.current = newCurrent
        this.getData()
      },
      editYunClose(){
        this.isEditYun = false;
    },
     addYunClose(){
        this.isaddYun = false;
    },
    // 业主自填
    handleSizeChangeEq(newSize){
        this.sizeEq = newSize
         this.getDataEq()
    },
    handleCurrentChangeEq(newCurrent){
      this.currentEq = newCurrent
      this.getDataEq()

    },
    handleClick(tab, event) {
      console.log(tab.label);
      if (tab.label == "后台导入") {
        this.getDataApp();
      } else {
        this.getDataEq();
      }
    },
    tabclick(tab) {
      console.log(tab.name);
      if (tab.name == "eqAd") {
        this.getDataEq();
      }
    },
    // 上传文件相关操作
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    // 导入房屋表格
    addBuilderExcel() {},
    // 上传成功
      uploadSuccess(res){
        //   console.log(res)
          this.$message({
              type:'success',
              message:res.msg
          })
          setTimeout(()=>{
              this.getData()
          },1000)
      },
      // 上传之前检测
      beforeAvatarUpload(file) {
        let fileType = file.name.split('.')[1]
        const isJPG = fileType == 'xls' || fileType == 'xlsx';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传文件只能是 xlsx/xls 格式!');
        }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        return isJPG;
      },
      //删除按钮
     deleteClick(scope){
        console.log('scope', scope)
        this.$confirm("此操作将永久删除该房屋信息，是否继续？")
        .then(async () => {
          // return
           const {data: res} = await this.$http.post('/userCar/deleteCar',null, {params:{
               id: scope.id
           }}) 
           console.log('删除返回',res)
           if(res.code == 1001){
               this.$message.success('删除成功')
              this.getDataEq()
           }else{
               this.$message.error('删除失败')
           }
        })
        .catch(() => {
          this.$message({
            message: "已取消",
            type: "info"
          });
        });
    },
    DaoruaddClose1(){
      this.isDaoruadd1 = false
    },
    DaoruaddClose2(){
      this.isDaoruadd2 = false
    },
    daoruaddNo1(formName){
        this.isDaoruadd1 = false
        this.$refs[formName].resetFields();
    },
     daoruaddNo2(formName){
        this.isDaoruadd2 = false
        this.$refs[formName].resetFields();
    },
     async daoruaddOk1(){
       
      this.daoruaddDataForm1.effDate = this.meffDate
      this.daoruaddDataForm1.endDate = this.mendDate
      this.daoruaddDataForm1.carType = this.addpvalue4
      this.daoruaddDataForm1.manType = this.addpvalue5
      console.log('导入新增', this.daoruaddDataForm1)
      // return
      const {data:res} = await this.$http.post('/userCar/editUserCar', null, {params: this.daoruaddDataForm1})
      console.log('导入 编辑返回数据', res)
      if(res.code === 1001){
        this.$message.success('修改成功')
        this.getData()
        this.isDaoruadd1 = false
        
      }else{
        this.$message.error('修改失败')
      }
      this.addpvalue4 = ''
      this.addpvalue5 = ''
      this.meffDate = ''
      this.mendDate = ''

    },
    async daoruaddOk2(){
       
      this.daoruaddDataForm2.effDate = this.meffDate
      this.daoruaddDataForm2.endDate = this.mendDate
      this.daoruaddDataForm2.carType = this.addpvalue4
      this.daoruaddDataForm2.manType = this.addpvalue5
      console.log('导入新增', this.daoruaddDataForm2)
      // return
      const {data:res} = await this.$http.post('/userCar/addUserCar', null, {params: this.daoruaddDataForm2})
      console.log('导入 编辑返回数据', res)
      if(res.code === 1001){
        this.$message.success('添加成功')
        this.getData()
        this.isDaoruadd2 = false
        
      }else{
        this.$message.error('添加失败')
      }
      this.addpvalue4 = ''
      this.addpvalue5 = ''
      this.meffDate = ''
      this.mendDate = ''

    },

  }
};
</script>
<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
  .adSet_box {
    width: 100%;
    height: 100%;
    overflow: scroll;

    .adSet {
      width: 100%;
      height: 100%;
      margin-top: 10px;

      .paging {
        display: flex;
        justify-content: center;
        margin: 10px 0;
      }
    }
  }
}
</style>

