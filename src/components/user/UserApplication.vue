<template>
    <div class="userApplication_box">
        <!-- 用户申请 -->
        <div class="userApplication">

            <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户申请</el-breadcrumb-item>
            </el-breadcrumb>
            <template>
                <el-table
                :data="showList"
                border
                style="width: 100%">


                        <el-table-column type="index" label="#" width="60"></el-table-column>
                        <el-table-column prop="applyIdentity" label="应用身份" width="80"></el-table-column>
                        <el-table-column prop="applyUserId" label="应用ID" width="70"></el-table-column>
                        <el-table-column prop="idcardImg" label="身份证照片" width="200">
                            <template slot-scope="scope">
                                <img style="width: 100%; height:100%" :src="scope.row.idcardImg" alt="用户头像">
                            </template>
                        </el-table-column>
                        <el-table-column prop="applyIdCard" label="应用ID号" width="130"></el-table-column>
                        <el-table-column prop="houseId" label="房屋ID" width="70"></el-table-column>
                        <el-table-column prop="applyName" label="应用名称" width="80"></el-table-column>
                        <el-table-column prop="checkId" label="checkId" width="60"></el-table-column>
                        <el-table-column prop="state" label="状态" width="80">
                            <template slot-scope="scope">
                                <el-switch
                                    v-model="scope.row.state"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    :active-value="1"
                                    :inactive-value="0"
                                    >
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>

                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="editUserApp(scope.row)" size="mini"><i class="el-icon-edit"></i>处理</el-button>
                                <el-button type="danger" @click="deleteUserApp(scope.row)" size="mini"><i class="el-icon-delete"></i>删除</el-button>
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
                :total="total">
                </el-pagination>
            </div>


        </div>
    </div>
</template>
<script>
import publicFun from '../../store/public.js'
export default {
    data(){
        return {
            size: 10,
            current: 1,
            total: 10,
            userApplictionList: [],
            showList: [
                {}
            ],

        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        async getData(){
          const {data: res} = await this.$http.post('/roleApply/checkApply', { })
          console.log(res.data)
          if(res.data){
              this.userApplictionList = res.data
              this.total = res.data.length
            this.showList = publicFun.filterList(this.current, this.size, this.userApplictionList)
          }else{
              this.$message({
                  message: '数据请求失败',
                  type: 'danger'
              })
          }
        },
        // 编辑按钮
        editUserApp(scope){

        },
        // 删除按钮
        deleteUserApp(scope){

        },
        // 一页显示条数变化
        handleSizeChange(newSize){
            this.size = newSize
            this.showList = publicFun.filterList(this.current, this.size, this.userApplictionList)        },
        // 当前页码变化
        handleCurrentChange(newCurrent){
            this.current = newCurrent
            this.showList = publicFun.filterList(this.current, this.size, this.userApplictionList)        }
    }
}
</script>
<style lang="less" scoped>
    html,
    body{
        width: 100%;
        height: 100%;
        .userApplication_box{
            width: 100%;
            height: 100%;
            overflow: scroll;
            .userApplication{
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