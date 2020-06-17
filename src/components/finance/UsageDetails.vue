<template>
  <div class="yunIntercom_box">
    <div class="yunIntercom">
      <!-- 公司管理 -->
      <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>房屋管理</el-breadcrumb-item>
        <el-breadcrumb-item>使用明细</el-breadcrumb-item>
      </el-breadcrumb>

      <el-button @click="isAddYun = true" style="margin-bottom:10px;" type="primary">新增</el-button>

      <!-- 云对讲列表 -->
      <template>
        <el-table :data="targetData" border style="width: 100%">
          <el-table-column type="index" label="#" align="center"></el-table-column>
          <el-table-column prop="houseId" label="房屋id" align="center"></el-table-column>
          <el-table-column prop="type" label="收费类型" align="center"></el-table-column>
          <el-table-column prop="measure" label="数量" align="center"></el-table-column>
          <!-- <el-table-column prop="state" label="状态" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.canUse == 1">可用</span>
                  <span v-else>不可用</span>
              </template>
          </el-table-column> -->

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

         <el-form-item label="数量" prop="measure">
           <el-input type="number" v-model="targetDataForm.measure" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="收费类型" prop="type">
           <!-- <el-input type="type" v-model="targetDataForm.type" autocomplete="off"></el-input> -->
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

         <el-form-item label="价格" prop="measure">
           <el-input type="number" v-model="editYunFrom.measure" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="收费类型" prop="type">
           <!-- <el-input type="type" v-model="editYunFrom.type" autocomplete="off"></el-input> -->
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
      addpvalue: '', 
      houseId: '',
      addpolicecomName: [],
      targetDataForm: {
        // id: 1,
        houseId: '',
        measure: '',
        type: '',
      },
      targetDataRules: {
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
      isEditYun: false, // 编辑
      editYunFrom: {
        id: '',
       houseId: '',
        measure: '',
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
    this.getComName();
    
    this.houseId = this.$route.params.id;
    console.log('接受的id参数', this.houseId)
    this.getData(this.houseId);
  },
  methods: {
    async getData(id) { 
      const { data: res } = await this.$http.post(
        "/useDetails/getUseDetailsPage", null, {params: {
            houseId: id,
            current: this.current,
            size: this.size
        }}
      );
      console.log("明细返回数据", res);
        // return
      if (res.code == 1003) {
        this.targetData = res.data.records;
        this.total = res.data.total;
        this.current = res.data.current;
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
    },
    addYunNo(formName) {
      this.isAddYun = false;
      this.$refs[formName].resetFields();
      this.fileList = []
    },
    editYunNo(formName){
        this.isEditYun = false
        this.$refs[formName].resetFields();
        this.fileList2 = []
    },
    // 新增提交
   async addYunOk(formName) {
       let _this = this
       if(!this.houseId) {
           this.$message.error('刷新页面数据丢失，请重新进入此页面')
           return
       }
       this.targetDataForm.houseId = this.houseId
       this.targetDataForm.type = this.addpvalue
       console.log(this.targetDataForm) 
    //    return
       const {data: res} = await this.$http.post('/useDetails/addorupdate',null, {params:this.targetDataForm})
       console.log('新增返回数据', res)
       if(res.code === 1001){
           this.$message.success('添加成功')
           this.getData(this.houseId)
           this.isAddYun = false
            
       }else{
           this.$message.error('添加失败')
            this.isAddYun = false
       }
       this.addpvalue = ''
    },
    // 编辑提交
    async editYunOk(formName){
        console.log('编辑',  this.editYunFrom)
         this.editYunFrom.type = this.addpvalue
        // return
       const {data: res} = await this.$http.post('/useDetails/addorupdate',null, {params: this.editYunFrom})
       console.log('修改返回数据', res)
       if(res.code === 1001){
           this.$message.success('修改成功')
           this.getData(this.houseId)
           this.isEditYun = false
           this.addpvalue = ''
       }else{
           this.$message.error('修改失败')
            this.isEditYun = false
       }
       this.addpvalue = ''
    },
    // 编辑按钮
    editClick(scope){
        console.log('scope', scope)
        this.addpvalue = scope.type
        this.editYunFrom = scope
        console.log(this.editYunFrom, 'xxx')
        this.isEditYun = true
    },
    // 删除按钮
    deleteClick(scope){
       this.$confirm("此操作将永久删除该条数据，是否继续？")
        .then(async () => {
          console.log('删除',scope)
            const {data:res} = await this.$http.post('/useDetails/delete', null, {params: {id: scope.id}})
            console.log('删除后',res)
            if(res.code === 1001){
            this.$message.success('删除成功')
            this.getData(this.houseId)
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

      .paging {
        display: flex;
        justify-content: center;
        margin: 10px 0;
      }
    }
  }
}
</style>
