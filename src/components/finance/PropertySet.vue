<template>
  <div class="propertySet_box">
    <!-- 物业费设置 -->
    <!-- <div class="propertySet">
            <span>当前物业费（元/平米）：</span>
            <el-input v-model="propertyFee"></el-input>
            <el-button @click="editPropertyFee" type="info">修改</el-button>
    </div>-->
    <el-button @click="addDialogVisible = true" type="primary" style="margin: 10px 0 10px 0;">新增</el-button>
    <el-table :data="xiaoquList" border style="width: 100%">
      <el-table-column prop="id" align="center" label="ID" width="40px"></el-table-column>
      <el-table-column prop="comName" label="小区名称" align="center"></el-table-column>
      <el-table-column prop="mercialHouse" label="商品房单价(元/月/平米)" align="center"></el-table-column>
      <el-table-column prop="restHouse" label="安置房单价(元/月/平米)" align="center"></el-table-column>
      <el-table-column prop="shopHouse" label="商铺单价(元/月/平米)" align="center"></el-table-column>
      <el-table-column prop="garbageFee" label="垃圾处理费(元/户)" align="center"></el-table-column>
      <el-table-column prop="nonMotBig" label="非机动车大车收费(元)" align="center"></el-table-column>
      <el-table-column prop="nonMotSmall" label="非机动车小车收费(元)" align="center"></el-table-column>
      <el-table-column prop="parkId" label="停车场ID" align="center"></el-table-column>
      <!-- 新加字段 -->
      <el-table-column prop="customerCenterTelephone" label="客户中心电话" align="center"></el-table-column>
      <el-table-column prop="engineeringTelephone" label="工程电话" align="center"></el-table-column>

      <el-table-column align="center" prop="companyId" width="130" label="所属物业公司"></el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="saveNewPrice(scope.row)" type="primary" size="mini">
            <i class="el-icon-edit"></i>编辑
          </el-button>
          <el-button @click="deleteNewPrice(scope.row)" type="danger" size="mini">
            <i class="el-icon-delete"></i>删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <el-dialog
      title="修改信息"
      :visible.sync="isEditBuilder"
      width="30%"
      :before-close="editHandleClose"
    >
      <el-form
        :model="editBuilderFrom"
        ref="editBuilderRef"
        label-width="100px"
        class="addpolice_from"
      >
        <el-form-item label="小区名" prop="comName">
          <!-- <el-input type="text" disabled v-model="editBuilderFrom.comName" autocomplete="off"></el-input> -->
           <el-select v-model="addpvalue3" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="商品房单价" prop="mercialHouse">
          <el-input type="number" v-model="editBuilderFrom.mercialHouse" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="安置房单价" prop="restHouse">
          <el-input type="number" v-model="editBuilderFrom.restHouse" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商铺单价" prop="shopHouse">
          <el-input type="number" v-model="editBuilderFrom.shopHouse" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="垃圾处理费" prop="garbageFee">
          <el-input type="number" v-model="editBuilderFrom.garbageFee" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="非机动车大车收费" prop="nonMotBig">
          <el-input type="number" v-model="editBuilderFrom.nonMotBig" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="非机动车小车收费" prop="nonMotSmall">
          <el-input type="number" v-model="editBuilderFrom.nonMotSmall" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 新增字段 -->

        <el-form-item label="客户中心电话" prop="customerCenterTelephone">
          <el-input type="" v-model="editBuilderFrom.customerCenterTelephone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="工程电话" prop="engineeringTelephone">
          <el-input type="" v-model="editBuilderFrom.engineeringTelephone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="停车场id" prop="nonMotBig">
          <!-- <el-input type="number" v-model="editBuilderFrom.nonMotBig" autocomplete="off"></el-input> -->
            <el-select v-model="addpvalue1" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="所属物业公司" prop="companyId">
            <el-select v-model="addpvalue2" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>


      </el-form>

      

      

      <span slot="footer" class="dialog-footer">
        <el-button @click="editBuilderNo('editBuilderRef')">取 消</el-button>
        <el-button type="primary" @click="editBuilderOk('editBuilderRef')">提交</el-button>
      </span>
    </el-dialog>

    <!-- 新增对话框 -->
    <el-dialog
      title="新增物业费"
      :visible.sync="addDialogVisible"
      width="30%"
      :before-close="addHandleClose"
    >
      <el-form
        :model="addProertyForm"
        ref="addProertyRef"
        label-width="100px"
        class="addpolice_from"
      >
        <el-form-item label="小区名" prop="comName">
          <el-input type="text" v-model="addProertyForm.comName" autocomplete="off"></el-input>
          <!-- <el-select v-model="addpvalue3" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select> -->
        </el-form-item>

        <el-form-item label="商品房单价" prop="mercialHouse">
          <el-input type="number" v-model="addProertyForm.mercialHouse" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="安置房单价" prop="restHouse">
          <el-input type="number" v-model="addProertyForm.restHouse" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商铺单价" prop="shopHouse">
          <el-input type="number" v-model="addProertyForm.shopHouse" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="垃圾处理费" prop="garbageFee">
          <el-input type="number" v-model="addProertyForm.garbageFee" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="非机动车大车收费" prop="nonMotBig">
          <el-input type="number" v-model="addProertyForm.nonMotBig" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="非机动车小车收费" prop="nonMotSmall">
          <el-input type="number" v-model="addProertyForm.nonMotSmall" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 新增字段 -->

        <el-form-item label="客户中心电话" prop="customerCenterTelephone">
          <el-input type="" v-model="addProertyForm.customerCenterTelephone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="工程电话" prop="engineeringTelephone">
          <el-input type="" v-model="addProertyForm.engineeringTelephone" autocomplete="off"></el-input>
        </el-form-item>


         <el-form-item label="停车场id" prop="nonMotBig">
            <el-select v-model="addpvalue1" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="所属物业公司" prop="companyId">
            <el-select v-model="addpvalue2" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      propertyFee: "",
      xiaoquList: [], // 小区物业列表
      isEditBuilder: false,
      editBuilderFrom: {
        id: "",
        comName: "", // 小区名
        mercialHouse: "", // 商品房单价
        restHouse: "", // 安置房单价
        shopHouse: "", // 商铺单价
        garbageFee: "", // 垃圾费
        nonMotBig: "", //
        nonMotSmall: "",
        parkId:"",
        companyId:"",
        customerCenterTelephone:'',
        engineeringTelephone:''
      },
      addpvalue1:'',
        addpolicecomName1: [],
         addpvalue2:'',
        addpolicecomName2: [],
        addpvalue3:'',
        addpolicecomName3: [],
      addDialogVisible: false, // 新增物业费对话框
      addProertyForm: {
        comName: "", // 小区名
        mercialHouse: "", // 商品房单价
        restHouse: "", // 安置房单价
        shopHouse: "", // 商铺单价
        garbageFee: "", // 垃圾费
        nonMotBig: "", //
        parkId:"",
        companyId:"",
        customerCenterTelephone:'',
        engineeringTelephone:''
      }
    };
  },
  mounted() {
    this.getData();
    this.getComName()
    this.getComName2()
    this.getComName3()
    this.getWuYeXiaoQuList();
  },
  methods: {
    async getData() {
      const { data: res } = await this.$http.get("/dictionary/obeyFee");
      console.log(res.data);
      this.propertyFee = res.data;
    },
    // 编辑小区物业费
    saveNewPrice(item) {
      console.log(item, "小区item");
      this.isEditBuilder = true;
      this.editBuilderFrom = item
      this.addpvalue1 = item.parkId
      this.addpvalue2 = item.companyId
      this.addpvalue3 = item.comName
    },
    // 删除小区物业费
    deleteNewPrice(scope) {
         console.log(scope);
      this.$confirm("此操作将永久删除该房屋信息，是否继续？")
        .then(async () => {
         
          const { data: res } = await this.$http.post(
            "/comFee/deleteHouseFee",
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
    },
    // 获取公司列表数据
    async getComName2(){
            const {data: res} = await this.$http.post('/comyApply/getComyApplyList')
            console.log('请求物业公司列表', res.data)
            // return
            let data = res.data || []
            let dataArr = []
            let index = 1
            data.forEach(item=>{
                let options = {
                    value: item.id,
                    label: item.compName
                }
                dataArr.push(options)
            })
            this.addpolicecomName2 = dataArr
            console.log('小区列表', this.addpolicecomName2 )
        },

    // 获取停车场id
    async getComName(){
            const {data: res} = await this.$http.post('/carPark/getCarParksList')
            console.log('请求停车场id列表', res.data)
            // return
            let data = res.data || []
            let dataArr = []
            let index = 1
            data.forEach(item=>{
                let options = {
                    value: item.parkId,
                    label: item.parkId
                }
                dataArr.push(options)
            })
            this.addpolicecomName1 = dataArr
            console.log('小区列表', this.addpolicecomName1 )
        },
         // 获取小区列表
       async getComName3(){
            const {data: res} = await this.$http.get('/house/changeCom')
            console.log('请求小区列表', res.data)
            let data = res.data || []
            let dataArr = []
            let index = 1
            data.forEach(item=>{
                let options = {
                    value: item.communityName,
                    label: item.communityName
                }
                dataArr.push(options)
            })
            this.addpolicecomName3 = dataArr
            console.log('小区列表', this.addpolicecomName3 )
        },
    // 关闭编辑对话框
    editHandleClose() {
      this.isEditBuilder = false;
    },
    // 取消编辑
    editBuilderNo(formName) {
      this.isEditBuilder = false;
      this.FormInit();
    },

    // 确定编辑
    editBuilderOk() {
      let data = this.editBuilderFrom;
      if (
        data.comName < 0 ||
        data.mercialHouse < 0 ||
        data.restHouse < 0 ||
        data.shopHouse < 0 ||
        data.garbageFee < 0
      ) {
        this.$message({
          type: "warning",
          message: "价格不得小于0"
        });
        return;
      }
      data.parkId = this.addpvalue1
      data.companyId = this.addpvalue2
      data.comName = this.addpvalue3
      console.log('编辑', data)
    //   return
      this.$http
        .post("/comFee/editHouseFee", null, { params: data })
        .then(res => {
          if (res.data.code >= 1000) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
            (this.isEditBuilder = false), this.FormInit();
            this.getWuYeXiaoQuList();
            this.addpvalue1 = ''
            this.addpvalue2 = ''
            this.addpvalue3 = ''
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },

    // 初始化form
    FormInit() {
      this.editBuilderFrom = {
        id: "",
        comName: "", // 小区名
        mercialHouse: "", // 商品房单价
        restHouse: "", // 安置房单价
        shopHouse: "", // 商铺单价
        garbageFee: "", // 垃圾费
        parkId:"",
        companyId:""
      };
    },

    // 获取小区物业费列表
    // /comFee/lookHouseFee
    // /comFee/editHouseFee
    getWuYeXiaoQuList() {
      this.$http.post("/comFee/lookHouseFee").then(res => {
        console.log(res.data, "小区物业列表");
        if (res.data.code == 1002) {
          this.xiaoquList = res.data.data;
        } else {
          this.$message({
            type: "warning",
            message: res.data.msg
          });
        }
      });
    },

    // 修改物业费
    editPropertyFee() {
      this.$confirm("该操作将修改当前物业费，是否继续？")
        .then(() => {
          this.$http
            .post("/dictionary/editFee", null, {
              params: { fee: this.propertyFee }
            })
            .then(res => {
              console.log(res);
              if (res.data.code == 1000) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.getData();
              } else {
                this.$message({
                  message: "修改失败",
                  type: "danger"
                });
              }
            })
            .catch(res => {
              this.$message({
                message: "Error",
                type: "danger"
              });
            });
        })
        .catch(() => {
          this.$message("已取消");
        });
    },
    // 关闭新增物业对话框
    addHandleClose() {
      this.addDialogVisible = false;
    },
    // 确定新增
    async addClick() {
      console.log(this.addProertyForm);
      
      this.addProertyForm.parkId = this.addpvalue1
      this.addProertyForm.companyId = this.addpvalue2
      // this.addProertyForm.comName = this.addpvalue3
      if (!this.addProertyForm.comName || !this.addProertyForm.garbageFee) {
        this.$message("小区名/垃圾处理费不能为空");
        return;
      }
      const { data: res } = await this.$http.post("/comFee/addHouseFee", null, {
        params: this.addProertyForm
      });
      console.log("添加返回数据", res);
      if (res.code == 1000) {
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.getWuYeXiaoQuList();
        this.addDialogVisible = false;
        this.addpvalue1 = ''
        this.addpvalue2 = ''
        this.addpvalue3 = ''
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
  .propertySet_box {
    width: 100%;
    height: 100%;
    overflow: scroll;
    .propertySet {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      span {
        color: #666;
      }
      .el-input {
        width: 200px;
        margin: 0 10px;
      }
      .paging {
        display: flex;
        justify-content: center;
        margin: 10px 0;
      }
    }
  }
}
</style>