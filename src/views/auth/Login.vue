<template>
    <div style="background: orange;height: 100%">
        <a-card style="width: 500px;margin:0 auto;position:relative;top:100px" title="请输入用户名和密码">
            <a-form-model
                    ref="ruleForm"
                    :model="form"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
            >
                <a-form-model-item label="用户名" prop="accountName">
                    <a-input allowClear placeholder="请输入用户名" v-model="form.accountName"/>
                </a-form-model-item>
                <a-form-model-item label="密码" prop="passWord">
                    <a-input allowClear placeholder="请输入密码" v-model="form.passWord"/>
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" @click="onSubmit">
                        登录
                    </a-button>
                    <a-button style="margin-left: 15px;" @click="$refs['ruleForm'].resetFields()">
                        重置
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </a-card>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data() {
            return {
                labelCol: {span: 4},
                wrapperCol: {span: 14},
                form: {
                    accountName: 'admin',
                    passWord: '123'
                },
                rules: {
                    accountName: [{required: true, trigger: 'blur', message: '请输入用户名'}],
                    passWord: [{required: true, trigger: 'blur', message: '请输入密码'}],
                }

            }
        },
        methods: {
            onSubmit() {
                const {$refs, $router, $message} = this
                $refs.ruleForm.validate(valid => {
                    if (valid) {
                        this.$axios({
                            url: '/api/login',
                            method: 'post',
                            data: this.form
                        }).then(({stage,data,message}) => {
                            stage === 200 && sessionStorage.setItem('userData', JSON.stringify(data))
                            $message[stage === 200 ? 'success' : 'info'](message)
                            stage === 200 && $router.replace({
                                path: '/'
                            })
                        }).catch(err => this.$message.error(err))
                    } else {
                        $message.info('请填写用户名或密码!')
                    }
                });
            }
        }
    };
</script>
<style scoped>
</style>
