<template>
  <div class="parking_box">
    <!-- 停车费管理 -->
    <div class="parking">
      <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>停车费管理</el-breadcrumb-item>
      </el-breadcrumb>

      <div style="margin-bottom:10px">
        <!-- 支付方式 -->
        <el-select v-model="payTypeValue" placeholder="支付方式" style="width:130px;">
          <el-option
            v-for="item in payType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <!-- 搜索类型 -->
        <el-select v-model="inputValue" placeholder="搜索类型" style="width:130px;">
          <el-option
            v-for="item in inputdata"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-input
          placeholder="请输入"
          v-model="inputSeachValue"
          style="width: 500px"
          class="input-with-select"
        >
          <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>

      <template>
        <el-table :data="showList" border style="width: 100%">
          <el-table-column align="center" prop="id" label="ID" width="60"></el-table-column>
          <el-table-column prop="orderNum" label="订单号码" align="center" width="180"></el-table-column>

          <el-table-column prop="userId" align="center" label="用户ID" width="80"></el-table-column>

          <el-table-column prop="user.nickName" align="center" label="用户昵称" width="120"></el-table-column>

          <el-table-column prop="user" align="center" label="用户头像" width="120">
            <template  slot-scope="scope">
              <el-image style="width:100%" v-if="scope.row.user" :src="scope.row.user.headImg" alt=""></el-image>
            </template>
          </el-table-column>

          <el-table-column prop="user.phone" align="center" label="用户手机号" width="120"></el-table-column>

          <el-table-column prop="year" align="center" label="年份" width="80"></el-table-column>
          <el-table-column prop="month" label="月份" align="center" width="80"></el-table-column>

          <el-table-column prop="payType" align="center" label="支付方式" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.payType == 0">余额支付</span>
              <span v-if="scope.row.payType == 1">支付宝</span>
              <span v-if="scope.row.payType == 2">微信付</span>
            </template>
          </el-table-column>

          <el-table-column align="center" prop="payNum" label="支付编号" width="140"></el-table-column>
          <el-table-column prop="money" label="支付金额(元)" align="center" width="120"></el-table-column>

          <el-table-column align="center" prop="state" label="支付状态">
            <template slot-scope="scope">
              <span style="color: #f00; font-weight: bold;" v-if="scope.row.state == 0">未缴纳</span>
              <span style="color: #53c553;" v-if="scope.row.state == 1">已缴纳</span>
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 0, // 总条数
      current: 1, // 当前页面
      size: 10, // 一页显示条数
      // orderNum: '',
      // number: '',
      showed:false,
      showList: [

      ], // 列表数据
      payTypeValue: "", //支付方式
      payType: [
        {
          value: "",
          label: "支付方式无"
        },
        {
          value: 0,
          label: "余额支付"
        },
        {
          value: 1,
          label: "支付宝"
        },
        {
          value: 2,
          label: "微信"
        }
      ],
      inputdata: [
        {
          value: 1,
          label: "订单号码"
        },
        {
          value: 2,
          label: "非机动车编号"
        }
      ],
      inputValue: 1, // 目标
      inputSeachValue: "" //编号
    };
  },
  created(){
      
        // this.getShowList()
  },
  mounted() {
      this.getData();
  },
  computed: {
    // 订单号码
    orderNum() {
      if (this.inputValue == 1) {
        return this.inputSeachValue;
      } else {
        return "";
      }
    },
    // 非机动车编号
    number() {
      if (this.inputValue == 2) {
        return this.inputSeachValue;
      } else {
        return "";
      }
    }
  },
  methods: {
    test(scope) {
      console.log("scope", scope.user.headImg);
    },

    // getShowList(){
    //           let data = {
    //     current: this.current,
    //     payType: this.payTypeValue,
    //     size: this.size,
    //     orderNum: this.orderNum,
    //     number: this.number
    //   };
    //  this.$http.get("/nonMotFee/checkProFee", {
    //     params: data
    //   }).then(res=>{
    //       if (res.data.code == 1002) {
    //         //   return
    //         this.showList = res.data.data.records;
    //         this.showed=true
    //       console.log("停车费返回数据", this.showList);
    //       }
    //   });
    // },

    // 获取数据列表
    async getData() {
      let data = {
        current: this.current,
        payType: this.payTypeValue,
        size: this.size,
        orderNum: this.orderNum.toString(),
        number: this.number.toString()
      };
      console.log("data", data);
      const { data: res } = await this.$http.get("/nonMotFee/checkProFee", {
        params: data
      });
      if (res.code == 1002) {
        //   return
        this.total = res.data.total
        this.showList = res.data.records;
        // this.sg==
      console.log("停车费返回数据", this.showList);
      }
    },
    handleSizeChange(newSize) {
      this.size = newSize;
      console.log("newsize", newSize, this.size);
      this.getData();
    },
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      console.log("new", newCurrent, this.current);
      this.getData();
    },
    search() {
      console.log("mubio", this.inputValue);
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
  .parking_box {
    width: 100%;
    height: 100%;
    overflow: scroll;
    .parking {
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