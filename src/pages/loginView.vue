<template>
    <div style="width: 100%;height: 100%;">
        <div class="login-box">
            <el-tabs v-model="activeName" stretch class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="登录" name="first">
                    <el-form :model="loginData" :rules="rules" status-icon ref="loginRef" label-width="100px"
                        style="margin-top: 25px;">

                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="loginData.username"></el-input>
                        </el-form-item>

                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="loginData.password" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-button type="primary" @click="submitLoginForm('loginData')">提交</el-button>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="second">
                    <el-form :model="registerData" :rules="rules" status-icon ref="registerRef" label-width="100px"
                        style="margin-top: 25px;">

                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="registerData.username"></el-input>
                        </el-form-item>

                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="registerData.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="passwordConfirm">
                            <el-input type="password" v-model="registerData.passwordConfirm" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-button type="primary" @click="submitRegisterForm('registerData')">提交</el-button>
                    </el-form>
                </el-tab-pane>
            </el-tabs>

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
        const activeName = ref('first')
        let loginData = reactive({
            username: "",
            password: ""
        })
        let registerData = reactive({
            username: "",
            password: "",
            passwordConfirm: "",
        })
        const loginRef = ref()
        const registerRef = ref()
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
        var validateCheckPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== registerData.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        //表单校验的规则对象
        const rules = {
            //用户名字
            username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
            //用户的密码
            password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
            passwordConfirm: [{ required: true, trigger: 'blur', validator: validateCheckPassword }],
        }

        const router = useRouter()
        const store = useStore()
        const submitLoginForm = async () => {
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
        const submitRegisterForm = async () => {
            //console.log(loginRef.value)
            registerRef.value.validate(valid => {
                if (valid) {
                    // 收集用户名和密码，发送给后端
                    axios.post("/register/validate", registerData
                    ).then(res => {
                        if (res.data.code === 3) {
                            ElMessage({
                                message: '注册成功',
                                type: 'success',
                            });
                        } else {
                            if (res.data.code === 2) {
                                ElMessage.error('用户已存在!');
                            }
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
        return { activeName, loginData, registerData, rules, registerRef, submitLoginForm, submitRegisterForm, validatorUsername, validatorPassword, loginRef }

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
    height: 350px;

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