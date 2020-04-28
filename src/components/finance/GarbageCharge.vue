<template>
    <div class="garbage_box">
        <!-- 垃圾管理费 -->
        <div class="garbage">
            垃圾管理费
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