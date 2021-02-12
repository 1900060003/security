<template>
  <el-container class="layout" :class="size">
    <el-aside class="aside" :width="isCollapse? '64px' : '200px'">
      <navigation :isCollapse="isCollapse"></navigation>
    </el-aside>
    <el-container class="container">
      <div class="navigation-collapse" :class="{collapse : isCollapse}" @click="isCollapse = !isCollapse">
        <i :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
      </div>
      <el-main class="main">
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Navigation from '@/components/Navigation'
export default {
  name: 'Layout',
  data() {
    return {
      isCollapse: true
    }
  },
  computed: {
    size() {
      var size = ''
      if (this.width < 768) {
        size = 'mini'
      } else if (this.width < 1200) {
        size = 'small'
      } else {
        size = 'medium'
      }
      return size
    }
  },
  components: {
    Navigation
  }
}

</script>
<style lang="scss" scoped>
.layout {
  background: #292f4c;
  width: 100vw;
  height: 100vh;
  position: relative;

  .container {
    position: relative;

    .navigation-collapse {
      position: absolute;
      border: 1px solid #4B4E69;
      background: #292f4c;
      color: #ffffff;
      font-size: 16px;
      border-radius: 20px;
      line-height: 22px;
      width: 22px;
      height: 22px;
      right: calc(100% - 11px);
      top: 25px;
      cursor: pointer;
      transition: .25s;
      text-align: center;

      &:hover {
        width: 23px;
        text-align: left;
        background: #409EFF;
        border-color: transparent;
        padding-left: 3px;
      }

      &.collapse {
        left: -11px;

        &:hover {
          text-align: right;
          padding-right: 3px;
        }
      }
    }

    .main {
      background: #ffffff;
      border-top-left-radius: 20px;
    }
  }
}

</style>
