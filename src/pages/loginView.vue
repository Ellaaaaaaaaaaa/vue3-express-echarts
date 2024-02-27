<template>
    <div style="width: 100%;height: 100%;">
        <div class="login-box">
            <div style="margin-bottom: 30px;">登录</div>
            <el-form :model="loginData" :rules="rules" status-icon ref="loginRef" label-width="100px">

                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginData.username"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginData.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-button type="primary" @click="submitForm('loginData')">提交</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import { ElMessage } from 'element-plus'
export default {
    setup() {

        let loginData = reactive({
            username: "",
            password: ""
        })
        const loginRef = ref()
        const validatorUsername = (rule, value, callBack) => {
            //用户名字|昵称,长度至少五位
            if (value === '') {
                callBack(new Error("请输入用户名"));
            }
            else if (value.trim().length >= 4) {
                callBack()
            } else {
                callBack(new Error('用户名至少四位'))
            }
        }
        const validatorPassword = (rule, value, callBack) => {
            if (value === '') {
                callBack(new Error("请输入密码"));
            } else if (value.trim().length >= 6) {
                callBack()
            } else {
                callBack(new Error('用户密码至少六位'))
            }
        }
        //表单校验的规则对象
        const rules = {
            //用户名字
            username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
            //用户的密码
            password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
        }

        const router = useRouter()
        const store = useStore()
        const submitForm = async () => {
            //console.log(loginRef.value)
            loginRef.value.validate(valid => {
                if (valid) {
                    // 收集用户名和密码，发送给后端
                    axios.post("/login/validate", loginData
                    ).then(res => {
                        if (res.data.code === 1) {
                            ElMessage({
                                message: '登陆成功',
                                type: 'success',
                            });
                            store.commit("NAMEUPDATE", loginData.username)
                            router.push({ name: 'homeView' })
                        } else {
                            ElMessage.error('用户名或密码错误!');
                        }
                    }).catch(error => {
                        console.log(error);
                    })
                } else {
                    ElMessage.error('用户名或密码格式错误')
                    return false;

                }
            })
        }
        return { loginData, rules, submitForm, validatorUsername, validatorPassword, loginRef }

    }
}
</script>

<style lang="less" scoped>
.login-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 400px;
    height: 250px;

    background: #fff;
    text-align: center;
    border: #E9EEF3 2px solid;
    padding: 40px 12px 0px 12px;
}

.el-input {
    width: 250px;
    margin-bottom: 16px;
}
</style>