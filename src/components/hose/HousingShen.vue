<template>
  <div class="housingShen_box">
    <!-- 房屋审核 -->
    <div class="housingShen">
      <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>房屋管理</el-breadcrumb-item>
        <el-breadcrumb-item>房屋审核</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="search_btn">
        <el-input v-model="searchValue" placeholder="请输入房屋ID"></el-input>
        <el-button type="primary" @click="getData">搜索</el-button>
      </div>

      <template>
        <el-table :data="showList" border style="width: 100%">


          <el-table-column prop="id" width="50" label="#" align="center"></el-table-column>
          <el-table-column prop="applyIdentity" label="申请身份" align="center" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.applyIdentity == 0">产权人</span>
              <span v-if="scope.row.applyIdentity == 1">家属</span>
              <span v-if="scope.row.applyIdentity == 2">租户</span>
            </template>
          </el-table-column>

          <el-table-column prop="idcardImg" label="身份证" align="center" width="200">
            <template slot-scope="scope">
              <img style="width: 100px; height: 100%;" :src="scope.row.idcardImg" alt="身份证" />
            </template>
          </el-table-column>

         <el-table-column prop="applyIdCard" label="申请人身份证号" align="center" width="180"></el-table-column>
          <el-table-column prop="houseId" label="房屋号" align="center"></el-table-column>
          <el-table-column prop="applyName" label="申请人" align="center"></el-table-column>
          <el-table-column prop="checkId" label="申请人ID" align="center"></el-table-column>

         <el-table-column prop="state" label="审核状态" align="center">
            <template slot-scope="scope">
              <span style="color: #888" v-if="scope.row.state == 0">待审核</span>
              <span style="color: #53c553" v-if="scope.row.state == 1">已通过</span>
              <span style="color: #f00" v-if="scope.row.state == 2">已拒绝</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="申请时间" align="center" width="180"></el-table-column>
          <!-- <el-table-column prop="user.realName" label="用户名" align="center"></el-table-column> -->
          <el-table-column prop="user.phone" label="用户手机号" align="center" width="130"></el-table-column>
          <!-- <el-table-column prop="user.idCard" label="用户身份证号" align="center" width="180"></el-table-column> -->
          <el-table-column prop="house.communityName" label="小区名" align="center"></el-table-column>
          <el-table-column prop="house.buildingName" label="楼栋信息" align="center"></el-table-column>
          <el-table-column prop="house.unitHouseName" label="单元信息" align="center" width="120"></el-table-column>



          <el-table-column width="100" align="center" label="审核">
            <template slot-scope="scope">

              <el-button
              v-if="scope.row.state == 0"
              type="warning"
              size="mini"
              style="margin-bottom: 10px;"
              @click="compared(scope.row)"
              >

                <i class="el-icon-view"></i>对比
              </el-button>

              <el-button v-else type="info" size="mini" :disabled="true">
                <i class="el-icon-s-check"></i>已审核
              </el-button>

              

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
        ></el-pagination>
      </div>

      <!-- 对比弹窗 -->
      <el-drawer
      title="房屋信息对比"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="comparedClose"
      :closeDrawer="closeDrawer"
      style="height: 180%;"
      >
      
      <template>
        <el-table
          :data="comparedData1"
          style="width: 100%"
          :row-class-name="tableRowClassName">

          <el-table-column
            prop="applyName"
            label="用户名"
            width="180">
          </el-table-column>

          <el-table-column
            prop="communityName"
            label="小区名"
            width="180">
          </el-table-column>

          <el-table-column
            prop="buildingName"
            label="楼栋信息">
          </el-table-column>
          
          <el-table-column
            prop="unitHouseName"
            label="单元信息">
          </el-table-column>

          <el-table-column
            prop="applyIdCard"
            label="身份证号">
          </el-table-column>

          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>

        </el-table>
      </template>

      <template>
        <el-table
          :data="comparedData2"
          style="width: 100%"
          :row-class-name="tableRowClassName">

          <el-table-column
            prop="ownerName"
            label=""
            width="180">
          </el-table-column>

          <el-table-column
            prop="communityName"
            label=""
            width="180">
          </el-table-column>

          <el-table-column
            prop="buildingName"
            label="">
          </el-table-column>
          
          <el-table-column
            prop="unitHouseName"
            label="">
          </el-table-column>

          <el-table-column
            prop="idNumber"
            label="">
          </el-table-column>

          <el-table-column
            prop="phone"
            label="">
          </el-table-column>

        </el-table>
      </template>
      
        <div class="shenpi" style="height: 40px; display:flex;margin: 30px 50px 0 0;justify-content:flex-end;">
          <el-form
          :model="shenpiData"
          ref="hosingShenRef"
          label-width="100px"
          class="addovner_from"
        >
          <el-form-item label="审核：" prop="state">
            <el-select v-model="shenpiData.state" placeholder="选择操作">
              <el-option label="通过" value="1"></el-option>
              <el-option label="拒绝" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-input v-if="shenpiData.state == 2" style="width: 300px;margin-left: 10px;" v-model="shenpiData.reason" placeholder="请输入拒绝理由"></el-input>


          <el-button @click="shenheClick()" type="primary" size="mini" style="height:40px;margin-left: 20px">
          <i class="el-icon-s-check"></i>审核
          </el-button>
        </div>

    </el-drawer>
    </div>
  </div>
