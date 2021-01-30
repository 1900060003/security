<template>
  <el-container class="layout" :class="size">
    <el-aside class="aside" :width="isCollapse? '64px' : '240px'">
      <navigation :isCollapse="isCollapse" @select="selectNav"></navigation>
    </el-aside>
    <el-container class="container">
      <div class="navigation-collapse" :class="{collapse : isCollapse}" @click="isCollapse = !isCollapse">
        <i :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
      </div>
      <el-main class="main">
        <el-tabs v-model="activeTab" type="card" @tab-remove="removeTab">
          <el-tab-pane v-for="item in tabs" :closable="item.name !== '/home/'" :key="item.name" :label="item.title" :name="item.name">
          </el-tab-pane>
        </el-tabs>
        <keep-alive>
          <router-view ref="routerView" class="main-view" @openDrawer="openDrawer" @openDialog="openDialog"></router-view>
        </keep-alive>
        <el-drawer ref="drawer" :visible.sync="drawer" :show-close="false" direction="rtl" :modal-append-to-body="false" :withHeader="false" destroy-on-close :close-on-press-escape="false" :wrapperClosable="false">
          <component :is="componentName" @closeDrawer="closeDrawer" @refresh="refresh" :drawerParams="drawerParams"></component>
        </el-drawer>
        <el-dialog append-to-body ref="dialog" :visible.sync="dialog" :width="dialogWidth" :show-close="false" :destroy-on-close="true" center :close-on-click-modal="false">
          <component v-if="dialog" ref="dialongContent" :is="dialogComponentName"></component>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleDialogClose">{{$t('action.cancel')}}</el-button>
            <el-button type="primary" @click="dialogConfirm">{{$t('action.confirm')}}</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Navigation from '@/components/Navigation'
import UserForm from '@/components/form/User'
import Customize from '@/components/customize'
export default {
  name: 'Layout',
  data() {
    return {
      isCollapse: true,
      tabs: ['/system/user/', '/home/', '/basic/organization/'].includes(this.$route.path) ? [{
        name: '/home/',
        title: this.routeTitle('/home/')
      }, {
        name: '/system/user/',
        title: this.routeTitle('/system/user/')
      }, {
        name: '/basic/organization/',
        title: this.routeTitle('/basic/organization/')
      }] : [{
        name: '/home/',
        title: this.routeTitle('/home/')
      }, {
        name: '/system/user/',
        title: this.routeTitle('/system/user/')
      }, {
        name: '/basic/organization/',
        title: this.routeTitle('/basic/organization/')
      }, {
        name: this.$route.path,
        title: this.routeTitle(this.$route.path)
      }],
      activeTab: this.$route.path,
      drawer: false,
      drawerParams: {},
      componentName: '',
      dialog: false,
      dialogWidth: '50%',
      dialogComponentName: ''
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
  watch: {
    activeTab() {
      if (this.$route.path !== this.activeTab) {
        this.$router.push(this.activeTab)
      }
    }
  },
  methods: {
    dialogConfirm() {
      this.$refs.dialongContent.save()
      this.$refs.routerView.refresh()
      this.handleDialogClose()
    },
    openDialog(componentName, dialogWidth) {
      this.dialogComponentName = componentName
      this.dialogWidth = dialogWidth
      this.dialog = true
    },
    handleDialogClose() {
      this.dialog = false
    },
    openDrawer(componentName, drawerParams) {
      this.componentName = componentName
      this.drawerParams = drawerParams
      this.drawer = true
    },
    closeDrawer() {
      this.drawer = false
      this.$refs.drawer.closeDrawer()
    },
    refresh() {
      this.closeDrawer()
      this.$refs.routerView.refresh()
    },
    routeTitle(index) {
      var path = index.split('/').filter(e => e !== '')
      return this.$t(`menu.${path[0]}.${path[1] || 'main'}`)
    },
    selectNav(index) {
      if (this.tabs.filter(e => e.name === index).length === 0) {
        this.tabs.push({
          name: index,
          title: this.routeTitle(index)
        })
        this.activeTab = index
      } else {
        this.activeTab = index
      }
    },
    removeTab(targetName) {
      if (this.activeTab === targetName) {
        this.tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            var nextTab = this.tabs[index + 1] || this.tabs[index - 1]
            if (nextTab) {
              this.activeTab = nextTab.name
            }
          }
        })
      }
      this.tabs = this.tabs.filter(tab => tab.name !== targetName)
    }
  },
  components: {
    Navigation,
    UserForm,
    Customize
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
      line-height: 20px;
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
      overflow: hidden;

      ::v-deep {
        .el-tabs__header {
          font-size: .4rem;
        }
      }

      .main-view {
        height: calc(100vh - 80px);
        overflow: hidden;
      }

    }
  }
}

</style>
