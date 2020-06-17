<template>
  <div class="storBuilder_box">
    <!-- 生活费管理 -->
    <div class="storBuilder">
      <el-breadcrumb
        style="margin-bottom: 10px;"
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>生活费管理</el-breadcrumb-item>
      </el-breadcrumb>

<!-- inportHouseUser/importMes  house/houseImport -->
      <div class="add_btn">
        <el-button type="primary" @click="addBuilder">添加</el-button>
        <el-upload
          style="margin-top:10px;display:inline-block;"
          class="upload-demo"
          action="http://wy.scfsll.com:8090/useDetails/importMes"
          :on-preview="handlePreview"
          :on-success="uploadSuccess"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :on-exceed="handleExceed"
          accept="excel"
        >
          <el-button @click="showTit" type="danger">导入表格(excel)</el-button>
        </el-upload>



          <a href="http://fsllnb.oss-cn-chengdu.aliyuncs.com/xlsx/生活费模板.xlsx">
          <el-button type="success">下载Excel导入模板</el-button>
          </a>
          <!-- <el-button  type="warning">导出房屋表格(excel)</el-button> -->

      </div>
      <template>
        <el-table :data="showList" border style="width: 100%">
          <el-table-column
            prop="measure"
            label="使用量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="创建时间"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="cellName"
            label="小区名"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="buildingNo"
            label="楼栋编号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="specificRoomNo"
            label="具体房号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="propertyOwner"
            label="产权人"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="idCard"
            label="身份证号"
            align="center"
          ></el-table-column>
          
          <el-table-column align="center" width="200" label="操作">
            <template slot-scope="scope">
             
              <el-button
                @click="editBuilder(scope.row)"
                size="mini"
                type="primary"
                ><i class="el-icon-edit"></i>编辑</el-button
              >
              <el-button
                @click="deleteBuilder(scope.row)"
                size="mini"
                type="danger"
                ><i class="el-icon-delete"></i>删除</el-button
              >
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
        >
        </el-pagination>
      </div>
    </div>

    <!-- 新增对话框 -->
    <el-dialog
      title="添加"
      :visible.sync="isAddBuilder"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="addBuilderFrom"
        :rules="addBuliderRules"
        ref="addBuilderRef"
        label-width="100px"
        class="addpolice_from"
      >

        <el-form-item label="使用量" prop="measure">
          <el-input
            type="measure"
            v-model="addBuilderFrom.measure"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="收费类型" prop="type">
          <el-select v-model="addpvalue3" placeholder="请选择">
                <el-option
                v-for="(item,index) in addpolicecomName3"
                :key="index"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>


        <el-form-item label="小区名称" prop="cellName">
            <el-select v-model="addpvalue7" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName7"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="楼栋编号" prop="buildingNo">
          <el-input
            type="buildingNo"
            v-model="addBuilderFrom.buildingNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>

      <el-form-item label="	具体房号" prop="specificRoomNo">
          <el-input
            type="specificRoomNo"
            v-model="addBuilderFrom.specificRoomNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>


      <el-form-item label="产权人" prop="propertyOwner">
          <el-input
            type="propertyOwner"
            v-model="addBuilderFrom.propertyOwner"
            autocomplete="off"
          ></el-input>
        </el-form-item>

      <el-form-item label="手机号码" prop="phone">
          <el-input
            type="phone"
            v-model="addBuilderFrom.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="身份证号码" prop="idCard">
          <el-input
            type="idCard"
            v-model="addBuilderFrom.idCard"
            autocomplete="off"
          ></el-input>
        </el-form-item>


      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addbuilderNo('addBuilderRef')">取 消</el-button>
        <el-button type="primary" @click="addBuilderOk('addBuilderRef')"
          >提交</el-button
        >
      </span>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog
      title="修改"
      :visible.sync="isEditBuilder"
      width="30%"
      :before-close="editHandleClose"
    >
      <el-form
        :model="editBuilderFrom"
        :rules="editBuilderRules"
        ref="editBuilderRef"
        label-width="100px"
        class="addpolice_from"
      >
       <el-form-item label="使用量" prop="measure">
          <el-input
            type="measure"
            v-model="editBuilderFrom.measure"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="收费类型" prop="type">
          <el-select v-model="addpvalue3" placeholder="请选择">
                <el-option
                v-for="(item,index) in addpolicecomName3"
                :key="index"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>


        <el-form-item label="小区名称" prop="cellName">
            <el-select v-model="addpvalue7" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName7"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="楼栋编号" prop="buildingNo">
          <el-input
            type="buildingNo"
            v-model="editBuilderFrom.buildingNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>

      <el-form-item label="	具体房号" prop="specificRoomNo">
          <el-input
            type="specificRoomNo"
            v-model="editBuilderFrom.specificRoomNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>


      <el-form-item label="产权人" prop="propertyOwner">
          <el-input
            type="propertyOwner"
            v-model="editBuilderFrom.propertyOwner"
            autocomplete="off"
          ></el-input>
        </el-form-item>

      <el-form-item label="手机号码" prop="phone">
          <el-input
            type="phone"
            v-model="editBuilderFrom.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="身份证号码" prop="idCard">
          <el-input
            type="idCard"
            v-model="editBuilderFrom.idCard"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editBuilderNo('editBuilderRef')">取 消</el-button>
        <el-button type="primary" @click="editBuilderOk('editBuilderRef')"
          >提交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import publicFun from "../../store/public.js";