</template>
<script>
import publicFun from "../../store/public.js";
export default {
  data() {
    return {
      size: 10,
      current: 1,
      total: 10,
      searchValue: "", // 搜索值
      housingList: [],
      showList: [],
      isHosingShen: false,
      jujliyou: '', // 拒绝理由
      shenpiData: {
        roleApplyId: "",
        state: "1",
        reason: '', // 拒绝理由
      },
      drawer: false,
      direction: 'ttb',
      comparedData1: [], // 对比数据1
      comparedData2: [], // 对比数据2

    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let data = {
          houseId: '',
          userId: '',
          current: this.current,
          size: this.size
      };
      if (this.searchValue) {
        data = {
          houseId: this.searchValue,
          userId: '',
          current: this.current,
          size: this.size
        };
      }
      this.showList = [];
      const { data: res } = await this.$http.post("/roleApply/checkApply", null,{ params: data });
      console.log('返回的所有数据',res.data);
      this.size = res.data.size
      this.current = res.data.current
      this.total = res.data.total

      console.log('返回的数据列表',res.data.records);

      this.showList = res.data.records
    },
    // 对比打开
    compared(scope){
      let id = scope.id // roleApplyId
      this.shenpiData.roleApplyId = id
      console.log(scope)
      let newScope = scope
      if(newScope.house == null){
        newScope.house = {}
      }
      if(newScope.user == null){
        newScope.user = {}
      }
      let datas = {
        applyName: scope.applyName, //用户
        communityName: scope.house.communityName != null ? scope.house.communityName : '1', // 小区
        buildingName: scope.house.buildingName != null ? scope.house.buildingName : '1', // 楼栋
        unitHouseName: scope.house.unitHouseName != null ? scope.house.unitHouseName : '1', // 单元
        applyIdCard: scope.applyIdCard, //身份证
        phone: scope.user.phone != null ? scope.user.phone : '1' // 手机号
      }
      this.gethouseInfo(id)
      this.comparedData1.push(datas)

      console.log(datas)
      this.drawer = true
    },
    // 关闭对比弹窗
    comparedClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.comparedData1 = []
            this.comparedData2 = []
          })
          .catch(_ => {});
    },
    // 对比xxx
    tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
    },
    closeDrawer(e){
      console.log(e)
    },
    // 审批
    shenheClick(){
      let _this = this
      console.log(this.shenpiData)
      // if(!this.shenpiData.state){
      //   this.$message({
      //     message: "请选择审核操作",
      //     type: "warning"
      //   });
      // }else{

        if(_this.shenpiData.state == 2 && _this.shenpiData.reason == ''){
          _this.$message({
            message: '请填写拒绝理由',
            type: 'warning'
          })
          return
        }
        console.log('shenpiData', _this.shenpiData)
                          // http://192.168.31.111:8090   本地地址
        _this.$http.post("/roleApply/managerCheckApply", null, {
            params: _this.shenpiData
          })
          .then(res => {
            console.log('审批请求', res)
            if (res.data.code == 1000) {
              _this.$message({
                message: "成功审核",
                type: "success"
              });
              _this.drawer = false
              _this.getData();
              _this.isHosingShen = false;
              // _this.$refs[formName].resetFields();

            }else {
              _this.$message({
                message: "审核失败",
                type: "danger"
              });
            }
          })

      // }
      
    },
    hosingShenClose() {
      this.isHosingShen = false;
    },
    handleSizeChange(newSize) {
      this.size = newSize;
      this.getData()
    },
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      this.getData()
    },
    // 对比数据
    async gethouseInfo(id){
      // this.$http.post('/roleApply/businessOwnerContrast', null, { params: { roleApplyId: id } }).then(res){
      //   console.log('对比返回数据',res)   http://192.168.31.111:8090
      // }
     const { data: res } = await this.$http.post("/roleApply/businessOwnerContrast", null, { params: { roleApplyId: id } })
     console.log('res',res)
     if(res.code == 1002){
       if(res.data == null){
         res.data = {}
       }
       this.comparedData2.push(res.data)
       console.log(this.comparedData2)
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
  .housingShen_box {
    width: 100%;
    height: 100%;
    overflow: scroll;
    .housingShen {
      width: 100%;
      height: 100%;
      .search_btn {
        display: flex;
        margin-bottom: 10px;
        .el-input {
          width: 200px;
          margin-right: 10px;
        }
      }
      .paging {
        display: flex;
        justify-content: center;
        margin: 10px 0;
      }
    }
  }
}

.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-drawer{
    box-sizing: border-box;
    padding: 0 40px;
  }
</style>
