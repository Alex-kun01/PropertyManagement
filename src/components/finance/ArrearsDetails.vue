<template>
  <div class="yunIntercom_box">
    <div class="yunIntercom">
      <!-- 公司管理 -->
      <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>欠费明细</el-breadcrumb-item>
      </el-breadcrumb>

      
       <div class="search_box">
         <div class="sear_item">
           <el-input placeholder="产权人姓名" v-model="searchValue">
            <template slot="append">
              <div style="cursor: default"  @click="searchs">搜索</div>
            </template>
            
          </el-input>
         </div>
         <el-button @click="jiaofei" style="margin-left:10px;" type="success">缴费</el-button>
         <el-button @click="isAddYun = true" style="margin-left:10px;" type="primary">新增</el-button>

       </div>

      <!-- 展示列表 -->
      <template>
          
        <el-table :data="targetData" border style="width: 100%">
          <el-table-column type="index" label="#" align="center"></el-table-column>
          <!-- <el-table-column prop="propertyOwner" label="产权人" align="center"></el-table-column> -->
          <el-table-column prop="propertyOwnerName" label="产权人姓名" align="center"></el-table-column>
          <el-table-column prop="expenseCategory" label="费用类别" align="center"></el-table-column>
          <el-table-column prop="amountReceivable" label="应收金额" align="center"></el-table-column>
          <el-table-column prop="billingCycle" label="计费周期" align="center"></el-table-column>
          <el-table-column prop="beginDate" label="开始日期" align="center"></el-table-column>
          <el-table-column prop="endDate" label="结束日期" align="center"></el-table-column>
          <el-table-column prop="type" label="状态" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.type == 0">欠费</span>
                  <span v-if="scope.row.type == 1">已交</span>
                  <span v-if="scope.row.type == 2">预交</span>
              </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button  @click="editClick(scope.row)" type="primary" size="mini">编辑</el-button>
              <el-button  @click="deleteClick(scope.row)" type="danger" size="mini">删除</el-button>
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


      <!-- 费用单 -->
      <div class="expense_list"
      v-if="isPriceGetOk"
      >
          <div class="item_box">
            <div class="item">
            <div class="title">应收总计 </div>
            <el-input disabled v-model="allPriceInfo.yingPriceAll"></el-input>
          </div>

           <div class="item">
            <div class="title">实收金额 </div>
            <el-input v-model="allPriceInfo.shiPriceAll"></el-input>
          </div>

          <div class="item">
            <div class="title">缴费笔数 </div>
            <el-input disabled v-model="allPriceInfo.priceNum"></el-input>
          </div>

          <div class="item">
            <div class="title">收款方式 </div>
            <el-select v-model="allPriceInfo.payType" placeholder="请选择">
            <el-option
              v-for="item in optionsType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </div>

          </div>
          <div class="sub_btn">
             <el-button @click="subALlPrice" type="success">确认收款</el-button>
          </div>
      </div>

      <!-- 新增对话框 -->
      <el-dialog title="新增" :visible.sync="isAddYun" width="50%" :before-close="addYunClose">
        <el-form
        :model="targetDataForm"
        :rules="targetDataRules"
        ref="targetDataRef"
        label-width="100px"
        class="addpolice_from"
      >

         <!-- <el-form-item label="房屋id" prop="houseId">
           <el-input type="houseId" v-model="targetDataForm.houseId" autocomplete="off"></el-input> -->
             <!-- <el-select v-model="addpvalue" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select> -->
         <!-- </el-form-item> -->

         <!-- <el-form-item label="产权人" prop="propertyOwner">
           <el-input type="" v-model="targetDataForm.propertyOwner" autocomplete="off"></el-input>
         </el-form-item> -->

         <el-form-item label="产权人姓名" prop="propertyOwnerName">
           <el-input type="" v-model="targetDataForm.propertyOwnerName" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="费用类别" prop="expenseCategory">
           <!-- <el-input type="" v-model="targetDataForm.expenseCategory" autocomplete="off"></el-input> -->
           <el-select v-model="addpvalue3" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>

         <el-form-item label="应收金额" prop="amountReceivable">
           <el-input type="" v-model="targetDataForm.amountReceivable" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="计费周期" prop="billingCycle">
           <el-input type="" v-model="targetDataForm.billingCycle" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="开始日期" prop="beginDate">
           <!-- <el-input type="" v-model="targetDataForm.beginDate" autocomplete="off"></el-input> -->
           <el-date-picker
                v-model="targetDataForm.beginDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
         </el-form-item>

         <el-form-item label="结束日期" prop="endDate">
           <!-- <el-input type="" v-model="targetDataForm.endDate" autocomplete="off"></el-input> -->
           <el-date-picker
                v-model="targetDataForm.endDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
         </el-form-item>
         
         <el-form-item label="状态" prop="type">
           <!-- <el-input type="" v-model="targetDataForm.type" autocomplete="off"></el-input> -->
           <el-select v-model="addpvalue" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>

         <!-- <el-form-item label="收费类型" prop="type"> -->
           <!-- <el-input type="type" v-model="targetDataForm.type" autocomplete="off"></el-input> -->
           <!-- <el-select v-model="addpvalue" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option> -->
            <!-- </el-select>
         </el-form-item> -->

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addYunNo('targetDataRef')">取 消</el-button>
          <el-button type="primary" @click="addYunOk('targetDataRef')">确 定</el-button>
        </span>
      </el-dialog>


       <!-- 编辑对话框 -->
      <el-dialog title="编辑" :visible.sync="isEditYun" width="30%" :before-close="editYunClose">
        <el-form
          :model="editYunFrom"
          :rules="editYunRules"
          ref="editYundRef"
          label-width="100px"
          class="addpolice_from"
        >
          <!-- <el-form-item label="房屋id" prop="houseId">
           <el-input type="communityName" v-model="targetDataForm.houseId" autocomplete="off"></el-input> -->
             <!-- <el-select v-model="addpvalue" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select> -->
         <!-- </el-form-item> -->

         <!-- <el-form-item label="产权人" prop="propertyOwner">
           <el-input type="" v-model="editYunFrom.propertyOwner" autocomplete="off"></el-input>
         </el-form-item> -->

         <el-form-item label="产权人姓名" prop="propertyOwnerName">
           <el-input type="" v-model="editYunFrom.propertyOwnerName" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="费用类别" prop="expenseCategory">
           <!-- <el-input type="" v-model="editYunFrom.expenseCategory" autocomplete="off"></el-input> -->
           <el-select v-model="addpvalue3" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>

         <el-form-item label="应收金额" prop="amountReceivable">
           <el-input type="" v-model="editYunFrom.amountReceivable" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="计费周期" prop="billingCycle">
           <el-input type="" v-model="editYunFrom.billingCycle" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="开始日期" prop="beginDate">
           <!-- <el-input type="" v-model="editYunFrom.beginDate" autocomplete="off"></el-input> -->
           <el-date-picker
                v-model="editYunFrom.beginDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
         </el-form-item>

         <el-form-item label="结束日期" prop="endDate">
           <!-- <el-input type="" v-model="editYunFrom.endDate" autocomplete="off"></el-input> -->
           <el-date-picker
                v-model="editYunFrom.endDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
         </el-form-item>
         
         <el-form-item label="状态" prop="type">
           <!-- <el-input type="" v-model="editYunFrom.type" autocomplete="off"></el-input> -->
           <el-select v-model="addpvalue" placeholder="请选择">
                <el-option
                v-for="item in addpolicecomName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>


        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editYunNo('editYundRef')">取 消</el-button>
          <el-button type="primary" @click="editYunOk('editYundRef')">确 定</el-button>
        </span>
      </el-dialog>


    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      size: 10, // 一页显示条数
      pages: 1, //总页数
      current: 1, // 当前页码
      total: 0, // 总共条数
      targetData: [], // 渲染数据
      isAddYun: false, // 是否展示新增对话框
      isPriceGetOk: false, // 是否展示缴费单
      isgetBtnOk: false, // 是否可以点击缴费按钮
      allPriceInfo: {
        yingPriceAll: 0, // 应收总额
        shiPriceAll: '', // 实收总额
        priceNum: 0, // 缴费笔数
        payType: ''
      },
      addpvalue: '', 
      propertyOwnerName: '', // 产权人姓名
      addpvalue3: '',
      addpolicecomName3: [], // 费用类别
      addpolicecomName: [
          {
              value: 0,
              label: '欠费'
          },
          {
              value: 1,
              label: '已交'
          },
          {
              value: 2,
              label: '预交'
          }
      ],
      // 收款方式选中
      payType: '',
      // 收款方式列表
      optionsType:[
        {
          value: 1,
          label: '现金'
        },
        {
          value: 2,
          label: '支付宝'
        },
        {
          value: 3,
          label: '微信'
        },
      ],
      targetDataForm: {
        // id: 1,
        propertyOwner: '',
        propertyOwnerName: '',
        expenseCategory: '',
        amountReceivable: '',
        billingCycle: '',
        beginDate: '',
        endDate: '',
        type: '',
      },
      targetDataRules: {
        propertyOwner: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        propertyOwnerName: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        expenseCategory: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        amountReceivable: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        billingCycle: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        beginDate: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        type: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
      },
      searchValue: '', // 搜索值
      isEditYun: false, // 编辑
      editYunFrom: {
        id: '',
        propertyOwner: '',
        propertyOwnerName: '',
        expenseCategory: '',
        amountReceivable: '',
        billingCycle: '',
        beginDate: '',
        endDate: '',
        type: '',
      },
      editYunRules: {
        //新增数据规则
        id: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        houseId: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        measure: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
        type: [
          { required: true, message: "此项不能为空，请填写", trigger: "blur" }
        ],
      },
    };
  },
  mounted() {
    this.getData();
    this.gettype()
  },
  methods: {
    async getData(id) { 
      const { data: res } = await this.$http.post(
        "/propertyDetailsOverdue/getPropertyDetailsOverduePage", null, {params: {
            propertyOwnerName: this.searchValue,
            current: this.current,
            size: this.size
        }}
      );
      console.log("欠费返回数据", res);
        // return
      if (res.code === 1003) {
        this.targetData = res.data.records;
        // console.log('查看当前页面targetData',  this.targetData)
        this.total = res.data.total;
        this.current = res.data.current;
        if(this.searchValue){
          console.log('有值',this.isgetBtnOk)
          this.isgetBtnOk = true
        }else{
          this.isgetBtnOk = false
          console.log('无值',this.isgetBtnOk)
        }
      } else {
        this.$message({
          message: "服务器请求出错",
          type: "danger"
        });
      }
    },
    // 每页显示条数变化
    handleSizeChange(newSize) {
      this.size = newSize;
      this.getData();
    },
    // 当前页变化
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      this.getData();
    },
    addYunClose() {
      this.isAddYun = false;
    },
    editYunClose(){
        this.isEditYun = false;
        this.addpvalue3 = ''
    },
    addYunNo(formName) {
      this.isAddYun = false;
      this.$refs[formName].resetFields();
      this.fileList = []
      this.addpvalue3 = ''
    },
    editYunNo(formName){
        this.isEditYun = false
        this.$refs[formName].resetFields();
        this.fileList2 = []
        this.addpvalue3 = ''
    },
    // 新增提交
   async addYunOk(formName) { 
       let _this = this
       this.targetDataForm.type = this.addpvalue   
       this.targetDataForm.expenseCategory = this.addpvalue3 
       console.log(this.targetDataForm) 
    //    return
       const {data: res} = await this.$http.post('/propertyDetailsOverdue/addOrUpdate',null, {params:this.targetDataForm})
       console.log('新增返回数据', res)
       if(res.code === 1001){
           this.$message.success('添加成功')
           this.getData()
           this.isAddYun = false
            
       }else{
           this.$message.error('添加失败')
            this.isAddYun = false
       }
       this.addpvalue = ''
       this.addpvalue3 = ''
    },
    // 编辑提交
    async editYunOk(formName){
        
         this.editYunFrom.type = this.addpvalue
         this.editYunFrom.expenseCategory = this.addpvalue3 
         console.log('编辑',  this.editYunFrom)
        // return
       const {data: res} = await this.$http.post('/propertyDetailsOverdue/addOrUpdate',null, {params: this.editYunFrom})
       console.log('修改返回数据', res)
       if(res.code === 1001){
           this.$message.success('修改成功')
           this.getData()
           this.isEditYun = false
           this.addpvalue = ''
       }else{
           this.$message.error('修改失败')
            this.isEditYun = false
       }
       this.addpvalue = ''
       this.addpvalue3 = ''
    },
    // 编辑按钮
    editClick(scope){
        console.log('scope', scope)
        this.addpvalue = scope.type 
        this.addpvalue3 = scope.expenseCategory
        this.editYunFrom = scope
        console.log(this.editYunFrom, 'xxx')
        this.isEditYun = true
    },
    // 删除按钮
    deleteClick(scope){
        console.log('删除',scope)
       this.$confirm("此操作将永久删除该条数据，是否继续？")
        .then(async () => {
          
            const {data:res} = await this.$http.post('/propertyDetailsOverdue/delete', null, {params: {id: scope.id}})
            console.log('删除后',res)
            if(res.code === 1001){
            this.$message.success('删除成功')
            this.getData()
            }else{
            this.$message.error('删除失败')
            }
        })
        .catch(() => {
          this.$message({
            message: "已取消",
            type: "info"
          });
        });
      
    },
    // 获取小区列表
       async getComName(){
            //addpolicecomName  communityName
            const {data: res} = await this.$http.post('/expenseCategory/getExpenseCategoryList')
            console.log('请求小区列表', res.data)
            let data = res.data || []
            let dataArr = []
            let index = 1
            data.forEach(item=>{
                let options = {
                    value: item.type,
                    label: item.type
                }
                dataArr.push(options)
            })
            this.addpolicecomName = dataArr
            console.log('小区列表', this.addpolicecomName)
        },
        // 获取费用类别数据
        async gettype(){
            const {data:res} = await this.$http.post('/expenseCategory/getExpenseCategoryList')
            console.log('费用类别数据', res)
            if(res.code === 1003){
                let data = res.data || []
                let dataArr = []
                let index = 1
                data.forEach(item=>{
                    let options = {
                        value: item.type,
                        label: item.type
                    }
                    dataArr.push(options)
                })
                this.addpolicecomName3 = dataArr
                console.log('小区列表', this.addpolicecomName )
            }else{
                this.$message.error('费用类别数据获取失败')
            }
        },
        // 搜索
        searchs(){
          this.getData()
        },
        // 缴费
        jiaofei(){
          let _this = this
          console.log('到底有不有值', this.isgetBtnOk)
          if(!this.isgetBtnOk){
            this.$message.warning('请先搜索产权人')
            return
          }else{
            this.targetData.forEach(item =>{
              console.log('item', item)
              _this.allPriceInfo.yingPriceAll = _this.allPriceInfo.yingPriceAll + item.amountReceivable
              _this.allPriceInfo.priceNum++
            })
          }
          this.isPriceGetOk = true
        },
        // 确认收款
        async subALlPrice(){
          console.log('确认收款',this.allPriceInfo)
          if(this.allPriceInfo.yingPriceAll != this.allPriceInfo.shiPriceAll){
            this.$message.warning('实收金额与应收金额不符！！！')
            return
          }
          if(!this.allPriceInfo.payType){
            this.$message.warning('请选择付款方式')
            return
          }
          let idsArr = []
          let datas = {
            ids: '',
            // allprice: this.allPriceInfo.shiPriceAll,
            payMethod: this.allPriceInfo.payType
          }
          this.targetData.forEach(item =>{
            idsArr.push(item.id)
          })
          datas.ids = idsArr.join(',')

          console.log('传递参数', datas)
          // return
          const {data:res} = await this.$http.post('/propertyDetailsOverdue/payMoney', null, {params: datas})
          console.log('确认收款返回数据', res)
          if(res.code === 1001){
            this.$message.success('缴费成功')
          }else{
            this.$message.error('缴费失败')
          }
        }
  },
};
</script>
<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
  .yunIntercom_box {
    width: 100%;
    height: 100%;
    overflow: scroll;
    .yunIntercom {
      width: 100%;
      height: 100%;
      .search_box{
        width: 100%;
        margin-bottom: 15px;
        display: flex;
        // align-items: center;
        .sear_item{
          width: 300px;
        }
      }
      .expense_list{
        widows: 100%;
        // height: 250px;
        background: #eee;
        box-sizing: border-box;
        padding: 15px;
        .sub_btn{
          width: 100%;
          height: 50px;
          margin-top: 100px;
          display: flex;
          justify-content: flex-end;
          box-sizing: border-box;
          padding-right: 50px;
        }
        .item_box{
          display: flex;
          .item{
            width: 250px;
            display: flex;
            align-items: center;
            margin-right: 50px;
          .title{
            width: 100px;
          }
        }
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
</style>
