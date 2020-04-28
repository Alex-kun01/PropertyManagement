<template>
  <div class="community_box">
    <div class="community">
      <!-- 社区活动 -->
      <el-breadcrumb
        style="margin-bottom: 10px;"
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>APP管理</el-breadcrumb-item>
        <el-breadcrumb-item>社区活动</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="add_btn">
        <el-button @click="addBtn" type="primary">添加</el-button>
      </div>

      <el-table :data="showList" border style="width: 100%">
        <el-table-column prop="id" align="center" label="ID" width="40px"></el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          align="center"
          width="150px"
        ></el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          align="center"
          width="180px"
        ></el-table-column>
        <el-table-column
          prop="location"
          label="地点"
          align="center"
          width="180px"
        ></el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          align="center"
          width="180px"
        ></el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          align="center"
          width="180px"
        ></el-table-column>
        <el-table-column prop="img" align="center" label="图片" width="200px">
          <template slot-scope="scope">
            <img
              style="width: 100%; height: 100%; min-height: 200px;"
              :src="scope.row.img"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="isDel" label="是否删除" width="80px">
          <template slot-scope="scope">
            <span v-if="scope.row.canUse == 1">未删除</span>
            <span style="color: #f00;" v-else>已删除</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="publishTime"
          label="添加时间"
          align="center"
          width="180px"
        ></el-table-column>

        <el-table-column align="center" width="100" label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteGg(scope.row)" type="danger" size="mini"
              ><i class="el-icon-delete"></i>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

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
      title="添加活动"
      :visible.sync="isAddGg"
      width="50%"
      :before-close="addGgClose"
    >
      <el-form
        :model="addcommunityFrom"
        :rules="addcommunityRules"
        ref="addGgRef"
        label-width="100px"
        class="addpolice_from"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            type="title"
            v-model="addcommunityFrom.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-input
            type="content"
            v-model="addcommunityFrom.content"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="地点" prop="content">
          <el-input
            type="location"
            v-model="addcommunityFrom.location"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="开始时间" prop="content">
          <el-input
            type="startTime"
            v-model="addcommunityFrom.startTime"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="结束时间" prop="content">
          <el-input
            type="endTime"
            v-model="addcommunityFrom.endTime"
            autocomplete="off"
          ></el-input>
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGgNo('addGgRef')">取 消</el-button>
        <el-button type="primary" @click="addGgOk('addGgRef')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      size: 10,
      current: 1,
      total: 10,
      showList: [], // 渲染列表
      isAddGg: false,
      addcommunityFrom: {
        title: "",
        content: "",
        location: "",
        startTime: "",
        endTime: "",
        img: ""
      },
      addcommunityRules: {
        title: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        content: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        location: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        img: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get("/activity/allActivity", {
          params: {
            current: this.current,
            size: this.size
          }
        })
        .then(res => {
          console.log(res.data);
          this.showList = res.data.data.records;
          console.log("oooo", this.showList);
          this.total = res.data.data.total;
        })
        .catch(res => {
          console.log(res);
        });
    },
    deleteGg(scope) {
      this.$confirm("该操作将永久删除该条数据，是否继续？")
        .then(() => {
          this.$http
            .post("/activity/delActivity", null, {
              params: {
                activityId: scope.id
              }
            })
            .then(res => {
              console.log(res);
              if (res.data.code == 1000) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getData();
              }
            })
            .catch(res => {
              this.$message("删除失败");
            });
        })
        .catch(() => {
          this.$message("已取消");
        });
    },
    handleSizeChange(newSize) {
      this.size = newSize;
      this.getData();
    },
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      this.getData();
    },
    addBtn() {
      this.isAddGg = true;
    },
    // 关闭
    addGgClose() {
      this.isAddGg = false;
    },
    // 取消
    addGgNo(formName) {
      this.isAddGg = false;
      this.$refs[formName].resetFields();
      this.fileList = []
    },
    // 确认
    addGgOk(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // if(addcommunityFrom.startTime.length != 7 || addcommunityFrom.startTime.length != 8){

          // }
          // 成功 POST
          this.$http
            .post("/activity/addActivity", null, {
              params: this.addcommunityFrom
            })
            .then(res => {
              console.log("xxxxxxxxxxxxxxxxxxxxxxxxx", res);
              if (res.data.code == 1000) {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.getData();
                this.isAddGg = false;
                this.fileList = []
              } else {
                this.$message({
                  message: "添加失败",
                  type: "warning"
                });
              }
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
        this.addcommunityFrom.img = file.data[0]
        console.log(this.addcommunityFrom)
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
}
.community_box {
  width: 100%;
  height: 100%;
  overflow: scroll;
  .add_btn {
    margin-bottom: 10px;
  }

  .community {
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
