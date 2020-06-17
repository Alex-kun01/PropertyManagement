<template>
  <div class="adSet_box">
    <!-- 非机动车管理 -->

   <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
      <el-breadcrumb-item>非机动车管理</el-breadcrumb-item>
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
          action="http://47.108.80.252:8090/nonMot/inportNonMot"
          :on-preview="handlePreview"
          :on-success="uploadSuccess"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :on-exceed="handleExceed"
          accept="excel"
        >
          <el-button type="danger">导入车辆表格(excel)</el-button>
        </el-upload>
        
          <a href="https://fsllnb.oss-cn-chengdu.aliyuncs.com/excel/NonCarImport.xlsx">
            <el-button type="primary">下载Excel导入模板</el-button>
          </a>
           <el-button @click="isDaoruadd = true" type="primary" style="margin: 0 0 10px 10px;">新增</el-button>
          <template>
                <el-table
                :data="showList"
                border
                style="width: 100%; margin-top: 10px">


                  <el-table-column type="index" label="#"></el-table-column>
                  <el-table-column prop="id" label="id"></el-table-column>
                  <el-table-column prop="number" label="编号"></el-table-column>
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="type" label="车辆类型">
                    <template slot-scope="scope">
                      <span v-if="scope.row.type == 1">电动车</span>
                      <span v-if="scope.row.type == 2">山轮车</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="startTime" label="缴费开始日期"></el-table-column>
                  <el-table-column prop="phone" label="手机号"></el-table-column>
                  <el-table-column prop="comName" label="小区"></el-table-column>

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
                  <el-table-column prop="number" label="编号"></el-table-column>
                  <el-table-column prop="img" label="图片" width="120">
                    <template slot-scope="scope">
                      <img style="width:100%" :src="scope.row.img" alt="">
                    </template>
                  </el-table-column>
                  <el-table-column prop="publishTime" label="添加时间"></el-table-column>
                  <el-table-column prop="comName" label="小区"></el-table-column>
                  <el-table-column prop="type" label="类型">
                    <template slot-scope="scope">
                      <span v-if="scope.row.type == 1">电动车</span>
                      <span v-if="scope.row.type == 2">三轮车</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="state" label="状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.state == 0">未删除</span>
                      <span v-if="scope.row.state == 1">已删除</span>
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
      <el-dialog title="编辑" :visible.sync="isEditYun" width="30%" :before-close="editYunClose">
        <el-form
          :model="editYunFrom"
          :rules="editYunRules"
          ref="editYundRef"
          label-width="100px"
          class="addpolice_from"
        >
         <!-- <el-form-item label="id" prop="id">
           <el-input disabled type="id" v-model="editYunFrom.id" autocomplete="off"></el-input>
         </el-form-item> -->
        
          <el-form-item label="userId" prop="userId">
           <el-input type="userId" v-model="editYunFrom.userId" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="编号" prop="number">
           <el-input type="" v-model="editYunFrom.number" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="上传图片" prop="img">
          
          <el-upload
            class="upload-demo"
            action="http://47.108.80.252:8090/uploads"  
            :on-preview="handlePreview1"
            :on-remove="handleRemove1"
            :on-success="handSuccess1"
            :before-remove="beforeRemove1"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList1">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

        </el-form-item>

         <el-form-item label="小区名" prop="comName">
           <!-- <el-input type="comName" v-model="editYunFrom.comName" autocomplete="off"></el-input> -->
           <el-select v-model="addpvalue" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>

         <el-form-item label="类型" prop="type">
           <!-- <el-input type="type" v-model="editYunFrom.type" autocomplete="off"></el-input> -->
           <el-select v-model="addpvalue1" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName1"
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

         <el-form-item label="编号" prop="number">
           <el-input type="" v-model="addYunFrom.number" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="上传图片" prop="img">
          
          <el-upload
            class="upload-demo"
            action="http://47.108.80.252:8090/uploads"  
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handSuccess"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

        </el-form-item>

         <el-form-item label="小区名" prop="comName">
           <!-- <el-input type="comName" v-model="addYunFrom.comName" autocomplete="off"></el-input> -->
           <el-select v-model="addpvalue" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>

         <el-form-item label="类型" prop="type">
           <!-- <el-input type="type" v-model="addYunFrom.type" autocomplete="off"></el-input> -->
           <el-select v-model="addpvalue1" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName1"
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

       <!-- 新增导入 -->
      <el-dialog title="新增" :visible.sync="isDaoruadd" width="50%" :before-close="DaoruaddClose">
        <el-form
        :model="daoruaddDataForm"
        :rules="daoruaddDataRules"
        ref="daoruaddDataRef"
        label-width="100px"
        class="addpolice_from"
      >
         <!-- <el-form-item label="id" prop="id">
           <el-input type="id" v-model="targetDataForm.id" autocomplete="off"></el-input>
         </el-form-item> -->

         <el-form-item label="编号" prop="number">
           <el-input type="" v-model="daoruaddDataForm.number" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="姓名" prop="name">
           <el-input type="name" v-model="daoruaddDataForm.name" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="缴费开始时间" prop="startTime">
           <!-- <el-input :disabled="false" type="startTime" v-model="daoruaddDataForm.startTime" autocomplete="off"></el-input> -->
            <el-date-picker
              v-model="startTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
         </el-form-item>

         <el-form-item label="手机号" prop="phone">
           <el-input type="phone" v-model="daoruaddDataForm.phone" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="小区名" prop="comName">
           <!-- <el-input type="comName" v-model="daoruaddDataForm.comName" autocomplete="off"></el-input> -->
            <el-select v-model="addpvalue" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>

          <el-form-item label="车辆类型" prop="type">
           <!-- <el-input type="state" v-model="daoruaddDataForm.state" autocomplete="off"></el-input> -->
             <el-select v-model="daoruaddDataForm.type" placeholder="选择">
              <el-option label="电动车" value="1"></el-option>
              <el-option label="三轮车" value="2"></el-option>
            </el-select>
         </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="daoruaddNo('daoruaddDataRef')">取 消</el-button>
          <el-button type="primary" @click="daoruaddOk('daoruaddDataRef')">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑导入 -->
      <el-dialog title="新增" :visible.sync="isDaoruadd1" width="50%" :before-close="DaoruaddClose1">
        <el-form
        :model="daoruaddDataForm1"
        :rules="daoruaddDataRules1"
        ref="daoruaddDataRef1"
        label-width="100px"
        class="addpolice_from"
      >
         <!-- <el-form-item label="id" prop="id">
           <el-input type="id" v-model="targetDataForm.id" autocomplete="off"></el-input>
         </el-form-item> -->

         <el-form-item label="编号" prop="number">
           <el-input type="" v-model="daoruaddDataForm1.number" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="姓名" prop="name">
           <el-input type="name" v-model="daoruaddDataForm1.name" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="缴费开始时间" prop="startTime">
           <!-- <el-input :disabled="false" type="startTime" v-model="daoruaddDataForm.startTime" autocomplete="off"></el-input> -->
            <el-date-picker
              v-model="startTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
         </el-form-item>

         <el-form-item label="手机号" prop="phone">
           <el-input type="phone" v-model="daoruaddDataForm1.phone" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="小区名" prop="comName">
           <!-- <el-input type="comName" v-model="daoruaddDataForm.comName" autocomplete="off"></el-input> -->
            <el-select v-model="addpvalue" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>

          <el-form-item label="车辆类型" prop="type">
           <!-- <el-input type="state" v-model="daoruaddDataForm.state" autocomplete="off"></el-input> -->
             <el-select v-model="daoruaddDataForm1.type" placeholder="选择">
              <el-option label="电动车" value="1"></el-option>
              <el-option label="三轮车" value="2"></el-option>
            </el-select>
         </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="daoruaddNo1('daoruaddDataRef1')">取 消</el-button>
          <el-button type="primary" @click="daoruaddOk1('daoruaddDataRef1')">确 定</el-button>
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
      startTime:'',
      addpvalue:'',
      addpvalue1: '',
      addpvalue2: '',
      fileList: [],
      fileList1: [],
      addpolicecomName: [],
      addpolicecomName1: [
        {
          value: 1,
          label: '电动车'
        },
        {
          value: 2,
          label: '三轮车'
        }
      ],
      addpolicecomName2: [
       {
          value: 1,
          label:'未删除'
        },
        {
          value: 0,
          label:'已删除'
        }
      ],
      isEditYun: false, // 编辑
      isaddYun: false, 
      editYunFrom:{
        // id: '',
        userId: '',
        number: "",
        img: "",
        comName: "",
        type: '',
        state: '',
      },
      editYunRules: {
        userId: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        number: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        img: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        comName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        type:  [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        state: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
      },
      addYunFrom:{
        id: '',
        userId: '',
        number: "",
        img: "",
        comName: "",
        type: '',
        state: '',
      },
      addYunRules: {
        userId: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        number: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        img: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        comName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        type:  [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        state: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
      },
      totalEq: 1,
      sizeEq: 10,
      currentEq: 1,
      showListEq: [],
      activeName: 'appAd',
      isDaoruadd: false,
      isDaoruadd1: false,
      daoruaddDataForm: {
        id: '',
        number: "",
        name: "",
        startTime: "",
        phone: "",
        type: '',
        comName: "",
      },
      daoruaddDataForm1: {
        id: '',
        number: "",
        name: "",
        startTime: "",
        phone: "",
        type: '',
        comName: "",
      },
      daoruaddDataRules:{

      },
      daoruaddDataRules1:{}

    };
  },
  mounted() {
    this.getComName()
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
       const {data:res} = await this.$http.post('/nonMot/lookAllCar', null, { params: data })
       console.log('非机动车导入数据', res)
       if(res.code == 1002){
         this.total = res.data.total
         this.showList = res.data.records
       }else{
         this.$message('获取数据失败')
       }
      },
      async getDataEq(){
        let data = {
          current: this.currentEq,
          size: this.sizeEq
        }
        const {data: res} = await this.$http.post('/userNonMot/lookAllNonCar', null, { params: data })
        console.log('非机动车填写数据', res)
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
    // 业主自填
    handleSizeChangeEq(newSize){
        this.sizeEq = newSize

    },
    handleCurrentChangeEq(newCurrent){
      this.currentEq = newCurrent

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
                    value: item.communityName,
                    label: item.communityName
                }
                dataArr.push(options)
            })
            this.addpolicecomName = dataArr
            console.log('小区列表', this.addpolicecomName )
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
      editYunClose(){
        this.isEditYun = false;
    },
     addYunClose(){
        this.isaddYun = false;
    },
    DaoruaddClose(){
      this.isDaoruadd = false
    },
    DaoruaddClose1(){
      this.isDaoruadd1 = false
    },
    editYunNo(formName){
        this.isEditYun = false
        this.$refs[formName].resetFields();
    },
    addYunNo(formName){
        this.isaddYun = false
        this.$refs[formName].resetFields();
    },
    daoruaddNo(formName){
        this.isDaoruadd = false
        this.$refs[formName].resetFields();
    },
    daoruaddNo1(formName){
        this.isDaoruadd1 = false
        this.$refs[formName].resetFields();
    },
    // 编辑提交
    async addYunOk(formName){
      this.addYunFrom.comName = this.addpvalue
      this.addYunFrom.type = this.addpvalue1
      this.addYunFrom.state = this.addpvalue2
        console.log('编辑',  this.addYunFrom)
        // return
       const {data: res} = await this.$http.post('/userNonMot/editNonMot',null, {params: this.addYunFrom})
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
       this.addpvalue = ''
        this.addpvalue1 = ''
        this.addpvalue2 = ''
    },
    // 确认提交 导入 新增
    async daoruaddOk(){
      this.daoruaddDataForm.comName = this.addpvalue
      this.daoruaddDataForm.startTime = this.startTime
      console.log('导入新增', this.daoruaddDataForm)
      const {data:res} = await this.$http.post('/nonMot/addNonMot', null, {params: this.daoruaddDataForm})
      console.log('导入 新增返回数据', res)
      if(res.code === 1001){
        this.$message.success('添加成功')
        this.getData()
        this.isDaoruadd = false
        this.startTime = ''
      }else{
        this.$message.error('添加失败')
        this.startTime = ''
      }

    },
    async daoruaddOk1(){
      this.daoruaddDataForm1.comName = this.addpvalue
      this.daoruaddDataForm1.startTime = this.startTime
      console.log('导入新增', this.daoruaddDataForm1)
      // return
      const {data:res} = await this.$http.post('/nonMot/editNonMot', null, {params: this.daoruaddDataForm1})
      console.log('导入 新增返回数据', res)
      if(res.code === 1001){
        this.$message.success('添加成功')
        this.getData()
        this.isDaoruadd1 = false
        this.startTime = ''
      }else{
        this.$message.error('添加失败')
        this.startTime = ''
      }

    },
    // 新增提交
    async editYunOk(formName){
      this.editYunFrom.comName = this.addpvalue
      this.editYunFrom.type = this.addpvalue1
      this.editYunFrom.state = this.addpvalue2
        console.log('新增',  this.editYunFrom)
        // return
       const {data: res} = await this.$http.post('/userNonMot/addNonMot',null, {params: this.editYunFrom})
       console.log('修改返回数据', res)
       if(res.code === 1001){
           this.$message.success('修改成功')
           this.getDataEq()
           this.isEditYun = false
           this.$refs[formName].resetFields();
          
       }else{
           this.$message.error('修改失败')
            this.isEditYun = false
            this.$refs[formName].resetFields();
       }
        this.addpvalue = ''
        this.addpvalue1 = ''
        this.addpvalue2 = ''
    },
    // 编辑按钮
      editClick(scope){
        console.log('scope',scope)
        this.addYunFrom.id = scope.id
        this.addYunFrom.userId = scope.userId
        this.addYunFrom.number = scope.number

        this.addpvalue = scope.comName
        this.addpvalue1 = scope.type
        this.addpvalue2 = scope.state
        this.isaddYun = true
      },
      //删除按钮
     deleteClick(scope){
        console.log('scope', scope)
        this.$confirm("此操作将永久删除该房屋信息，是否继续？")
        .then(async () => {
          // return
           const {data: res} = await this.$http.post('/userNonMot/deleteNonMot',null, {params:{
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
    // 导入数据删除
    deleteClickd(scope){
      console.log('scope', scope)
        this.$confirm("此操作将永久删除该房屋信息，是否继续？")
        .then(async () => {
          // return
           const {data: res} = await this.$http.post('/nonMot/deleteNonMot',null, {params:{
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
    // 导入 编辑按钮
    editClickd(scope){
      console.log('scope', scope)
      this.daoruaddDataForm1 = scope
      this.startTime = scope.startTime
      this.addpvalue = scope.comName
      this.isDaoruadd1 = true
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handSuccess(file, fileList){
      // console.log('fileList', file, this.fileList)
      console.log('res',file);
      if(file.code == 1002){
        this.addYunFrom.img = file.data[0]
        console.log(this.addYunFrom)
      }
    },
    handleRemove1(file, fileList1) {
      // console.log(file, fileList);
    },
    handlePreview1(file) {
      
    },
    handleExceed1(files, fileList1) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList1.length} 个文件`);
    },
    beforeRemove1(file, fileList1) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handSuccess1(file, fileList1){
      // console.log('fileList', file, this.fileList)
      console.log('res',file);
      if(file.code == 1002){
        this.editYunFrom.img = file.data[0]
        console.log(this.editYunFrom)
      }
    }
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

