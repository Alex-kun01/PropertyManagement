<template>
  <div class="garbage_box">
    <!-- 机动车收费标准 -->
    <div class="garbage">
      <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>机动车收费标准</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="margin-bottom:10px;">
        <el-button @click="isaddTool = true" type="primary">添加</el-button>
      </div>

      <template>
        <el-table :data="showList" border style="width: 100%">
          <el-table-column prop="id" label="id" align="center"></el-table-column>

          <el-table-column prop="comName" align="center" label="小区名"></el-table-column>

          <el-table-column prop="smallCar" align="center" label="小型车(元)"></el-table-column>

          <el-table-column prop="midCar" align="center" label="中型车(元)"></el-table-column>

          <el-table-column prop="bigCar" align="center" label="大型车(元)"></el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="edit(scope.row)" size="mini">
                <i class="el-icon-edit"></i>
                编辑
              </el-button>
              <el-button @click="deleteNewPrice(scope.row)" type="danger" size="mini">
                <i class="el-icon-delete"></i>删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 添加对话框 -->
      <el-dialog title="添加" :visible.sync="isaddTool" width="30%" :before-close="addHandleClose">
        <el-form
          :model="addTool"
          :rules="addToolRuls"
          ref="addToolRef"
          label-width="100px"
          class="addpolice_from"
        >
          <el-form-item label="小区名" prop="comName">
            <el-input type="comName" v-model="addTool.comName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="小型车" prop="smallCar">
            <el-input type="smallCar" v-model="addTool.smallCar" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="中型车" prop="midCar">
            <el-input type="midCar" v-model="addTool.midCar" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="大型车" prop="bigCar">
            <el-input type="bigCar" v-model="addTool.bigCar" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addToolOn('addToolRef')">取 消</el-button>
          <el-button type="primary" @click="addToolOk('addToolRef')">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改对话框 -->
      <el-dialog title="修改" :visible.sync="iseditTool" width="30%" :before-close="editHandleClose">
        <el-form
          :model="editTool"
          :rules="editToolRuls"
          ref="editToolRef"
          label-width="100px"
          class="addpolice_from"
        >
          <el-form-item label="小区名" prop="comName">
            <el-input type="comName" v-model="editTool.comName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="小型车" prop="smallCar">
            <el-input type="smallCar" v-model="editTool.smallCar" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="中型车" prop="midCar">
            <el-input type="midCar" v-model="editTool.midCar" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="大型车" prop="bigCar">
            <el-input type="bigCar" v-model="editTool.bigCar" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editToolOn('editToolRef')">取 消</el-button>
          <el-button type="primary" @click="editToolOk('editToolRef')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showList: [],
      iseditTool: false,
      editTool: {
        id: "",
        comName: "",
        smallCar: "",
        midCar: "",
        bigCar: ""
      },
      editToolRuls: {
        comName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        smallCar: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        midCar: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        bigCar: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ]
      },
      isaddTool: false,
      addTool: {
        id: "",
        comName: "",
        smallCar: "",
        midCar: "",
        bigCar: ""
      },
      addToolRuls: {
        comName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        smallCar: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        midCar: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        bigCar: [
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
        "/carStandard/lookAllStandard"
      );
      console.log("机动车收费标准返回数据", res);
      if (res.code == 1002) {
        this.showList = res.data;
      }
    },
    edit(scope) {
      this.iseditTool = true;
      this.editTool = scope;
    },
    editHandleClose() {
      this.iseditTool = false;
    },
    addHandleClose() {
      this.isaddTool = false;
    },
    editToolOn(formName) {
      console.log("点击取消");
      this.iseditTool = false;
      this.$refs[formName].resetFields();
    },
    // 提交修改
    editToolOk(formName) {
      console.log("修改点击");
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const {
            data: res
          } = await this.$http.post("/carStandard/editStandard", null, {
            params: this.editTool
          });
          console.log("修改返回的数据", res);
          if (res.code == 1001) {
            this.getData();
            this.$refs[formName].resetFields();
            this.iseditTool = false;
            this.$message({
              message: "修改成功",
              type: "success"
            });
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
    addToolOn(formName) {
      this.isaddTool = false;
      this.$refs[formName].resetFields();
    },
    // 新增
    addToolOk(formName) {
      console.log("修改点击");
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 新增数据
          const {
            data: res
          } = await this.$http.post("/carStandard/addStandard", null, {
            params: this.addTool
          });
          console.log("新增返回数据", res);
          if (res.code == 1001) {
            this.getData();
            this.$refs[formName].resetFields();
            this.isaddTool = false;
            this.$message({
              message: "添加成功",
              type: "success"
            });
          } else {
            this.$message("添加失败");
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
    deleteNewPrice(scope) {
      console.log(scope);
      this.$confirm("此操作将永久删除该房屋信息，是否继续？")
        .then(async () => {
          const { data: res } = await this.$http.post(
            "/carStandard/deleteStandard",
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
  .garbage_box {
    width: 100%;
    height: 100%;
    overflow: scroll;
    .garbage {
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