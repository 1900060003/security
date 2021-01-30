<template>
  <div class="form-box">
    <div class="title">{{this.drawerParams ? $t('user.edit') : $t('user.create')}}</div>
    <div class="form-container">
      <el-form :model="form" :rules="rules" ref="form" label-width="2rem">
        <el-form-item :label="$t('user.account')" prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.name')" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.email')" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.password')" prop="password">
          <el-input v-model="form.password" type="password" autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.repassword')" prop="repassword">
          <el-input v-model="form.repassword" type="password" autocomplete="new-password"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-box">
      <el-button type="info" @click="closeDrawer">{{$t('action.cancel')}}</el-button>
      <el-button type="primary" @click="confirm">{{$t('action.confirm')}}</el-button>
    </div>
  </div>
</template>
<script>
import { validate } from '@/utils/validate'
export default {
  name: 'User',
  data() {
    return {
      form: {
        account: '',
        name: '',
        email: '',
        password: '',
        repassword: ''
      },
      rules: {
        account: [{
          name: this.$t('user.account'),
          required: true,
          trigger: ['blur', 'change'],
          min: 5,
          max: 20,
          type: 'username',
          validator: validate
        }],
        name: [{
          name: this.$t('user.name'),
          required: true,
          trigger: ['blur', 'change'],
          min: 2,
          max: 20,
          validator: validate
        }],
        email: [{
          name: this.$t('user.email'),
          required: true,
          trigger: ['blur', 'change'],
          type: 'email',
          validator: validate
        }],
        password: [{
          name: this.$t('user.password'),
          required: true,
          trigger: ['blur', 'change'],
          min: 6,
          max: 20,
          validator: validate
        }],
        repassword: [{
          name: this.$t('user.repassword'),
          required: true,
          trigger: ['blur', 'change'],
          type: 'passwordConfirm',
          getCheckValue: () => {
            return this.form.password
          },
          validator: validate
        }]
      }
    }
  },
  props: {
    drawerParams: {
      type: Object,
      default: null
    }
  },
  methods: {
    closeDrawer() {
      this.$emit('closeDrawer')
    },
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('refresh')
        }
      })
    }
  },
  mounted() {
    if (this.drawerParams) {
      this.form = Object.assign({}, this.drawerParams)
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
