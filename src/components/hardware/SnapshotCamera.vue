<template>
  <div class="yunIntercom_box">
    <div class="yunIntercom">
      <!-- 抓拍摄像头 -->
      <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>硬件管理</el-breadcrumb-item>
        <el-breadcrumb-item>抓拍摄像头</el-breadcrumb-item>
      </el-breadcrumb>

      <el-button @click="isAddYun = true" style="margin-bottom:10px;" type="primary">新增</el-button>

      <!-- 云对讲列表 -->
      <template>
        <el-table :data="targetData" border style="width: 100%">
          <el-table-column type="index" label="#" align="center"></el-table-column>
          <el-table-column prop="eName" label="设备名" align="center"></el-table-column>
          <el-table-column prop="eIp" label="设备IP" align="center"></el-table-column>
          <el-table-column prop="communityName" label="小区名称" align="center"></el-table-column>
          <el-table-column prop="location" label="位置" align="center"></el-table-column>
          <el-table-column prop="deviceMac" label="设备地址" align="center"></el-table-column>
          <el-table-column prop="canUse" label="是否可用" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.canUse == 1">可用</span>
              <span v-else>不可用</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="editClick(scope.row)" type="primary" size="mini">编辑</el-button>
              <el-button @click="deleteClick(scope.row)" type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 分页 数据较少暂不分页 -->
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
          <el-form-item label="设备名称" prop="eName">
            <el-input type="eName" v-model="targetDataForm.eName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="设备IP" prop="eIp">
            <el-input type="eIp" v-model="targetDataForm.eIp" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="设备地址" prop="deviceMac">
            <el-input type="" v-model="targetDataForm.deviceMac" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="小区名称" prop="communityName">
            <el-input
              type="communityName"
              v-model="targetDataForm.communityName"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="位置" prop="location">
            <el-input
              :disabled="false"
              type="location"
              v-model="targetDataForm.location"
              autocomplete="off"
            ></el-input>
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
            <el-input type="id" disabled v-model="editYunFrom.id" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="设备名称" prop="eName">
            <el-input type="eName" v-model="editYunFrom.eName" autocomplete="off"></el-input>
          </el-form-item>

        <el-form-item label="设备IP" prop="eIp">
            <el-input type="eIp" v-model="editYunFrom.eIp" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="小区名称" prop="communityName">
            <el-input type="communityName" v-model="editYunFrom.communityName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="设备地址" prop="deviceMac">
            <el-input type="" v-model="editYunFrom.deviceMac" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="位置" prop="location">
            <el-input
              :disabled="false"
              type="location"
              v-model="editYunFrom.location"
              autocomplete="off"
            ></el-input>
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
      targetDataForm: {
        eName: "",
        eIp: "",
        communityName: "",
        location: "",
        deviceMac:''
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
        deviceMac: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
      },
      isEditYun: false, // 编辑
      editYunFrom: {
        id: "",
        eName: "",
        eIp: "",
        communityName: "",
        location: "",
        deviceMac: ''
      },
      editYunRules: {
        //新增数据规则
        id: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
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
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const { data: res } = await this.$http.post(
        "/faceCamera/lookFaceCamera",
        null,
        {
          params: {
            current: this.current,
            size: this.size
          }
        }
      );
      console.log("抓拍摄像头返回数据 ", res);
      if (res.code == 1002) {
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
    editYunClose() {
      this.isEditYun = false;
    },
    addYunNo(formName) {
      this.isAddYun = false;
      this.$refs[formName].resetFields();
      this.fileList = [];
    },
    editYunNo(formName) {
      this.isEditYun = false;
      this.$refs[formName].resetFields();
      this.fileList2 = [];
    },
    // 新增提交
    addYunOk(formName) {
      let _this = this;
      console.log(this.addYunFrom);
      this.$refs[formName].validate(async valid => {
        if (valid) {
          console.log("满足条件", _this.targetDataForm);
          const {
            data: res
          } = await this.$http.post("/faceCamera/addFaceCamera", null, {
            params: _this.targetDataForm
          });
          console.log(res);
          if (res.code == 1000) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.targetDataForm = {
              eName: "",
              eIp: "",
              communityName: "",
              location: ""
            };
            this.getData();
            this.isAddYun = false;
          } else {
            this.$message({
              message: "添加失败",
              type: "danger"
            });
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
    editYunOk(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          console.log(this.editYunFrom);
          // return
          const {
            data: res
          } = await this.$http.post("/faceCamera/editFaceCamera", null, {
            params: this.editYunFrom
          });
          console.log("修改返回数据", res);
          if (res.code == 1000) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.isEditYun = false;
            this.getData();
            this.$refs[formName].resetFields();
          } else {
            this.$message("修改失败");
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
    editClick(scope) {
      console.log("scope", scope);
      this.editYunFrom = scope;
      this.isEditYun = true;
    },
    // 删除按钮
    deleteClick(scope) {
      this.$confirm("此操作将永久删除该房屋信息，是否继续？")
        .then(async () => {
          console.log(scope);
          const { data: res } = await this.$http.post(
            "/faceCamera/deleteFaceCamera",
            null,
            {
              params: {
                id: scope.id
              }
            }
          );
          console.log("删除返回", res);
          if (res.code === 1001) {
            this.$message.success("删除成功");
            this.getData();
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {
          this.$message({
            message: "已取消",
            type: "info"
          });
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
