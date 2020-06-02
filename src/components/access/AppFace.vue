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
          <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
          <el-table-column prop="proName" label="小区名" align="center"></el-table-column>
          <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" align="center">
              <template slot-scope="scope">
                 <span v-if="scope.row.sex == 1">男</span>
                 <span v-else>女</span>
              </template>
          </el-table-column>
          <el-table-column prop="img" label="图片" align="center">
              <template slot-scope="scope">
                  <img style="width: 100%; height: 100px;" :src="scope.row.img" alt="">
              </template>
          </el-table-column>
          <el-table-column prop="state" label="状态" align="center">
            <template slot-scope="scope">
              <span style="color: #999;" v-if="scope.row.state == 0">未审核</span>
              <span style="color: green;" v-if="scope.row.state == 1">已同意</span>
              <span style="color: red;" v-if="scope.row.state == 2">已拒绝</span>
            </template>
          </el-table-column>
          <el-table-column prop="refuseReason" label="拒绝理由" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.state == 0" @click="editClick(scope.row)" type="primary" size="mini">审核</el-button>
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
          <el-form-item label="用户ID" prop="userId">
            <el-input type="userId" v-model="addYunFrom.userId" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="小区名" prop="proName">
            <el-input type="proName" v-model="addYunFrom.proName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="用户姓名" prop="userName">
            <el-input type="userName" v-model="addYunFrom.userName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="手机号码" prop="phone">
            <el-input type="phone" v-model="addYunFrom.phone" autocomplete="off"></el-input>
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

          <el-form-item label="性别" prop="sex">
            <!-- <el-input type="sex" v-model="addYunFrom.sex" autocomplete="off"></el-input> -->
            <el-select v-model="addYunFrom.sex" placeholder="选择性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>


        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addYunNo('addYundRef')">取 消</el-button>
          <el-button type="primary" @click="addYunOk('addYundRef')">确 定</el-button>
        </span>
      </el-dialog>


       <!-- 编辑对话框 -->
      <el-dialog title="添加人脸" :visible.sync="isEditYun" width="30%" :before-close="editYunClose">
        <el-form
          :model="editYunFrom"
          :rules="editYunRules"
          ref="editYundRef"
          label-width="100px"
          class="addpolice_from"
        >
          <el-form-item label="用户ID" prop="id">
            <el-input disabled type="id" v-model="editYunFrom.id" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="审核" prop="state">
            <el-select v-model="editYunFrom.state" placeholder="选择">
              <el-option label="通过" value="1"></el-option>
              <el-option label="拒绝" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="editYunFrom.state == 2" label="拒绝理由" prop="reason">
            <el-input v-model="editYunFrom.reason" autocomplete="off"></el-input>
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
require('../../assets/base64')
export default {
  data() {
    return {
      fileList: [],
      fileList2: [],
      size: 10, // 一页显示条数
      pages: 1, //总页数
      current: 1, // 当前页码
      total: 0, // 总共条数
      targetData: [], // 渲染数据
      isAddYun: false, // 是否展示新增对话框
      shenheForm: {

      },
      comName: '', //小区名
      scope: '', //选中 数据
      addYunFrom: {
        // 新增数据
        userId: '',
        proName:'',
        userName: '',
        phone: '',
        img: '',
        sex: ''
      },
      addYunRules: {
        //新增数据规则
        userId: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        proName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        img: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        sex: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ]
      },
      isEditYun: false, // 编辑
      editYunFrom: {
        id: '',
        state: '',
        reason: ''
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
    // this.getData();
    this.gteDateTest(this.current, this.size)
  },
  methods: {

    async gteDateTest(current,size){
      let datat = {
        current,
        size
      }
      console.log('传参', datat)
           const {data:res} = await this.$http.post('/faceImg/lookAllImg',null, {params:datat})
           console.log('test',res)
           if (res.code == 1002) {
            this.targetData = res.data.records;
            this.total = res.data.total;
          } else {
            this.$message({
              message: "服务器请求出错",
              type: "danger"
            });
          }
        },
    // async getData() {

    //   const { data: res } = await this.$http.post(
    //     "/faceApply/lookAllApply",
    //     null,
    //     {
    //       params: {
    //         current: this.current,
    //         size: this.size
    //       }
    //     }
    //   );
    //   console.log("appface数据", res);
    //   if (res.code == 1002) {
    //     this.targetData = res.data.records;
    //     this.total = res.data.total;
    //     // this.current = res.data.current;
    //   } else {
    //     this.$message({
    //       message: "服务器请求出错",
    //       type: "danger"
    //     });
    //   }
    // },
    // 每页显示条数变化
    handleSizeChange(newSize) {
      console.log('newSize',newSize)
      this.size = newSize;
      this.gteDateTest(this.current, this.size)
    },
    // 当前页变化
    handleCurrentChange(newCurrent) {
      console.log('newCurrent',newCurrent)
      this.current = newCurrent;
      this.gteDateTest(this.current, this.size)
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
   addYunOk(formName) {
       let _this = this
        console.log(this.addYunFrom) 
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;

        if (!myreg.test(this.addYunFrom.phone)){
            this.$message.error('请输入正确的手机号')
            return
        }


        this.$refs[formName].validate( async valid => {
        if (valid) {


         console.log(this.addYunFrom)
         const { data: res } = await _this.$http.post("/faceImg/appAddFace",null, { params: this.addYunFrom })
         console.log(res)
         if(res.code == 1000){
             this.$message({
                 message: '添加成功',
                 type: 'success'
             })
             this.fileList = []
             this.isAddYun = false
             this.gteDateTest()
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
    // 处理人脸添加
    faceAddNum(){
      console.log('我执行了')
      this.getBaseUlr(this.scope.img, baseUrl =>{
          
          let newBaseUrl = 'data:image/jpeg;base64,' + baseUrl
          // console.log(newBaseUrl)x
          let file = this.changeFile(newBaseUrl, 'imgname')
          console.log('转换的file文件', file)

            this.getcomEnum(eNumStr =>{
              this.shenheForm = {
                userName: this.scope.userName,
                faceType: 1,
                phone: this.scope.phone,
                sex: this.scope.sex,
                faceImg: file,
                eNumStr: null
              }
              const staticobj = {
                key:'e098214294ad13f23e16ae5ebecf970d',
                token:'1bbd886460827015e5d605ed44252251'
            }
            

              eNumStr.forEach(async item =>{
                console.log('查看原数据', this.shenheForm)
                this.shenheForm.eNumStr = item
                console.log('查看原数据', this.shenheForm)
                let formData = new FormData()
                

                for(let key in this.shenheForm){
                    formData.append(key, this.shenheForm[key]) 
                }
                console.log('查看所需的数据', formData)

                // 拿到人脸数据处理
                const { data:res } = await this.$http.post('http://www.hbzayun.com/ACSystem/openApi/addFace', formData, {params: staticobj})
                console.log('请求后返回的数据', res)

              })
            
          }) 
        })
    },
    // 编辑提交
    editYunOk(formName){
        this.$refs[formName].validate( async valid => {
        if (valid) {
            console.log('通过',this.editYunFrom)
           if(this.editYunFrom.state == '2' && this.editYunFrom.reason == ''){
              this.$message('请填写拒绝理由')
               return
            }else{
              const {data:res} = await this.$http.post('/faceImg/aggreAddFace',null, {params: this.editYunFrom})
               console.log('审核返回数据', res)
               if(res.code === 1000){
                 this.$message({
                    message: '审核成功',
                    type: 'success'
                  })
                 this.isEditYun = false
                 this.gteDateTest()
                 this.$refs[formName].resetFields();
               }else{
                 this.$message('审核失败')
                 this.isEditYun = false
               }
            }
            
           
           


            // if(this.editYunFrom.state == '1'){
            //   // 通过处理添加人脸
            //   this.faceAddNum()
            // }
            // // return
            // const { data: res } = await this.$http.post('/faceApply/checkFace', null, { params: this.editYunFrom })
            // console.log('审核返回数据', res)
            // if(res.code == 1000){
            //   this.$message({
            //     message: '审核成功',
            //     type: 'success'
            //   })
            //   this.isEditYun = false
            //   this.gteDateTest()
            //  this.$refs[formName].resetFields();
            // }else{
            //   this.$message('审核失败')
            // }
        } else {
          this.$message({
            message: "Error",
            type: "warning"
          });
          return false;
        }
      });
    },
    //根据小区名查询设备编号
   async getcomEnum(callBack){
      const {data:res} = await this.$http.post('/faceImg/lookEnum', null, {params: {comName: this.comName}})
      console.log('获取小区设备编号', res)
      if(res.code == 1002){
        callBack(res.data)
      }
    },
    // 根据url获取base64数据流
   async getBaseUlr(url,callBack){
      const {data:res} = await this.$http.post('/faceImg/base64', null, {params: {url:url}})
      console.log('url转base64格式返回数据', res)
      callBack(res.data)
    },
    // 将base64字符串转换成文件（file）
    changeFile(dataurl, filename){
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
          u8arr = new Uint8Array(n);
      while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    // 转换formData
    changeFormData(obj){
      let formData = new FormData()
      // formData.append('faceImg', this.addFaceIdFrom.faceImg)
      for(let key in obj){
        formData.append(key.toString, obj[key])
        
      }
      console.log('formData', formData)
      return formData
    },
    //审核按钮
    editClick(scope){
        console.log('scope', scope)
        // 准备人脸添加接口依赖数据
        this.comName = scope.proName
        this.scope = scope
        this.editYunFrom.id = scope.id
        this.isEditYun = true
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
