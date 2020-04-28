<template>
    <div class="parking_box">
        <!-- 停车费管理 -->
        <div class="parking">
            停车费管理
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
        .parking_box{
            width: 100%;
            height: 100%;
            overflow: scroll;
            .parking{
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