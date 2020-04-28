<template>
  <div class="edition_box">
    <!-- 版本管理 -->
    <div class="edition">
      <el-breadcrumb
        style="margin-bottom: 10px;"
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>APP管理</el-breadcrumb-item>
        <el-breadcrumb-item>版本管理</el-breadcrumb-item>
      </el-breadcrumb>

      <template>
        <el-table :data="editionList" border style="width: 100%">
          <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
          <el-table-column prop="appType" align="center" label="app类型" width="150">
            <template slot-scope="scope">
              {{ scope.row.appType == 1 ? "用户端" : "安保端" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="代码"
            align="center"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="content"
            label="内容"
            align="center"
            width="250"
          ></el-table-column>
          <el-table-column prop="osType" align="center" label="系统类型" width="150">
            <template slot-scope="scope">
              {{ scope.row.osType == 0 ? "安卓" : "ISO" }}
            </template>
          </el-table-column>

          <el-table-column prop="status" align="center" label="状态" width="110">
            <template slot-scope="scope">
              <span style="color: #53c553" v-if="scope.row.status == 0"
                >普通更新</span
              >
              <span style="color: #f40" v-if="scope.row.status == 1"
                >强制更新</span
              >
            </template>
          </el-table-column>

          <el-table-column
            prop="url"
            label="链接"
            align="center"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="version"
            label="版本"
            align="center"
            width="180"
          ></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="editEdition(scope.row)"
                size="mini"
                type="primary"
                ><i class="el-icon-edit"></i>编辑</el-button
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

    <!-- 编辑版本对话框 -->
    <el-dialog
      title="修改版本信息"
      :visible.sync="isEditEdition"
      width="30%"
      :before-close="editHandleClose"
    >
      <el-form
        :model="editEdittionFrom"
        :rules="editEdittionRules"
        ref="editEdittionRef"
        label-width="100px"
        class="addpolice_from"
      >
        <el-form-item label="状态" prop="status">
          <el-select v-model="editEdittionFrom.status" placeholder="请选择">
            <el-option label="普通更新" value="0"></el-option>
            <el-option label="强制更新" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="版本" prop="version">
          <el-input
            type="version"
            v-model="editEdittionFrom.version"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="代码" prop="code">
          <el-input
            type="code"
            v-model="editEdittionFrom.code"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="系统类型" prop="osType">
          <el-select v-model="editEdittionFrom.osType" placeholder="请选择">
            <el-option label="安卓" value="0"></el-option>
            <el-option label="IOS" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="app类型" prop="appType">
          <el-select v-model="editEdittionFrom.appType" placeholder="请选择">
            <el-option label="用户端" value="1"></el-option>
            <el-option label="保安端" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="链接" prop="url">
          <el-input
            type="url"
            v-model="editEdittionFrom.url"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-input
            type="content"
            v-model="editEdittionFrom.content"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editEdittionOn('editEdittionRef')">取 消</el-button>
        <el-button type="primary" @click="editEditionOk('editEdittionRef')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      size: 10, // 一页显示条数
      current: 1, // 当前页码
      total: 0, // 总共的页数
      editionList: [], // 所有数据列表
      showList: [], // 渲染数据列表
      isEditEdition: false, // 编辑对话框显示
      editEdittionFrom: {
        // 编辑版本信息数据
        id: "",
        status: "",
        version: "",
        code: "",
        osType: "",
        appType: "",
        url: "",
        content: ""
      },
      editEdittionRules: {
        // 编辑版本信息填写规则
        status: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        version: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        code: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        osType: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        appType: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        url: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        content: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 请求数据
    getData() {
      this.$http.get("/version/list").then(res => {
        this.size = res.data.data.size;
        this.current = res.data.data.current;
        this.total = res.data.data.total;
        this.editionList = res.data.data.records;
        console.log("请求回来的数据", res.data);
      });
    },
    // 编辑按钮
    editEdition(scope) {
      console.log("scope", scope);

      this.editEdittionFrom.id = scope.id;
      if (scope.status == 0) this.editEdittionFrom.status = "普通更新";
      if (scope.status == 1) this.editEdittionFrom.status = "强制更新";
      this.editEdittionFrom.version = scope.version;
      this.editEdittionFrom.code = scope.code;
      this.editEdittionFrom.osType = scope.osType == 0 ? "安卓" : "IOS";
      this.editEdittionFrom.appType = scope.appType == 1 ? "用户端" : "安保端";
      this.editEdittionFrom.url = scope.url;
      this.editEdittionFrom.content = scope.content;
      this.isEditEdition = true;
      console.log("oooo", this.editEdittionFrom);
    },
    // 确定修改
    editEditionOk(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 框架的坑，无脑判断
          if (
            this.editEdittionFrom.osType != 0 ||
            this.editEdittionFrom.osType != 1
          ) {
            if (this.editEdittionFrom.osType == "安卓") {
              this.editEdittionFrom.osType = 0;
            } else if (this.editEdittionFrom.osType == "IOS") {
              this.editEdittionFrom.osType = 1;
            }
          }
          if (
            this.editEdittionFrom.appType != 1 ||
            this.editEdittionFrom.appType != 2
          ) {
            if (this.editEdittionFrom.appType == "用户端") {
              this.editEdittionFrom.appType = 1;
            } else if (this.editEdittionFrom.appType == "安保端") {
              this.editEdittionFrom.appType = 2;
            }
          }
          if (
            this.editEdittionFrom.status != 1 ||
            this.editEdittionFrom.status != 2
          ) {
            if (this.editEdittionFrom.status == "普通更新") {
              this.editEdittionFrom.status = 0;
            } else if (this.editEdittionFrom.status == "强制更新") {
              this.editEdittionFrom.status = 1;
            }
          }
          this.$http
            .post("/version/edit", null, { params: this.editEdittionFrom })
            .then(res => {
              this.getData();
              this.isEditEdition = false;
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.$refs[formName].resetFields();
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
    // 取消修改
    editEdittionOn(formName) {
      this.isEditEdition = false;
      this.$refs[formName].resetFields();
    },
    // 关闭修改
    editHandleClose() {
      this.isEditEdition = false;
    },
    // 一页显示条数变化
    handleSizeChange(nweSize) {
      this.size = nweSize;
      this.getData();
    },
    // 当前页码变化
    handleCurrentChange(nweCurrent) {
      this.current = nweCurrent;
      this.getData();
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
.edition_box {
  width: 100%;
  height: 100%;
  overflow: scroll;
  .edition {
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
