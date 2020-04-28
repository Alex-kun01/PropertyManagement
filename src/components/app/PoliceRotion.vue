<template>
  <div class="policeRotion_box">
    <!-- 保安轮播图 -->

    <el-breadcrumb
      style="margin-bottom: 10px;"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>APP管理</el-breadcrumb-item>
      <el-breadcrumb-item>保安轮播图</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="add_btn">
      <el-button type="primary" @click="addPoliceRotion">添加</el-button>
    </div>
    <div class="policeRotion">
      <template>
        <el-table :data="showList" border style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
            align="center"
            width="60"
          ></el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="content"
            label="内容"
            align="center"
            width="180"
          ></el-table-column>

          <el-table-column prop="img"  align="center" label="轮播图片" width="300">
            <template slot-scope="scope">
              <img style="width: 100%; height: 100%" :src="scope.row.img" />
            </template>
          </el-table-column>
          <el-table-column
            prop="goodsId"
            label="产品ID"
             align="center"
            width="100"
          ></el-table-column>
          <el-table-column prop="isDel"  align="center" label="是否删除" width="80">
            <template slot-scope="scope">
              <span style="color: #f00;" v-if="scope.row.isDel == 0"
                >已删除</span
              >
              <span v-if="scope.row.isDel == 1">未删除</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="publishTime"
            label="发表时间"
             align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="rank"
            label="等级"
             align="center"
            width="60"
          ></el-table-column>

          <el-table-column
            prop="url"
            label="链接"
             align="center"
            width="180"
          ></el-table-column>
          <el-table-column  align="center" width="200" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="editPic(scope.row)" size="mini"
                ><i class="el-icon-edit"></i>编辑</el-button
              >
              <el-button type="danger" @click="deletePic(scope.row)" size="mini"
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

    <!-- 新增轮播图对话框 -->
    <el-dialog
      title="添加轮播图"
      :visible.sync="isAddPoliceRotion"
      width="30%"
      :before-close="editHandleClose"
    >
      <el-form
        :model="addPoliceRotionFrom"
        :rules="addPoliceRotionRules"
        ref="policeRotionRef"
        label-width="100px"
        class="addpolice_from"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            type="title"
            v-model="addPoliceRotionFrom.title"
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

        <el-form-item label="内容" prop="content">
          <el-input
            type="content"
            v-model="addPoliceRotionFrom.content"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editPoliceNo('policeRotionRef')">取 消</el-button>
        <el-button type="primary" @click="editPoliceOk('policeRotionRef')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 编辑对话框 -->

    <el-dialog
      title="添加轮播图"
      :visible.sync="isEditRotion"
      width="30%"
      :before-close="editHandleRotionClose"
    >
      <el-form
        :model="editPoliceRotionFrom"
        :rules="editPoliceRotionRules"
        ref="editPoliceRotionRef"
        label-width="100px"
        class="addpolice_from"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            type="title"
            v-model="editPoliceRotionFrom.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="上传图片" prop="img">
         
          <el-upload
            class="upload-demo"
            action="http://47.108.80.252:8090/uploads"  
            :on-preview="handlePreview2"
            :on-remove="handleRemove2"
            :on-success="handSuccess2"
            :before-remove="beforeRemove2"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList2">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-input
            type="content"
            v-model="editPoliceRotionFrom.content"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editPoliceRotionNo('editPoliceRotionRef')"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="editPoliceRotionOk('editPoliceRotionRef')"
          >确 定</el-button
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
      fileList: [],
      fileList2: [],
      size: 10,
      current: 1,
      total: 0,
      policeRotionList: [
        // 轮播图列表
      ],
      showList: [], // 渲染列表
      isAddPoliceRotion: false, // 新增轮播图对话框显示
      addPoliceRotionFrom: {
        // 新增轮播图信息数据
        title: "",
        img: "",
        content: ""
      },
      addPoliceRotionRules: {
        // 新增轮播图填写规则
        title: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        img: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        content: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ]
      },
      // 编辑对话框显示
      isEditRotion: false,
      // 编辑对话框信息数据
      editPoliceRotionFrom: {
        id: "",
        title: "",
        img: "",
        content: ""
      },
      // 编辑对话框填写规则
      editPoliceRotionRules: {
        title: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        img: [
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
    async getData() {
      const { data: res } = await this.$http.get("/policeBanner/showAll");
      console.log(res.data);
      if (res.data) {
        this.policeRotionList = res.data;
        this.total = res.data.length;
        //   this.filterList(this.current, this.size)
        this.showList = publicFun.filterList(
          this.current,
          this.size,
          this.policeRotionList
        );
      } else {
        this.$message({
          message: "数据请求失败",
          type: "danger"
        });
      }
    },
    // 一页显示条数变化
    handleSizeChange(newSize) {
      this.size = newSize;
      this.showList = publicFun.filterList(
        this.current,
        this.size,
        this.policeRotionList
      );
    },
    // 当前页码变化
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      this.showList = publicFun.filterList(
        this.current,
        this.size,
        this.policeRotionList
      );
    },
    // 删除轮播图
    deletePic(scope) {
      this.$confirm("该操作将永久删除该条信息，是否继续？")
        .then(() => {
          console.log(scope.id);
          this.$http
            .post("/policeBanner/delBanner", null, {
              params: { bannerId: scope.id }
            })
            .then(res => {
              console.log(res.data.code);
              if (res.data.code == 1000) {
                this.$message({
                  message: "已删除",
                  type: "success"
                });
                this.getData();
              } else {
                this.$message({
                  message: "删除失败",
                  type: "info"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            message: "已取消",
            type: "info"
          });
        });
    },
    // 添加轮播图
    addPoliceRotion() {
      this.isAddPoliceRotion = true;
    },
    // 关闭新增对话框
    editHandleClose() {
      this.isAddPoliceRotion = false;
    },
    // 取消新增对话框
    editPoliceNo(formName) {
      this.isAddPoliceRotion = false;
      this.$refs[formName].resetFields();
      this.fileList = []
    },
    // 确认新增对话框
    editPoliceOk(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.addPoliceRotionFrom);
          this.$http
            .post("/policeBanner/addBanner", null, {
              params: this.addPoliceRotionFrom
            })
            .then(res => {
              console.log(res);
              this.getData();

              this.isAddPoliceRotion = false;

              this.$message({
                message: "修改成功",
                type: "success"
              });

              this.$refs[formName].resetFields();
              this.fileList = []
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
    // 编辑按钮
    editPic(scope) {
      this.editPoliceRotionFrom.id = scope.id;
      this.editPoliceRotionFrom.title = scope.title;
      this.editPoliceRotionFrom.img = scope.img;
      this.editPoliceRotionFrom.content = scope.content;
      this.isEditRotion = true;
    },
    // 编辑对话框关闭
    editHandleRotionClose() {
      this.isEditRotion = false;
    },
    // 取消编辑对话框
    editPoliceRotionNo(formName) {
      this.isEditRotion = false;
      this.$refs[formName].resetFields();
      this.fileList2 = []
    },
    // 确认编辑对话框
    editPoliceRotionOk(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.addPoliceRotionFrom);
          this.$http
            .post("/policeBanner/editBanner", null, {
              params: this.editPoliceRotionFrom
            })
            .then(res => {
              console.log(res);
              this.getData();

              this.isEditRotion = false;

              this.$message({
                message: "修改成功",
                type: "success"
              });

              this.$refs[formName].resetFields();
              this.fileList2 = []
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
        this.addPoliceRotionFrom.img = file.data[0]
        console.log(this.addPoliceRotionFrom)
      }
    },
    handleRemove2(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview2(file) {
      
    },
    handleExceed2(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList2.length} 个文件`);
    },
    beforeRemove2(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handSuccess2(file, fileList){
      // console.log('fileList', file, this.fileList)
      console.log('res',file);
      if(file.code == 1002){
        this.editPoliceRotionFrom.img = file.data[0]
        console.log(this.editPoliceRotionFrom)
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
.policeRotion_box {
  width: 100%;
  height: 100%;
  overflow: scroll;
  .add_btn {
    margin-bottom: 10px;
  }

  .policeRotion {
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
