<template>
  <div class="ovner_box">
    <!-- 用户管理 -->
    <div class="ovner">
      <el-breadcrumb
        style="margin-bottom: 10px;"
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>业主列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 用户列表 -->
      <template>
        <el-table :data="showList" border style="width: 100%">
          <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
          <el-table-column prop="nickName" label="昵称" align="center"></el-table-column>
          <el-table-column
            prop="realName"
            label="名字"
            align="center"
          ></el-table-column>
          <el-table-column prop="houseId" label="房号" align="center"></el-table-column>
          <el-table-column prop="headImg" align="center" label="头像">
            <template slot-scope="scope">
              <img
                style="width: 30px; height: 30px;"
                :src="scope.row.headImg"
              />
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别"  align="center"  width="60">
            <template slot-scope="scope">
              <span style="color: #008c8c;" v-if="scope.row.sex == 1">男</span>
              <span style="color: pink;" v-if="scope.row.sex == 0">女</span>
            </template>
          </el-table-column>
          <el-table-column prop="canUse" align="center" label="账号状态" width="80">
            <template slot-scope="scope">
              <el-switch
                disabled
                v-model="scope.row.canUse"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="certification" align="center" label="认证状态" width="80">
            <template slot-scope="scope">
              <span style="color: #f00;" v-if="scope.row.certification == 0"
                >未认证</span
              >
              <span style="color: #53c553;" v-if="scope.row.certification == 1"
                >已认证</span
              >
              <!-- <el-switch disabled v-model="scope.row.certification" :active-value= '1' :inactive-value= '0' active-color="#13ce66" inactive-color="#ff4949"></el-switch> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="lastLoginTime"
            label="上次登陆时间"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="注册时间"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="editOvner(scope.row)"
                size="mini"
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
  </div>
</template>
<script>
import publicFun from "../../store/public.js";
export default {
  data() {
    return {
      size: 10, // 一页显示条数
      pages: 1, //总页数
      current: 1, // 当前页码
      total: 0, // 总共条数
      ovnerList: [
        // 业主列表
      ],
      showList: [] // 分页渲染数据
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.post("/user/checkAllUser", null, {}).then(res => {
        if (res.data.data) {
          console.log(res.data);
          this.ovnerList = res.data.data;
          this.total = res.data.data.length;
          this.showList = publicFun.filterList(
            this.current,
            this.size,
            this.ovnerList
          );
        } else {
          this.$message({
            message: "数据请求失败",
            type: "danger"
          });
        }
      });
    },
    // 每页显示条数变化
    handleSizeChange(newSize) {
      this.size = newSize;
      this.showList = publicFun.filterList(
        this.current,
        this.size,
        this.ovnerList
      );
    },
    // 当前页变化
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      this.showList = publicFun.filterList(
        this.current,
        this.size,
        this.ovnerList
      );
    },
    //
    editOvner(scope) {
      this.$message("敬请期待");
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
.ovner_box {
  width: 100%;
  height: 100%;
  overflow: scroll;

  .ovner {
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
