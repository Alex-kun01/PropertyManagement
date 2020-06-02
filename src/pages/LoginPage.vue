<template>
    <div class="login_page">
        <!-- 登陆框 -->
        <div class="login_box">
            <!-- 头像 -->
            <div class="head_pic">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585303728002&di=49a3ed34b04ab422aed08044a6ec2877&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ffb9431a4c99691e54952d85ed034faf9a6b7e4f22d45-xy5FHF_fw658">
            </div>
            <!-- 用户登陆信息 -->
            <div class="ipt_box">
                <el-input v-model="userName" placeholder="请输入用户名"></el-input>
                <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
                <el-button type="primary" @click="login">登陆</el-button>
            </div>
            <!-- <div class="regsign"><a href="#">注册</a></div> -->
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            userName: '',
            password: '',
            Authority: [], //权限
        }
    },
    created(){
        document.onkeydown = function(e){
            
            if(e.key == 'Enter'){
                // this.login()
            }
        }
    },
    mounted(){
        this.userName = window.localStorage.getItem('userName')
        this.password = window.localStorage.getItem('password')
    },
    methods: {
        login(){
            if(this.userName && this.password){
                this.$http.post('/sysUser/sysLogin', null, { params: {userName: this.userName, password: this.password} }).then(res => {
                console.log(res,res.data.code, 'ppp')
                if(res.data.code == 1003 || res.data.code == 1001) {
                    let arr = res.data.data.sysMenus || []
                    let newArr = []
                    arr.forEach(item =>{
                        newArr.push(item.menuName)
                    })
                    this.Authority = newArr
                    window.localStorage.setItem('authority',newArr)
                     window.localStorage.setItem('role',res.data.data.role)

                    console.log('列表返回的数据',this.Authority)
                    this.$message({
                        message: '登陆成功',
                        type: 'success'
                    })
                    window.localStorage.setItem('userName', this.userName)
                    window.localStorage.setItem('password', this.password)
                    this.$router.push('/index/firstshow')
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    })
                }
            }).catch(res => {
                this.$message({
                    message: 'Error',
                    type: 'warning'
                })
            })
            }else{
                this.$message({
                    message: '请输入用户名/密码',
                    type: 'danger'
                })
            }
        },
        change(e){
            console.log(e)
        }
    }
}
</script>
<style lang="less" scoped>
    .login_page{
        width: 100%;
        .login_box{
            width: 400px;
            min-width: 400px;
            height: 400px;
            border: 1px solid #dddd;
            box-shadow: 0 0 7px 1px #999;
            border-radius: 10px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 0 50px;
            box-sizing: border-box;
            .head_pic{
                width: 150px;
                height: 150px;
                border-radius: 50%;
                box-shadow: 0 0 7px 1px #888;
                position: absolute;
                top: -60px;
                left: calc(50% - 75px);
                img{
                    width: 150px;
                    height: 15  0px;
                    border-radius: 50%;
                }
            }
            .ipt_box{
                height: 200px;
                width: 300px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                position: absolute;
                top: 130px;
                text-align: center;

            }
            .regsign{
                position: absolute;
                bottom: 40px;
                a{
                    color: #00f;
                    text-decoration: none;
                    font-size: 14px;
                }
            }
        }
    }
</style>