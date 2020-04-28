<template>
  <div class="adSet_box">
    <!-- 广告设置 -->

    <el-breadcrumb
      style="margin-bottom: 10px;"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>门禁管理</el-breadcrumb-item>
      <el-breadcrumb-item>广告设置</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button @click="addAd" type="primary">添加</el-button>

    <div class="adSet">
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="tabclick"
        :tab-click="handleClick"
      >
        <el-tab-pane label="APP广告" name="appAd">
          <!-- APP广告 -->
          <template>
            <el-table :data="appList" border style="width: 100%">
              <el-table-column
                prop="adId"
                label="广告ID"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="advertiseName"
                label="广告名"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="atId"
                label="屏幕ID"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="atName"
                label="屏幕尺寸"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="content"
                label="内容"
                align="center"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="comId"
                label="comId"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                align="center"
                width="180"
              >
                <!-- timeChange -->
                <template slot-scope="scope">{{
                  timeChange(scope.row.createTime)
                }}</template>
              </el-table-column>
              <el-table-column
                prop="picUrl"
                label="图片"
                align="center"
                width="200"
              >
                <template slot-scope="scope">
                  <img
                    style="width: 100%; height: 100%; min-height:200px;"
                    :src="'http://www.hbzayun.com/ACSystem' + scope.row.picUrl"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="ia"
                label="ia"
                align="center"
              ></el-table-column>
              <el-table-column label="操作" align="center" width="100px">
                <template slot-scope="scope">
                  <el-button
                    @click="delAdAPP(scope.row)"
                    type="danger"
                    size="mini"
                    ><i class="el-icon-delete"></i>删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
          <!-- 分页 -->
          <div class="paging">
            <el-pagination
              @size-change="handleSizeChangeApp"
              @current-change="handleCurrentChangeApp"
              :current-page="currentApp"
              :page-sizes="[5, 10, 20, 30]"
              :page-size="sizeApp"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalApp"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="设备广告" name="eqAd">
          <!-- 设备广告 -->
          <template>
            <el-table :data="eqList" border style="width: 100%">
              <el-table-column
                prop="adId"
                label="广告ID"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="advertiseName"
                label="广告名"
                align="center"
                width="150"
              ></el-table-column>
              <el-table-column
                prop="atId"
                label="广告ID"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="atName"
                label="屏幕尺寸"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="content"
                label="内容"
                align="center"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="comId"
                label="comId"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                align="center"
                width="180"
              ></el-table-column>
              <el-table-column prop="picUrl" align="center" label="图片" width="200">
                <template slot-scope="scope">
                  <img
                    style="width: 100%; height: 100%; min-height:200px;"
                    :src="'http://www.hbzayun.com/ACSystem' + scope.row.picUrl"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="ia"
                label="ia"
                align="center"
                width="80"
              ></el-table-column>
                <el-table-column label="操作" align="center" width="100px">
                <template slot-scope="scope">
                  <el-button
                    @click="delAdAPP(scope.row)"
                    type="danger"
                    size="mini"
                    ><i class="el-icon-delete"></i>删除</el-button
                  >
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

  <!-- 添加广告 -->
    <el-dialog
      title="添加广告"
      :visible.sync="isAddAd"
      width="50%"
      :before-close="AddAdClose"
    >
      <el-form
        :model="addAdFrom"
        :rules="addAdRules"
        ref="addAdref"
        label-width="100px"
        class="addovner_from"
      >
        <el-form-item label="图片" prop="baseFile">
          <input
            type="file"
            @change="inpChange"
            multiple
            id="imgLocal"
            accept="image/*"
          />

          <!-- <el-upload
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
          </el-upload> -->



        </el-form-item>

        <el-form-item label="广告名" prop="advertiseName">
          <el-input
            type="advertiseName"
            v-model="addAdFrom.advertiseName"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="广告屏" prop="atId">
          <el-select v-model="addAdFrom.atId" placeholder="活动区域">
            <el-option label="大屏" value="1"></el-option>
            <el-option label="中屏" value="2"></el-option>
            <el-option label="小屏" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="AddAdNo('addAdref')">取 消</el-button>
        <el-button type="primary" @click="AddAdOk('addAdref')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      // app广告
      totalApp: 1,
      sizeApp: 10,
      currentApp: 1,
      // 设备广告
      totalEq: 1,
      sizeEq: 10,
      currentEq: 1,
      activeName: "appAd",
      appList: [],
      eqList: [],
      isAddAd: false,
      addAdFrom: {
        key: "e098214294ad13f23e16ae5ebecf970d",
        token: "1bbd886460827015e5d605ed44252251",
        baseFile: "",
        advertiseName: "测试",
        atId: 3
      },
      addAdRules: {
        // baseFile: [
        //   { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        // ],
        advertiseName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        atId: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getDataApp();
  },
  methods: {

    // 删除广告
    delAdAPP(item){
    console.log(item,'选中广告_app')
    },


    // app广告
    async getDataApp() {
      // http://www.hbzayun.com/
      const { data: res } = await this.$http.post(
        "http://www.hbzayun.com/ACSystem/getAdsListByAdmin",
        null,
        {
          params: {
            key: "e098214294ad13f23e16ae5ebecf970d",
            token: "1bbd886460827015e5d605ed44252251",
            type: 0,
            pn: this.currentApp,
            pc: this.sizeApp
          }
        }
      );
      console.log("app广告res", res); // res.extend.list
      if (res.code == 200) {
        this.appList = res.extend.data.list;
        this.totalApp = res.extend.data.total;
        console.log("adlist", this.adList);
      } else {
        this.$message({
          message: res.extend.error,
          type: "danger"
        });
      }
    },
    // 设备广告
    async getDataEq() {
      const { data: res } = await this.$http.post(
        "http://www.hbzayun.com/ACSystem/getAdsListByAdmin",
        null,
        {
          params: {
            key: "e098214294ad13f23e16ae5ebecf970d",
            token: "1bbd886460827015e5d605ed44252251",
            type: 1,
            pn: this.sizeEq,
            pc: this.currentEq
          }
        }
      );
      console.log(res); // res.extend.list
      if (res.code == 200) {
        this.eqList = res.extend.data.list;
        this.totalEq = res.extend.data.total;
        console.log("adlist", this.adList);
      } else {
        this.$message({
          message: res.extend.error,
          type: "danger"
        });
      }
    },
    handleClick(tab, event) {
      console.log(tab.label);
      if (tab.label == "APP广告") {
        this.getDataApp();
      } else {
        this.getDataEq();
      }
    },
    // 时间转换
    timeChange(time) {
      const date = new Date(time);
      const year = date.getFullYear();
      const month = date.getMonth();
      const data = date.getDate();
      const house = date.getHours();
      const min = date.getMinutes();
      const seconds = date.getSeconds();
      let str = `${year}-${month}-${data} ${house}:${min}:${seconds}`;
      return str;
    },
    handleSizeChangeApp(newSize) {
      this.sizeApp = newSize;
    },
    handleCurrentChangeApp(newCurrent) {
      this.currentApp = newCurrent;
    },
    handleSizeChangeEq(newSize) {
      this.sizeEq = newSize;
    },
    handleCurrentChangeEq(newCurrent) {
      this.currentEq = newCurrent;
    },
    // 添加广告
    async addAd() {
      this.isAddAd = true;
    },
    // 关闭添加广告
    AddAdClose() {
      this.isAddAd = false;
    },
    // 取消关闭
    AddAdNo(formName) {
      this.isAddAd = false;
    },
    // 确认提交
    AddAdOk(formName) {
      let _this = this
      //
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post("http://www.hbzayun.com/ACSystem/addByBase", null, { params: this.addAdFrom })
            .then(res => {
              console.log(res);
            })

        } else {
          this.$message({
            message: "Error",
            type: "warning"
          });
          return false;
        }
      });
    },
    // 上传图片
    inpChange(e) {
      let _this = this;
      let fileList = document.querySelector("#imgLocal").files;
      let file = fileList[0];
      console.log(file);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", function() {
        // 读取完成
        let res = fileReader.result; // res是base64格式的图片
        console.log("base64格式",res)
        _this.addAdFrom.baseFile = res;

        console.log(_this.addAdFrom);
      });
    },
    // 标签切换
    tabclick(tab) {
      console.log(tab.name);
      if (tab.name == "eqAd") {
        this.getDataEq();
      }
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
        this.addAdFrom.baseFile = file.data[0]
        console.log(this.addAdFrom)
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