export default {
  data() {
    return {
      size: 10, // 一页显示条数
      current: 1, // 当前页码
      total: 0, // 总共的页数
      storbuilderList: [], //  所有数据列表
      showList: [], // 渲染列表
      isAddBuilder: false, // 添加房屋对话框显示
      fileList: [], // 文件列表
      addpvalue:'',
      addpolicecomName: [],
      addpvalue3: '',
      addpolicecomName3: [], // 费用类别
      addpvalue7: '',
      addpolicecomName7: [], // 小区名
      addBuilderFrom: {
        type: '',
        measure: "",
        cellName: "",
        buildingNo: "",
        specificRoomNo: "",
        propertyOwner: "",
        phone: "",
        idCard: "",
      },
      addBuliderRules: {
        // 添加房屋对话框填写规则
        type: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        measure: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        cellName: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        buildingNo: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        specificRoomNo: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        communityName: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        propertyOwner: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        idCard: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
      },
      // 编辑
      isEditBuilder: false,
      editBuilderFrom: {
        id: "",
        type: '',
        measure: "",
        cellName: "",
        buildingNo: "",
        specificRoomNo: "",
        propertyOwner: "",
        phone: "",
        idCard: "",
      },
      editBuilderRules: {
        type: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        measure: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        cellName: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        buildingNo: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        specificRoomNo: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        communityName: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        propertyOwner: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        idCard: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
      }
    };
  },
  mounted() {
    this.gettype()
    this.getComName()
    this.getData();
  },
  methods: {
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
            this.addpolicecomName7 = dataArr
            console.log('小区列表', this.addpolicecomName7 )
        },
      // 文件上传提示
      showTit(){ // 请先导入该小区的收费标准
        this.$alert('请先导入该小区的收费标准，若没有导入收费标准，会导致数据出错', '警告', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'success',
              message: '已确认'
            });
          }
        });
      },
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
    // 获取费用类别数据
        async gettype(){
            const {data:res} = await this.$http.post('/expenseCategory/getExpenseCategoryList')
            console.log('费用类别数据', res)
            if(res.code === 1003){
                let data = res.data || []
                let dataArr = []
                let index = 1
                data.forEach(item=>{
                    let options = {
                        value: item.type,
                        label: item.type
                    }
                    dataArr.push(options)
                })
                this.addpolicecomName3 = dataArr
                console.log('小区列表', this.addpolicecomName )
            }else{
                this.$message.error('费用类别数据获取失败')
            }
        },

    // 导入房屋表格
    addBuilderExcel() {},

    // 请求数据
    async getData() {
        const {data:res} = await this.$http.post('/useDetails/getUseDetailsPage', null, {params: {
            current: this.current,
            size: this.size
        }})
        console.log('生活费返回数据', res)
        if(res.code === 1003){
            this.showList = res.data.records
            this.total = res.data.total
        }else{
            this.$message.warning('数据列表获取失败')
        }
    },
    // 每页显示条数变化
    handleSizeChange(newSize) {
      this.size = newSize;
       this.getData()
    },
    // 当前页码变化
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      this.getData()
    },
    // 添加房屋按钮
    addBuilder() {
      this.isAddBuilder = true;
    },
    // 关闭添加房屋对话框
    handleClose() {
      this.isAddBuilder = false;
    },
    addbuilderNo(formName) {
      this.isAddBuilder = false;
      this.$refs[formName].resetFields();
    },
    // 新增提交
    addBuilderOk(formName) {
      this.addBuilderFrom.type = this.addpvalue3
      this.addBuilderFrom.cellName = this.addpvalue7
      console.log('传递参数',  this.addBuilderFrom)
    //   return
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/useDetails/addorupdate",null, { params: this.addBuilderFrom })
            .then(res => {
                console.log('新增生活费返回数据', res)
                if(res.code === 1003){
                    this.getData();
                    this.addpvalue3 = ''
                    this.addpvalue7 = ''
                    this.isAddBuilder = false;

                    this.$message({
                        message: "添加成功",
                        type: "success"
                    });
                }else{
                    this.$message.error('添加失败')
                }
              

              this.$refs[formName].resetFields();
            })
            .catch(res => {
              console.log(res);
            });
        } else {
          this.$message({
            message: "Error",
            type: "warning"
          });
          return false;
        }
      });
    }, 
    // 删除房屋
    deleteBuilder(scope) {
      this.$confirm("此操作将永久删除该条信息，是否继续？")
        .then(() => {
          this.$http
            .post("/useDetails/delete", null, { params: { id: scope.id } })
            .then(res => {
              if (res.data.code == 1001) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getData();
              } else {
                this.$message({
                  message: "删除失败",
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
    // 跳转使用明细
    gotoDetauls(scope){
      console.log('scope', scope)
      this.$router.push({ name: 'usagedetails', params: { id: scope.id }})
    },
    // 编辑按钮
    editBuilder(scope) {
      console.log(scope);
      this.editBuilderFrom = scope;
      this.addpvalue3 = scope.type
      this.addpvalue7 = scope.cellName
      this.isEditBuilder = true;
      console.log(this.editBuilderFrom);
    },
    // 关闭编辑对话框
    editHandleClose() {
      this.isEditBuilder = false;
    },
    // 取消编辑
    editBuilderNo(formName) {
      this.isEditBuilder = false;
      this.$refs[formName].resetFields();
    },
    // 确认编辑
    editBuilderOk(formName) {
      this.editBuilderFrom.type = this.addpvalue3
      this.editBuilderFrom.cellName = this.addpvalue7
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.editBuilderFrom);
          this.$http
            .post("/useDetails/addorupdate", null, { params: this.editBuilderFrom })
            .then(res => {
                console.log('修改生活费返回数据', res)
                if(res.data.code === 1001){
                    this.getData();
                    this.isEditBuilder = false;
                    this.addpvalue3 = ''
                    this.addpvalue7 = ''
                    this.$message({
                        message: "修改成功",
                        type: "success"
                    });
                }else{
                    this.$message.error('修改失败')
                }
              

              this.$refs[formName].resetFields();
            })
            .catch(res => {
              console.log(res);
            });
        } else {
          this.$message({
            message: "Error",
            type: "warning"
          });
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
}
.storBuilder_box {
  width: 100%;
  height: 100%;
  overflow: scroll;

  .add_btn {
    margin-bottom: 10px;
  }
  .storBuilder {
    width: 100%;
    height: 100%;

    .paging {
      display: flex;
      justify-content: center;
      margin: 10px 0;
    }
  }
}
</style>
