<template>
  <div class="ovnerRotion_box">
    <!-- 业主轮播图 -->

    <el-breadcrumb
      style="margin-bottom: 10px;"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>APP管理</el-breadcrumb-item>
      <el-breadcrumb-item>业主轮播图</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="add_btn">
      <el-button type="primary" @click="addovnerRotion">添加</el-button>
    </div>

    <div class="ovnerRotion">
      <template>
        <el-table :data="showList" border style="width: 100%">
          <el-table-column
            prop="id"
            align="center"
            label="ID"
          ></el-table-column>
          <el-table-column
            prop="title"
            align="center"
            label="标题"
          ></el-table-column>
          <el-table-column
            prop="content"
            align="center"
            label="内容"
          ></el-table-column>
          <el-table-column prop="img" label="轮播图片" align="center">
            <template slot-scope="scope">
              <img style="width: 80px; height: 100%" :src="scope.row.img" />
            </template>
          </el-table-column>
          <el-table-column
            prop="goodsId"
            label="goodsid"
            align="center"
          ></el-table-column>
          <el-table-column prop="isDel" label="是否删除" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isDel"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="publishTime"
            label="发表时间"
            align="center"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="rank"
            label="等级"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="url"
            label="链接"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center" width="200">
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
      :visible.sync="isAddovnerRotion"
      width="30%"
      :before-close="editHandleClose"
    >
      <el-form
        :model="addovnerRotionFrom"
        :rules="addovnerRotionRules"
        ref="ovnerRotionRef"
        label-width="100px"
        class="addovner_from"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            type="title"
            v-model="addovnerRotionFrom.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="图片地址" prop="img">
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
            v-model="addovnerRotionFrom.content"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editovnerNo('ovnerRotionRef')">取 消</el-button>
        <el-button type="primary" @click="editovnerOk('ovnerRotionRef')"
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
        :model="editovnerRotionFrom"
        :rules="editovnerRotionRules"
        ref="editovnerRotionRef"
        label-width="100px"
        class="addovner_from"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            type="title"
            v-model="editovnerRotionFrom.title"
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
            v-model="editovnerRotionFrom.content"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editovnerRotionNo('editovnerRotionRef')"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="editovnerRotionOk('editovnerRotionRef')"
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
      ovnerRotionList: [
        // 轮播图列表
      ],
      showList: [], // 渲染列表
      isAddovnerRotion: false, // 新增轮播图对话框显示
      addovnerRotionFrom: {
        // 新增轮播图信息数据
        title: "",
        img: "",
        content: ""
      },
      addovnerRotionRules: {
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
      editovnerRotionFrom: {
        id: "",
        title: "",
        img: "",
        content: ""
      },
      // 编辑对话框填写规则
      editovnerRotionRules: {
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
      const { data: res } = await this.$http.get("/banner/showAll");
      console.log(res.data);
      if (res.data) {
        this.ovnerRotionList = res.data;
        this.total = res.data.length;
        this.showList = publicFun.filterList(
          this.current,
          this.size,
          this.ovnerRotionList
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
        this.ovnerRotionList
      );
    },
    // 当前页码变化
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      this.showList = publicFun.filterList(
        this.current,
        this.size,
        this.ovnerRotionList
      );
    },
    // 删除轮播图
    deletePic(scope) {
      this.$confirm("该操作将永久删除该条信息，是否继续？")
        .then(() => {
          this.$http
            .post("/banner/delBanner", null, { params: { bannerId: scope.id } })
            .then(res => {
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
    addovnerRotion() {
      this.isAddovnerRotion = true;
    },
    // 关闭新增对话框
    editHandleClose() {
      this.isAddovnerRotion = false;
    },
    // 取消新增对话框
    editovnerNo(formName) {
      this.isAddovnerRotion = false;
      this.$refs[formName].resetFields();
      this.fileList = []
    },
    // 确认新增对话框
    editovnerOk(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/banner/addBanner", null, {
              params: this.addovnerRotionFrom
            })
            .then(res => {
              console.log(res);
              if (res.data.code == 1000) {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.getData();
                this.isAddovnerRotion = false;
                this.$refs[formName].resetFields();
                this.fileList = []
              } else {
                this.$message({
                  message: "添加失败",
                  type: "danger"
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
    // 编辑按钮
    editPic(scope) {
      this.editovnerRotionFrom.id = scope.id;
      this.editovnerRotionFrom.title = scope.title;
      this.editovnerRotionFrom.img = scope.img;
      this.editovnerRotionFrom.content = scope.content;
      this.isEditRotion = true;
    },
    // 编辑对话框关闭
    editHandleRotionClose() {
      this.isEditRotion = false;
    },
    // 取消编辑对话框
    editovnerRotionNo(formName) {
      this.isEditRotion = false;
      this.$refs[formName].resetFields();
      this.fileList2 = []
    },
    // 确认编辑对话框
    editovnerRotionOk(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.addovnerRotionFrom);
          this.$http
            .post("/banner/editBanner", null, {
              params: this.editovnerRotionFrom
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
        this.addovnerRotionFrom.img = file.data[0]
        console.log(this.addovnerRotionFrom)
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
        this.editovnerRotionFrom.img = file.data[0]
        console.log(this.editovnerRotionFrom)
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
.ovnerRotion_box {
  width: 100%;
  height: 100%;
  overflow: scroll;
  .add_btn {
    margin-bottom: 10px;
  }

  .ovnerRotion {
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
