<template>
    <div class="openingrecoed_box">
        <!-- 开门记录 -->
        <div class="openingrecoed">
            
            <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>门禁管理</el-breadcrumb-item>
                <el-breadcrumb-item>开门记录</el-breadcrumb-item>
            </el-breadcrumb>

            <el-table
            :data="showList"
            border
            style="width: 100%"
            >
                <el-table-column type="index" label="#"  align="center" width="40px"></el-table-column>
                <el-table-column prop="companyName"  align="center" label="公司名称" width="160px"></el-table-column>
                <el-table-column prop="communityName"  align="center" label="小区名称" width="160px"></el-table-column>
                <el-table-column prop="communityValue"  align="center" label="小区" width="100px"></el-table-column>
                <el-table-column prop="recordId"  align="center" label="记录ID" width="80px"></el-table-column>
                <el-table-column prop="pwId"  align="center" label="开门方式" width="80px">
                    <!-- 5-人脸开门，8一键开门，9-密码开门 -->
                    <template slot-scope="scope">
                        <span v-if='scope.row.pwId == 5'>人脸开门</span>
                        <span v-if='scope.row.pwId == 8'>一键开门</span>
                        <span v-if='scope.row.pwId == 9'>密码开门</span>
                    </template>
                </el-table-column>
                <el-table-column prop="userId"  align="center" label="用户ID" width="80px"></el-table-column>
                <el-table-column prop="eNum"  align="center" label="设备编号" width="115px"></el-table-column>
                <el-table-column prop="eId"   align="center" label="设备id" width="65px"></el-table-column>
                <el-table-column prop="createTime" align="center"  label="记录时间" width="150px">
                    <!-- timeChange -->
                    <template slot-scope="scope">
                       {{timeChange(scope.row.createTime)}}
                    </template>
                </el-table-column>
                <el-table-column prop="oName"  align="center" label="用户名称" width="100px"></el-table-column>
                <el-table-column prop="oPhone"  align="center" label="手机号" width="120px"></el-table-column>
                <el-table-column prop="note"  align="center" label="备注" width="100px"></el-table-column>
                <el-table-column prop="picUrl"  align="center" label="图片" width="200px">
                    <template slot-scope="scope">
                        <img style="width: 100%; height: 100%; min-height:200px;" :src="'http://www.hbzayun.com/ACSystem' + scope.row.picUrl">
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
    </div>
</template>
<script>
export default {
    data (){
        return {
            size: 10,
            current: 1,
            total: 1,
            showList: []
        }
    },
    mounted(){
        this.getData(this.current, this.size)
    },
    methods: {
        async getData(current, size){
            const {data: res} = await this.$http.post('http://www.hbzayun.com/ACSystem/getRecords', null, {params: {
                key:'e098214294ad13f23e16ae5ebecf970d',
                token:'1bbd886460827015e5d605ed44252251',
                pn: current, // 当前页
                pc: size,  // 每页行数
            }})
            console.log(res)
            if(res.code == 200){
                this.showList = res.extend.pageInfo.list
                this.total = res.extend.pageInfo.total
            }
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
        // 时间转换
        timeChange(time){
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
    }
}
</script>
<style lang="less" scoped>
    html,
    body{
        width: 100%;
        height: 100%;
        .openingrecoed_box{
            width: 100%;
            height: 100%;
            overflow: scroll;
            .openingrecoed{
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