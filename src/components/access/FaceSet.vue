<template>
    <div class="faceSet_box">
        <!-- 人脸设置 -->
        <div class="faceSet">
            
            <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>门禁管理</el-breadcrumb-item>
                <el-breadcrumb-item>开门记录</el-breadcrumb-item>
            </el-breadcrumb>

            <div class="add_btn" style="margin-bottom:10px;">
                <el-button @click="addFace" type="primary">添加</el-button>
            </div>

            <el-table
            :data="showList"
            border
            style="width: 100%"
            >
                <el-table-column type="index" label="#"  align="center" ></el-table-column>
                <el-table-column prop="id" label="人脸ID"  align="center"></el-table-column>
                <el-table-column prop="userName" label="用户名称"  align="center" ></el-table-column>
                <!-- <el-table-column prop="comName" label="公司名称"  align="center" width="130px"></el-table-column> -->
                <el-table-column prop="faceType" label="人脸类型"  align="center">
                    <!-- 1-白名单，2-黑名单 -->
                    <template slot-scope="scope">
                        <span style="color: #53c553;" v-if="scope.row.faceType == 1">白名单</span>
                        <span style="color: #f00" v-if="scope.row.faceType == 2">黑名单</span>
                    </template>
                </el-table-column>
                <el-table-column prop="communityName"  align="center" label="小区名称"></el-table-column>
                <!-- <el-table-column prop="periodsName" label="期数名称"  align="center" width="80px"></el-table-column> -->
                <!-- <el-table-column prop="buildingsName" label="栋数名称"  align="center" width="80"></el-table-column> -->
                <!-- <el-table-column prop="addTime" label="添加时间"  align="center">
                    <template slot-scope="scope">
                        {{timeChange(scope.row.addTime)}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="imgUrl"  align="center" label="图片">
                    <template slot-scope="scope">
                  <img
                    style="width: 100%; height: 100%; min-height:200px;"
                    :src="scope.row.img"/>
                </template>
                </el-table-column>
                <el-table-column prop="phone"  align="center" label="电话"></el-table-column>
                <el-table-column prop="sex" label="性别"  align="center" width="50px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.sex == 1">男</span>
                        <span v-if="scope.row.sex == 2">女</span>
                    </template>
                </el-table-column>
                <el-table-column prop="state"  align="center" label="状态">
                    <!-- 0-未注册，1-已注册 -->
                    <template slot-scope="scope">
                        <span style="color: #f00;" v-if="scope.row.state == 0">未注册</span>
                        <span style="color: #53c553;" v-if="scope.row.state == 1">已注册</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="note"  align="center" label="备注" width="100px"></el-table-column> -->
                <!-- <el-table-column prop="ra"  align="center" label="房间号" width="100px"></el-table-column> -->
                <el-table-column label="操作"  align="center">
                    <template slot-scope="scope">
                        <el-button @click="deleteFace(scope.row)" type="danger" size="mini"><i class="el-icon-delete"></i>删除</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <!-- 分页 -->
            <div class="paging">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="current"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>

        </div>

        <!-- 新增对话框 -->
        <el-dialog
        title="添加人脸"
        :visible.sync="isAddFace"
        width="50%"
        :before-close="addFaceClose"
        >

            <el-form :model="addFaceIdFrom"  :rules='addFaceIdRules' ref="addFaceIdRef" label-width="100px" class="addpolice_from">
                
                <el-form-item
                    label="小区名"
                    prop=""
                    >
                       <el-select v-model="addpvalue" placeholder="请选择">
                            <el-option
                            v-for="item in addpolicecomName"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </el-form-item>

                <el-form-item label="人脸照片" prop="img">
                    <!-- <input type="file" @change="inpChange" multiple id="imgLocal" accept="image/*" /> -->
                    <el-upload
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
                    </el-upload>
                </el-form-item>

                <el-form-item label="用户名" prop="userName">
                    <el-input type="userName"   v-model="addFaceIdFrom.userName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="人脸类型" prop="faceType">
                    <el-select v-model="addFaceIdFrom.faceType" placeholder="选择人脸类型">
                        <el-option label="白名单" value="1"></el-option>
                        <el-option label="黑名单" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="手机号码" prop="phone">
                    <el-input type="phone"   v-model="addFaceIdFrom.phone" autocomplete="off"></el-input>
                </el-form-item>

                <!-- <el-form-item label="设备编号" prop="eNumStr">
                    <el-input type="eNumStr"   v-model="addFaceIdFrom.eNumStr" autocomplete="off"></el-input>
                </el-form-item> -->

                <el-form-item label="性别" prop="sex">
                    <el-select v-model="addFaceIdFrom.sex" placeholder="选择性别">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>


            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addFaceNo('addFaceIdRef')">取 消</el-button>
                <el-button type="primary" @click="addFaceOk('addFaceIdRef')">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>
<script>
export default {
    data (){
        return {
            fileList: [],
            size: 10,
            current: 1,
            total: 1,
            showList: [],
            isAddFace: false,
            addpolicecomName: [], //小区列表
            addpvalue: '', //选中的小区
            addFaceIdFrom: { // 新增face
                img: '',
                userName: '',
                faceType: '', //人脸类型，1-白名单，2-黑名单
                phone: '',
                // eNumStr: "",
                sex: '', // 男1，女2
                proName:'',
            },
            addFaceIdRules: { // 新增填写规则
                img: [{ required: true, message: '此项不能为空，请填写', trigger: 'blur' }],
                userName: [{ required: true, message: '此项不能为空，请填写', trigger: 'blur' }],
                faceType: [{ required: true, message: '此项不能为空，请填写', trigger: 'blur' }],
                phone:[{ required: true, message: '此项不能为空，请填写', trigger: 'blur' }],
                eNumStr: [{ required: true, message: '此项不能为空，请填写', trigger: 'blur' }],
                sex: [{ required: true, message: '此项不能为空，请填写', trigger: 'blur' }]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: []
        }
    },
    mounted(){
        this.getData(this.current, this.size)
        
        // this.getStr()
        this.getComName()
    },
    methods: {
    //     handleRemove(file, fileList) {
    //   // console.log(file, fileList);
    // },
    // handlePreview(file) {
      
    // },
    // handleExceed(files, fileList) {
    //   this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    // },
    // beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${ file.name }？`);
    // },
    // handSuccess(file, fileList){
    //   // console.log('fileList', file, this.fileList)
    //   console.log('resssss',file);
    //   console.log('code',file.code);
    //   if(file.code === 1002){
    //     this.addFaceIdFrom.img = file.data[0]
    //     console.log('成功',this.addFaceIdFrom)
    //   }
    // },
       

        async getData(current, size){
            const {data: res} = await this.$http.post('/faceImg/lookAllImgPass', null, {params: {
                current: current,
                size:size
            }})
            console.log(res)
            if(res.code == 1002){
                this.showList = res.data.records
                this.total = res.data.total
            }else{
                this.$message({
                    message: res.msg,
                    type: 'danger'
                })
            }
        },
        // 获取设备编号
        getStr(){ 
            this.$http.post('http://www.hbzayun.com/ACSystem/findEquip', null, {params: {
                key:'e098214294ad13f23e16ae5ebecf970d',
                token:'1bbd886460827015e5d605ed44252251'
            }}).then(res =>{
                console.log(res.data)
            })
        },
        // 时间戳转换时间
        timeChange(time) {
            const date = new Date(time)
            const year = date.getFullYear()
            const month = date.getMonth()
            const data = date.getDate()
            const house = date.getHours()
            const min = date.getMinutes()
            const seconds = date.getSeconds()
            let str = `${year}-${month}-${data} ${house}:${min}:${seconds}`
            return str
        },
        // 显示条数变化
        handleSizeChange(newSize){
            this.size = newSize
            this.getData(this.current, this.size)
        },
        // 当前页码变化
        handleCurrentChange(newCurrent){
            this.current = newCurrent
            this.getData(this.current, this.size)
        },
        // 删除人脸
        async deleteFace(scope){
            // console.log(scope)
            let _this = this
            this.$confirm('该操作将永久删除该条信息,是否继续？').then(()=>{


                _this.$http.post('/faceImg/delFaceImg',null,{params: {
                    id: scope.id
                }}).then(res =>{
                    console.log('删除数据',res)
                    if(res.data.code == 1000){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getData(this.current, this.size)
                    }else{
                        this.$message({
                            message: '删除失败',
                            type: 'warning'
                        })
                    }
                }).catch(res =>{
                    this.$message({
                        message:'Error',
                        type: 'danger'
                    })
                })


            }).catch(()=>{
                this.$message({
                    message: '已取消',
                    type: 'info'
                })
            })
        },
        addFace(){
            this.isAddFace = true
        },
        addFaceClose(){
            this.isAddFace = false
        },
        addFaceNo(formName){
            this.isAddFace = false
            this.$refs[formName].resetFields();
        },
        // 获取小区列表
       async getComName(){
            //addpolicecomName  communityName
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
            this.addpolicecomName = dataArr
            console.log('小区列表', this.addpolicecomName )
        },
        //根据小区名查询设备编号
    async getcomEnum(callBack){
        let arr 
        const {data:res} = await this.$http.post('/faceImg/lookEnum', null, {params: {comName: this.addpvalue}})
        console.log('获取小区设备编号', res)
        if(res.code == 1002){
            callBack(res.data)
        }
        },
        // 添加人脸
        async addFaceOk(formName){ 
            let _this = this
            if(!this.addpvalue) {
                this.$message.error('请选择小区')
                return
            }
            this.addFaceIdFrom.proName = this.addpvalue
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    console.log('xxxxx',this.addFaceIdFrom)
                    // return
                    // let formData = new FormData()
                    // // this.addFaceIdFrom.eNumStr = item
                    
                    // for(let key in this.addFaceIdFrom){
                    //     formData.append(key, this.addFaceIdFrom[key]) 
                    // }    
                    const {data:res} = await this.$http.post('/faceImg/appAddFace', null, {params:this.addFaceIdFrom})
                    console.log('添加请求返回数据', res)
                    if(res.code === 1000){
                        this.getData(this.current, this.size)
                        this.isAddFace = false
                        this.$message({
                            message:'操作成功',
                            type: 'success'
                        })
                    }else{
                        this.isAddFace = false
                        this.$message({
                            message: '操作失败',
                            type: 'danger'
                        })
                    }


                    // 获取设备编号
                    // this.getcomEnum(eNumStrArr =>{
                        
                    //     console.log('获取到的设备编号列表', eNumStrArr)
                    //     let isOk = true

                    //     // 根据设备的个数进行循环请求
                    //     eNumStrArr.forEach(async item =>{
                    //         let formData = new FormData()
                    //         this.addFaceIdFrom.eNumStr = item
                            
                    //         for(let key in this.addFaceIdFrom){
                    //             formData.append(key, this.addFaceIdFrom[key]) 
                    //         }
                    //         console.log('所需要的数据', this.addFaceIdFrom)
                    //         // 请求
                    //         const { data:res } = await this.$http.post('http://www.hbzayun.com/ACSystem/openApi/addFace', formData, {params: staticobj})
                    //         console.log('请求后返回的数据', res)

                    //         if(res.code == 200){
                    //             if(isOk){
                    //                 isOk = false
                    //                 this.$message.success('添加成功')
                    //             }
                    //         }else{
                    //             this.$message.error('人脸添加失败, 失败设备编号：' + item)
                    //         }

                            
                    //     })
                    //      // 不好判断几个请求成功,直接刷新页面
                    //     console.log('1')
                    //     this.getData(this.current, this.size)
                    //     console.log('2')
                    //     this.isAddFace = false
                           

                    // })
                    
                    

                    // console.log('添加人脸返回数据',res)
                    // if(res.code == 200){
                    //     _this.$message.success(res.extend.data)
                    //     _this.getData()
                    //     _this.isAddFace = false
                    // }else{
                    //     _this.$message.error(res.extend.data)
                    //     _this.isAddFace = false
                    // }

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
        inpChange(e){
            let _this = this
            let fileList = document.querySelector('#imgLocal').files
            let file = fileList[0]
            console.log('file', file)
            this.addFaceIdFrom.img = file

            
            // const fileReader = new FileReader()
            // fileReader.readAsDataURL(file) 
            // fileReader.addEventListener('load', function() {
            //     // 读取完成
            //     let res = fileReader.result // res是base64格式的图片
            //     _this.addFaceIdFrom.faceImg = res
                
            //     console.log('base64格式',res)
            // })
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
      console.log('res',file, fileList);
    //   this.addFaceIdFrom.faceImg = fileList.raw
      if(file.code == 1002){
        this.addFaceIdFrom.img = file.data[0]
        console.log(this.addFaceIdFrom)
      }
    }
    }
}
</script>
<style lang="less" scoped>
    html,
    body{
        width: 100%;
        height: 100%;
        .faceSet_box{
            width: 100%;
            height: 100%;
            overflow: scroll;
            .faceSet{
                width: 100%;
                height: 100%;
                
                .paging{
                    display: flex;
                    justify-content: center;
                    margin: 10px 0;
                }

            }
        }
    }
</style>