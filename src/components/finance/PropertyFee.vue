<template>
  <div class="property_box">
    <!-- 物业费管理 -->
    <div class="property">
      <el-breadcrumb
        style="margin-bottom: 10px;"
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>物业费</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="search_btn" style="margin-bottom: 10px;">

          <!-- 缴费状态 -->
        <el-select v-model="stateValue" placeholder="缴费状态" style="width:130px;">
          <el-option
            v-for="item in state"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

         <!-- 支付方式 -->
        <el-select v-model="payTypeValue" placeholder="支付方式" style="width:130px;">
          <el-option
            v-for="item in payType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <!-- 搜索类型 -->
        <el-select v-model="inputValue" placeholder="搜索类型" style="width:130px;">
          <el-option
            v-for="item in inputdata"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
              
        <el-input
          placeholder="请输入"
          v-model="inputSeachValue"
          style="width: 500px"
          class="input-with-select"
        >
          <!-- <el-select
            v-model="select"
            style="width: 150px"
            slot="prepend"
            placeholder="请选择搜索类型"
          >
            <el-option label="支付方式" value="1"></el-option>
            <el-option label="订单号码" value="2"></el-option>
            <el-option label="房屋ID" value="3"></el-option>
            <el-option label="用户ID" value="4"></el-option>
          </el-select> -->

          
          <el-button
            @click="search"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </div>

      <template>
        <el-table :data="showList" border style="width: 100%">
          <el-table-column align="center" prop="id" label="ID" width="60"></el-table-column>
          <el-table-column
            prop="orderNum"
            label="订单编号"
             align="center"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="houseId"
            label="房屋ID"
             align="center"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="userId"
            label="用户ID"
             align="center"
            width="80"
          ></el-table-column>
          <el-table-column prop="role" label="角色" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.role == 0">产权人</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="year"
             align="center"
            label="年份"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="month"
            label="月份"
             align="center"
            width="80"
          ></el-table-column>
          <el-table-column prop="payType"  align="center" label="支付方式" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.payType == 0">余额支付</span>
              <span v-if="scope.row.payType == 1">支付宝</span>
              <span v-if="scope.row.payType == 2">微信付</span>
            </template>
          </el-table-column>
          <el-table-column
           align="center"
            prop="payNum"
            label="支付编号"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="money"
            label="支付金额(元)"
             align="center"
            width="120"
          ></el-table-column>
          <el-table-column   align="center" prop="state" label="支付状态">
            <template slot-scope="scope">
              <span
                style="color: #f00; font-weight: bold;"
                v-if="scope.row.state == 0"
                >未缴纳</span
              >
              <span style="color: #53c553;" v-if="scope.row.state == 1"
                >已缴纳</span
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
      size: 10,
      current: 1,
      total: 10,
      propertyList: [],
      showList: [],
      inputValue: "", // 搜索类型
      inputSeachValue: '', // 搜索数据
      inputdata:[
        {
          value: '',
          label: '搜索类型无'
        },
        {
          value: 2,
          label: '订单号码'
        },
        {
          value: 3,
          label: '房屋ID'
        },
        {
          value: 4,
          label: '用户ID'
        }
      ],
      select: "", // 选择类型
      stateValue: '', // 缴费类型
      state:[
        {
          value: '',
          label: '缴费类型无'
        },
        {
          value: 0,
          label: '未缴纳'
        },
        {
          value: 1,
          label: '已缴纳'
        }
      ],
      payTypeValue: '', //支付方式
      payType:[
        {
          value: '',
          label: '支付方式无'
        },
        {
          value: 0,
          label: '余额支付'
        },
        {
          value: 1,
          label: '支付宝'
        },
        {
          value: 2,
          label: '微信'
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    /**
     *  支付方式未作处理                 支付方式 0---余额支付 1----支付宝 2----微信
     * 订单号码 2
     * 房间ID 3
     * 用户ID 4
     */
    async getData() {
      console.log(this.inputValue)
      let data = {
        // payType: this.select == 1 ? this.inputValue : "",
        orderNum: this.inputValue == 2 ? this.inputSeachValue : "",
        state: this.stateValue, // 缴费状态 0----未缴纳 1----已缴纳
        payType: this.payTypeValue,  //支付方式 0---余额支付 1----支付宝 2----微信
        houseId: this.inputValue == 3 ? this.inputSeachValue : "",
        userId: this.inputValue == 4 ? this.inputSeachValue : ""
      };
      console.log('目标数据',data)
      const {
        data: res
      } = await this.$http.get("/propertyManagementFee/checkProFee", {
        params: data
      });
      console.log(res);
      if (res.code == 1002) {
        this.propertyList = res.data;
        this.total = res.data.length;
        this.showList = publicFun.filterList(
          this.current,
          this.size,
          this.propertyList
        );
      }
    },
    search() {
      this.getData();
    },
    // 一页显示条数变化
    handleSizeChange(newSize) {
      this.size = newSize;
      this.showList = publicFun.filterList(
        this.current,
        this.size,
        this.propertyList
      );
    },
    // 当前页码变化
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      this.showList = publicFun.filterList(
        this.current,
        this.size,
        this.propertyList
      );
    }
  }
};
</script>
<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
  .property_box {
    width: 100%;
    height: 100%;
    overflow: scroll;
    .property {
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
