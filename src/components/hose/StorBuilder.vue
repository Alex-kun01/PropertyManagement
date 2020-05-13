<template>
  <div class="storBuilder_box">
    <!-- 房屋列表 -->
    <div class="storBuilder">
      <el-breadcrumb
        style="margin-bottom: 10px;"
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>房屋管理</el-breadcrumb-item>
        <el-breadcrumb-item>房屋列表</el-breadcrumb-item>
      </el-breadcrumb>

<!-- inportHouseUser/importMes  house/houseImport -->
      <div class="add_btn">
        <el-button type="primary" @click="addBuilder">添加房屋</el-button>
        <el-upload
          style="margin-top:10px;display:inline-block;"
          class="upload-demo"
          action="http://192.168.31.111:8090/inportHouseUser/importMes"
          :on-preview="handlePreview"
          :on-success="uploadSuccess"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :on-exceed="handleExceed"
          accept="excel"
        >
          <el-button @click="showTit" type="danger">导入房屋表格(excel)</el-button>
        </el-upload>



          <a href="https://fsllnb.oss-cn-chengdu.aliyuncs.com/excel/416%E6%9C%80%E6%96%B0%E6%88%BF%E5%B1%8B%E7%99%BB%E8%AE%B0%E5%BD%95%E5%85%A5%E8%B5%84%E6%96%99%E7%89%88%E6%9C%AC.xlsx">
          <el-button type="success">下载Excel导入模板</el-button>
          </a>
          <!-- <el-button  type="warning">导出房屋表格(excel)</el-button> -->

      </div>
      
      <template>
        <el-table :data="showList" border style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="buildingName"
            label="楼栋"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="unitHouseName"
            label="单元"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="area"
            label="面积(平米)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="communityName"
            label="社区"
            align="center"
          ></el-table-column>
          <el-table-column prop="canUse" label="状态" align="center">
            <template slot-scope="scope">
              <span style="color: #f40;" v-if="scope.row.canUse == 0"
                >不可用</span
              >
              <span style="color: #53c553;" v-if="scope.row.canUse == 1"
                >可用</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="publishTime"
            label="发表时间"
            align="center"
            width="200"
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
      title="添加房屋"
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
        <el-form-item label="小区名" prop="communityName">
          <el-input
            type="pAccount"
            v-model="addBuilderFrom.communityName"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input
            type="pPassword"
            v-model="addBuilderFrom.address"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="楼栋" prop="buildingName">
          <el-input
            type="pPassword"
            v-model="addBuilderFrom.buildingName"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="具体房号" prop="unitHouseName">
          <el-input
            type="pPassword"
            v-model="addBuilderFrom.unitHouseName"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="房子面积" prop="area">
          <el-input
            type="pPassword"
            v-model="addBuilderFrom.area"
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
      title="修改信息"
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
        <el-form-item label="小区名" prop="communityName">
          <el-input
            type="pAccount"
            v-model="editBuilderFrom.communityName"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input
            type="pPassword"
            v-model="editBuilderFrom.address"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="楼栋" prop="buildingName">
          <el-input
            type="pPassword"
            v-model="editBuilderFrom.buildingName"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="具体房号" prop="unitHouseName">
          <el-input
            type="pPassword"
            v-model="editBuilderFrom.unitHouseName"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="房子面积" prop="area">
          <el-input
            type="pPassword"
            v-model="editBuilderFrom.area"
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
      addBuilderFrom: {
        // 添加房屋信息数据
        communityName: "",
        address: "",
        buildingName: "",
        unitHouseName: "",
        area: ""
      },
      addBuliderRules: {
        // 添加房屋对话框填写规则
        communityName: [
          { required: true, message: "请填写小区名", trigger: "blur" }
        ],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }],
        buildingName: [
          { required: true, message: "请填楼栋", trigger: "blur" }
        ],
        unitHouseName: [
          { required: true, message: "请填具体房号", trigger: "blur" }
        ],
        area: [{ required: true, message: "请填写房子面积", trigger: "blur" }]
      },
      // 编辑
      isEditBuilder: false,
      editBuilderFrom: {
        id: "",
        communityName: "",
        buildingName: "",
        unitHouseName: "",
        canUse: 1,
        publishTime: "",
        address: "",
        area: 110
      },
      editBuilderRules: {
        communityName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        buildingName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        unitHouseName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        publishTime: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        address: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        area: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
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

    // 导入房屋表格
    addBuilderExcel() {},

    // 请求数据
    getData() {
      this.$http.get("/house/checkAllHouse").then(res => {
        if (res.data.code == 1002) {
          this.total = res.data.data.length;
          this.storbuilderList = res.data.data;
          this.showList = publicFun.filterList(
            this.current,
            this.size,
            this.storbuilderList
          );
        }
      });
    },
    // 每页显示条数变化
    handleSizeChange(newSize) {
      this.size = newSize;
      this.showList = publicFun.filterList(
        this.current,
        this.size,
        this.storbuilderList
      );
    },
    // 当前页码变化
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      this.showList = publicFun.filterList(
        this.current,
        this.size,
        this.storbuilderList
      );
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
    addBuilderOk(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .get("/house/addHouse", { params: this.addBuilderFrom })
            .then(res => {
              this.getData();
              this.isAddBuilder = false;

              this.$message({
                message: "添加成功",
                type: "success"
              });

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
      this.$confirm("此操作将永久删除该房屋信息，是否继续？")
        .then(() => {
          this.$http
            .post("/house/delHouse", null, { params: { houseId: scope.id } })
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
    // 编辑按钮
    editBuilder(scope) {
      console.log(scope);
      this.editBuilderFrom = scope;
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = {
            houseId: this.editBuilderFrom.id,
            communityName: this.editBuilderFrom.communityName,
            address: this.editBuilderFrom.address,
            buildingName: this.editBuilderFrom.buildingName,
            unitHouseName: this.editBuilderFrom.unitHouseName,
            area: this.editBuilderFrom.area
          };
          console.log(this.editBuilderFrom);
          this.$http
            .post("/house/editHouse", null, { params: data })
            .then(res => {
              this.getData();
              this.isEditBuilder = false;

              this.$message({
                message: "添加成功",
                type: "success"
              });

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
