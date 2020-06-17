<template>
  <div class="yunIntercom_box">
    <div class="yunIntercom">
      <!-- 预交费管理 -->
      <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>预交费管理</el-breadcrumb-item>
      </el-breadcrumb>

      
       <div class="search_box">
         <div class="sear_item">
           <el-input placeholder="请输入产权人手机号" v-model="searchValue">
            <template slot="append">
              <div style="cursor: default"  @click="searchs">搜索</div>
            </template>
            
          </el-input>
         </div>
         <el-button @click="addTempClick" style="margin-left:10px;" type="primary">添加</el-button>
         <el-button @click="jiaofei" style="margin-left:10px;" type="success">预缴</el-button>
         

       </div>

      <!-- 展示列表 -->
      <div class="add_list">
          <div class="item">
              <div class="item_i">产权人id</div>
              <div class="item_i">产权人姓名</div>
              <div class="item_i">手机号</div>
              <div class="item_i">费用id</div>
              <div class="item_i">费用类别</div>
              <div class="item_i">预缴金额</div>
              <div class="item_i">操作</div>
          </div>
          <div class="item"
          v-for="(item,index) in targetData"
          :key='index'
          >
            <div class="item_l"
                v-for="(option,oix) in item"  
                :key='oix'
            >
                <span v-if="oix == 'propertyOwner' || oix == 'propertyOwnerName' || oix == 'phone' || oix == 'expenseCategoryId'">{{option}}</span>
                <!-- <el-button v-if="oix == 'mNull'" @click="deleteClick(item,index)" type="danger" size="mini">删除</el-button> -->
                
                <el-input v-if="oix == 'amountReceivable'" @input="inputblur(item,index)" v-model="inputValue1[index]" placeholder=""></el-input>
                
                <el-select @change="changeselect(item,index)" v-if="oix == 'expenseCategory'" v-model="selectValue1[index]" placeholder="请选择">
                    <el-option
                    v-for="item in addpolicecomName3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>

            </div>
          </div>
      </div>
      
      <!-- 费用单 -->
      <div class="expense_list"
      v-if="isPriceGetOk"
      >
          <div class="item_box">
            <div class="item">
            <div class="title">应收总计 </div>
            <el-input disabled v-model="yingPriceAll"></el-input>
          </div>

           <div class="item">
            <div class="title">实收金额 </div>
            <el-input v-model="allPriceInfo.shiPriceAll"></el-input>
          </div>

          <div class="item">
            <div class="title">缴费笔数 </div>
            <el-input disabled v-model="priceNum"></el-input>
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


      <div class="list_box" style="margin-top:100px;">
           <!-- 展示列表 -->
      <template>
          
        <el-table :data="showList" border style="width: 100%;">
          <el-table-column type="index" label="#" align="center"></el-table-column>
          <!-- <el-table-column prop="propertyOwner" label="产权人" align="center"></el-table-column> -->
          <el-table-column prop="propertyOwnerName" label="产权人姓名" align="center"></el-table-column>
          <el-table-column prop="expenseCategory" label="费用类别" align="center"></el-table-column>
          <el-table-column prop="amountReceivable" label="应收金额" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
          <el-table-column prop="updateTime" label="预缴日期" align="center"></el-table-column>

          <!-- <el-table-column prop="endDate" label="结束日期" align="center"></el-table-column>
          <el-table-column prop="type" label="状态" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.type == 0">欠费</span>
                  <span v-if="scope.row.type == 1">已交</span>
                  <span v-if="scope.row.type == 2">预交</span>
              </template>
          </el-table-column> -->

          <!-- <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button  @click="editClick(scope.row)" type="primary" size="mini">编辑</el-button> -->
              <!-- <el-button  @click="deleteClick(scope.row)" type="danger" size="mini">删除</el-button> -->
            <!-- </template>
          </el-table-column> -->
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
      showList:[],
      // 预缴搜索返回产权人数据
      addTemp: {
            propertyOwner: '',
            propertyOwnerName: '',
            phone: '',
            expenseCategoryId: '',
            expenseCategory: null,
            amountReceivable: null,
            mNull: null
      },
      targetData: [
      ], // 渲染数据
      isoption: 4,
      
      isAddYun: false, // 是否展示新增对话框
      isPriceGetOk: false, // 是否展示缴费单
      isgetBtnOk: false, // 是否可以点击缴费按钮
      inputValue1: [],
      selectValue1:[],
      allPriceInfo: {
        shiPriceAll: '', // 实收总额
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
  computed:{
      // 应收总金额
      yingPriceAll(){
          let allPrice = 0
          this.targetData.forEach(item =>{
              console.log('item', item)
            allPrice = allPrice + +item.amountReceivable
        })
            return allPrice
      },
      // 笔数
      priceNum(){
          let priceNum = 0
          this.targetData.forEach(item =>{
              console.log('item', item)
            priceNum++
        })
        return priceNum
      },
      // 判断是否可以提交
      isSubmitOk(){
          let isOk = true
            this.targetData.forEach(item =>{
              console.log('item', item)
              if(!item.amountReceivable || !item.expenseCategory){
                  isOk = false
              }
            })
          return isOk
      }
  },
  mounted() {
    this.getData();
    this.gettype()
    console.log('axiso', this.axios.post)
  },
  methods: {
      inputblur(item,index){
          console.log('input变化', item,index)
        this.targetData[index].amountReceivable = this.inputValue1[index]

      },
    async getData() { 
      const { data: res } = await this.$http.get(
        "/prePayment/getPrePaymentPage",{params: {
            current: this.current,
            size: this.size
        }}
      );
      console.log("预交费列表返回数据", res);
        // return
      if (res.code === 1003) {
        this.showList = res.data.records;
        console.log('查看当前页面targetData',  this.targetData)
        this.total = res.data.total;
        this.current = res.data.current;
        if(this.searchValue){
            // 满足预缴条件
          this.isgetBtnOk = true
        }else{
          this.isgetBtnOk = false
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
    tableRowClassName ({row, rowIndex}) {
      //把每一行的索引放进row
     row.index = rowIndex;
    },
    changeselect(item,index){
        console.log('发生变化select', item, index)
        this.targetData[index].expenseCategory = this.selectValue1[index]
        this.targetData[index].expenseCategoryId = this.selectValue1[index]
    },
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
    // 删除按钮
    deleteClick(item,index){
        console.log('删除',this.targetData)
    },
    // 添加预缴项
    addTempClick(){
        if(this.targetData.length == 0){
            this.$message.warning('请先查找产权人！')
            return
        }
        console.log('addTemp', this.addTemp)
        let newTemp = {...this.addTemp}

        this.targetData.push(newTemp)
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
                        value: item.id,
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
        async searchs(){
            if(!this.searchValue){
                this.$message.warning('请输入产权人手机号')
                return 
            }
            if(this.targetData.length >=1){
                this.$message.warning('请勿重复查找')
                return 
            }
            const {data:res} = await this.$http.post('/prePayment/checkPrePayment', null, {params: {phoneNum:this.searchValue}})
            console.log('搜索产权人返回数据', res)

            if(res.code === 1003){
                this.addTemp.propertyOwnerName = res.data.realName
                this.addTemp.propertyOwner = res.data.id
                this.addTemp.phone = res.data.phone
                // this.addTemp.propertyOwner = res.data.propertyOwner
                let newTemp = this.addTemp
                let myNewTemp = {...newTemp}

                this.targetData.push(myNewTemp)
            }else{
                this.$message.warning(res.msg)
            }
        },
        // 缴费
        jiaofei(){
          if(this.targetData.length == 0){
            this.$message.warning('请先搜索产权人')
            return
          }
          else{
               this.isPriceGetOk = true
          }
         
        },
        // 确认收款
        async subALlPrice(){
          console.log('确认收款',this.allPriceInfo)
          if(this.yingPriceAll != this.allPriceInfo.shiPriceAll){
            this.$message.warning('实收金额与应收金额不符！！！')
            return
          }
          if(!this.allPriceInfo.payType){
            this.$message.warning('请选择付款方式')
            return
          }
          if(!this.isSubmitOk){
               this.$message.warning('请检查，有未填写完的行')
              return
          }


          const {data:res} = await this.$http.post('/prePayment/createPrePayment', this.targetData)
          console.log('确认收款返回数据', res)
          if(res.code === 1001){
            this.$message.success('缴费成功')
            this.isPriceGetOk = false
            this.targetData = []
            this.getData()
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
      .add_list{
          width: 100%;
          .item{
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .item_i{
                  color: #909993;
                  font-weight: bold;
              }
              .item_i,.item_l{
                  width: 14.28%;
                  height: 38px;
                  border: 1px solid #EBEEF5;
                  
                  line-height: 38px;
                //   background-color: #eee;
                  text-align: center;
              }
              .item_l.active{

              }
          }
      }
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
        margin-top: 50px;
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
