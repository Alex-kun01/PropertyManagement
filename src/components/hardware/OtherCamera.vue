<template>
    <div class="garbage_box">
        <!-- 其他摄像头 -->
        <div class="garbage">
            <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>硬件管理</el-breadcrumb-item>
                <el-breadcrumb-item>其他摄像头</el-breadcrumb-item>
            </el-breadcrumb>





        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {

        }
    }
}
</script>
<style lang="less" scoped>
    html,
    body{
        width: 100%;
        height: 100%;
        .garbage_box{
            width: 100%;
            height: 100%;
            overflow: scroll;
            .garbage{
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