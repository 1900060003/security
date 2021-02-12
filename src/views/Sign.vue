<template>
  <div class="sign">
    <el-form ref="sign-form" class="sign-form" :class="!animate || 'animated shake'" :model="signForm" :rules="rules" :disabled="waiting">
      <div class="title">{{$t('servername')}}</div>
      <el-form-item prop="account">
        <el-input ref="enter-focus-1" autofocus v-model="signForm.account" size="small" :placeholder="$t('keyword.enter') + $t('login.account')"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input ref="enter-focus-2" v-model="signForm.password" size="small" :placeholder="$t('keyword.enter') + $t('login.password')" type="password" @change="sign"></el-input>
      </el-form-item>
      <el-button ref="enter-commit" v-show="signForm.account != '' && signForm.password != ''" class="sign-btn" @click="sign" icon="el-icon-right"></el-button>
    </el-form>
  </div>
</template>
<script>
import { validate } from '@/utils/validate'
export default {
  name: 'sign',
  data() {
    return {
      signForm: {
        account: '',
        password: ''
      },
      animate: false,
      waiting: false,
      rules: {
        account: [{
          name: this.$t('login.account'),
          required: true,
          trigger: ['blur', 'change'],
          min: 4,
          max: 20,
          validator: validate
        }],
        password: [{
          name: this.$t('login.password'),
          required: true,
          trigger: ['blur', 'change'],
          min: 6,
          max: 20,
          validator: validate
        }]
      }
    }
  },
  methods: {
    sign() {
      this.$refs['sign-form'].validate(valid => {
        if (valid) {
          this.waiting = true
          setTimeout(e => {
            if (this.signForm.account === 'admin' && this.signForm.password === '123123') {
              this.waiting = false
              this.$cookies.set('auth_token', Math.random().toString().substring(2, 12))
              this.$router.push({ path: '/' })
            } else {
              this.animate = true
              this.waiting = false
              setTimeout(e => {
                this.animate = false
                this.waiting = false
                this.$refs['enter-focus-1'].focus()
                this.$refs['enter-focus-1'].select()
              }, 1000)
            }
          }, 100)
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
* {
  user-select: none;
}

.sign {
  background: url('~@/assets/images/Yosemite.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;

  .sign-form {
    text-align: center;
    width: 10rem;
    position: absolute;
    left: calc(50% - 5rem);
    top: calc(50% - 3rem);
    line-height: .6rem;

    .title {
      font-size: .52rem;
      line-height: 2rem;
      color: white;
      text-shadow: 0 0 0.4rem rgba(0, 0, 0, 1);
    }

    .el-form-item {
      margin: .5rem 2rem;

      &.is-error .el-input {
        ::v-deep {
          .el-input__inner {
            border-color: #F56C6C;
          }
        }
      }

      .el-input {
        ::v-deep {
          .el-input__inner {
            background-color: rgba(200, 200, 200, .5);
            box-shadow: 0 0 .6rem rgba(0, 0, 0, .6);
            border-color: transparent;
            font-weight: bold;
            font-size: .28rem;
            color: white;

            &::placeholder {
              color: white;
              font-size: .24rem;
            }
          }
        }
      }
    }

    .sign-btn {
      background: rgba(255, 255, 255, .5);
      color: rgba(0, 0, 0, .5);
      margin-top: .6rem;
      border-radius: 50%;
      font-size: .5rem;
      padding: .1rem;
      box-shadow: 0 0 .8rem rgba(0, 0, 0, .8);
      cursor: pointer;
      border: none;

      &:active {
        background: white;
        color: rgba(0, 0, 0, .5);
      }
    }
  }
}

</style>
