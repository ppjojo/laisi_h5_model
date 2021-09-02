<template>
    <div>
        <el-form :model="form" label-width="150px" :rules="rules" ref="form" >
            <el-form-item label="旧密码">
                <el-input v-model="form.oldPassword" ></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="再次输入新密码">
                <el-input v-model="form.newPassword2" type="password"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center;">
            <el-button size="mini" @click="dialogVisibleChange" v-if="md5Pwd!='e10adc3949ba59abbe56e057f20f883e'||username=='admin'">取 消</el-button>
            <el-button type="primary" size="mini" @click="submitForm('form')">确认修改</el-button>
        </div> 
    </div>
</template>

<script>
    import { changePwd } from '@/api/user'
    import md5 from 'js-md5';
    import { getUInfo,setUInfo } from '@/utils/auth'
    export default {
        name: 'changePwd',
        props: {

        },
        data() {
            return {
                form: {
                    id:JSON.parse(getUInfo()).id,
                    oldPassword: '',
                    password: "",
                    newPassword2: ""
                },
                md5Pwd:"",
                username:JSON.parse(getUInfo()).username,

            }
        },
        created(){
            this.md5Pwd=JSON.parse(getUInfo()).password
            //e10adc3949ba59abbe56e057f20f883e  为初始123456
        },
        methods: {
            dialogVisibleChange(){
                this.$emit('dialogVisibleChange');
            },
            submitForm() {
                if (this.form.password != this.form.newPassword2) {
                    this.$notify({
                        type: 'error',
                        message: '两次密码输入不一致！'
                    });
                    return
                }
                var re = /^(?=.*[a-z])(?=.*\d)[^]{8,}$/
                var result = re.test(this.form.password);
                if (!result) {
                    this.$notify({
                        type: 'error',
                        message: '密码至少包含小写字母、数字，且不少于8位！'
                    });
                    return
                }

                this.form.password = md5(this.form.password.toString())

                changePwd(this.form).then(res => {

                    var user=JSON.parse(getUInfo())
                    user.password=this.form.password
                    setUInfo(JSON.stringify(user))
                    this.dialogVisible = false
                    this.form = {}
                    this.$notify({
                        type: 'success',
                        message: '密码修改成功请重新登录！'
                    });
                    this.$emit('dialogVisibleChange');
                })
            }
        }
    }
</script>