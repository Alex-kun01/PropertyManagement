<template>
  <div class="adSet_box">
    <!-- 非机动车管理 -->

   <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
      <el-breadcrumb-item>非机动车管理</el-breadcrumb-item>
   </el-breadcrumb>



    <div class="adSet">
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="tabclick"
        :tab-click="handleClick"
      >
        <el-tab-pane label="后台导入" name="appAd">
          <!-- 后台导入 -->

          <el-upload
          style="margin-top:10px;display:inline-block;"
          class="upload-demo"
          action="http://47.108.80.252:8090/nonMot/inportNonMot"
          :on-preview="handlePreview"
          :on-success="uploadSuccess"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :on-exceed="handleExceed"
          accept="excel"
        >
          <el-button type="danger">导入车辆表格(excel)</el-button>
        </el-upload>
        
          <a href="https://fsllnb.oss-cn-chengdu.aliyuncs.com/excel/NonCarImport.xlsx">
            <el-button type="primary">下载Excel导入模板</el-button>
          </a>
          <template>
                <el-table
                :data="showList"
                border
                style="width: 100%; margin-top: 10px">


                  <el-table-column type="index" label="#"></el-table-column>
                  <el-table-column prop="id" label="id"></el-table-column>
                  <el-table-column prop="number" label="编号"></el-table-column>
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="type" label="车辆类型">
                    <template slot-scope="scope">
                      <span v-if="scope.row.type == 1">电动车</span>
                      <span v-if="scope.row.type == 2">山轮车</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="startTime" label="缴费开始日期"></el-table-column>
                  <el-table-column prop="phone" label="手机号"></el-table-column>
                  <el-table-column prop="comName" label="小区"></el-table-column>

                </el-table>
            </template>
          <!-- 分页 -->
          <div class="paging">
            <el-pagination
              @size-change="handleSizeChangeApp"
              @current-change="handleCurrentChangeApp"
              :current-page="current"
              :page-sizes="[5, 10, 20, 30]"
              :page-size="size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="业主自填" name="eqAd">
          <!-- 业主自填 -->
          <template>
                <el-table
                :data="showListEq"
                border
                style="width: 100%">


                  <el-table-column type="index" label="#"></el-table-column>
                  <el-table-column prop="id" label="id"></el-table-column>
                  <el-table-column prop="userId" label="用户id"></el-table-column>
                  <el-table-column prop="number" label="编号"></el-table-column>
                  <el-table-column prop="img" label="图片" width="120">
                    <template slot-scope="scope">
                      <img style="width:100%" :src="scope.row.img" alt="">
                    </template>
                  </el-table-column>
                  <el-table-column prop="publishTime" label="添加时间"></el-table-column>
                  <el-table-column prop="comName" label="小区"></el-table-column>
                  <el-table-column prop="type" label="类型">
                    <template slot-scope="scope">
                      <span v-if="scope.row.type == 1">电动车</span>
                      <span v-if="scope.row.type == 2">山轮车</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="state" label="状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.state == 0">未删除</span>
                      <span v-if="scope.row.state == 1">已删除</span>
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

 
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 后台导入
      total: 0,
      size: 10,
      current: 1,
      showList: [],
      // 业主自填
      totalEq: 1,
      sizeEq: 10,
      currentEq: 1,
      showListEq: [],
      activeName: 'appAd'

    };
  },
  mounted() {
    this.getData();
    this.getDataEq()
  },
  methods: {
    // 后台导入
    async getData(){
       let data = {
         current: this.current,
         size: this.size
       }
       const {data:res} = await this.$http.post('/nonMot/lookAllCar', null, { params: data })
       console.log('非机动车导入数据', res)
       if(res.code == 1002){
         this.total = res.data.total
         this.showList = res.data.records
       }else{
         this.$message('获取数据失败')
       }
      },
      async getDataEq(){
        let data = {
          current: this.currentEq,
          size: this.sizeEq
        }
        const {data: res} = await this.$http.post('/userNonMot/lookAllNonCar', null, { params: data })
        console.log('非机动车填写数据', res)
        if(res.code == 1002){
          this.totalEq = res.data.total
          this.showListEq = res.data.records
        }else{
         this.$message('获取数据失败')
       }

      },
      handleSizeChangeApp(newSize){
        this.size = newSize 
        this.getData()
      },
      handleCurrentChangeApp(newCurrent){
        this.current = newCurrent
        this.getData()
      },
    // 业主自填
    handleSizeChangeEq(newSize){
        this.sizeEq = newSize

    },
    handleCurrentChangeEq(newCurrent){
      this.currentEq = newCurrent

    },
    handleClick(tab, event) {
      console.log(tab.label);
      if (tab.label == "后台导入") {
        this.getDataApp();
      } else {
        this.getDataEq();
      }
    },
    tabclick(tab) {
      console.log(tab.name);
      if (tab.name == "eqAd") {
        this.getDataEq();
      }
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

