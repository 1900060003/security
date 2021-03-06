<template>
  <el-menu class="navigation" :default-active="$route.path" router unique-opened :collapse="isCollapse" :collapse-transition="false" @select="$emit('select', $event)">
    <div class="title">
      <span v-if="!isCollapse">{{$t("servername")}}</span>
      <i v-else class="el-icon-apple logo"></i>
    </div>
    <el-menu-item index="/home/" route="/home/">
      <i :class="$enum.getDescByValue('MENU_ICON', 'home')"></i>
      <span slot="title">{{ $t("menu.home.main") }}</span>
    </el-menu-item>
    <template v-for="(menu, index) of $store.getters.menus">
      <el-menu-item v-if="!menu.children" :index="'/' + menu.path + '/'" :key="'menu-' + index" :route="'/' + menu.path + '/'">
        <i :class="$enum.getDescByValue('MENU_ICON', menu.path)"></i>
        <span slot="title">{{ $t("menu." + menu.path + ".main") }}</span>
      </el-menu-item>
      <el-submenu v-else :index="'/' + menu.path + '/'" :key="'menu-' + index">
        <template slot="title">
          <i :class="$enum.getDescByValue('MENU_ICON', menu.path)"></i>
          <span>{{ $t("menu." + menu.path + ".main") }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(submenu, subIndex) in menu.children" :index="'/' + menu.path + '/' + submenu.path + '/'" :key="'menu-' + index + '-' + subIndex" :route="'/' + menu.path + '/' + submenu.path + '/'">
            <i :class="$enum.getDescByValue('MENU_ICON', submenu.path)"></i>
            <span>{{ $t("menu." + menu.path + "." + submenu.path) }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </template>
    <div style="flex: 1;"></div>
    <el-tooltip class="item" effect="dark" :content="$t('menu.logout')" placement="right">
      <i :class="$enum.getDescByValue('MENU_ICON', 'logout')" style="font-size: 30px; color: #ffffff; text-align: center; margin-bottom: 20px; cursor: pointer;" @click="logout"></i>
    </el-tooltip>
  </el-menu>
</template>
<script>
export default {
  name: 'Navigation',
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    logout() {
      this.$confirm(this.$t('action.logout'), this.$t('action.warning'), {
        confirmButtonText: this.$t('action.confirm'),
        cancelButtonText: this.$t('action.cancel'),
        showClose: false,
        closeOnClickModal: false,
        iconClass: 'el-icon-warning-outline',
        confirmButtonClass: 'el-button--mini',
        cancelButtonClass: 'el-button--mini el-button--info'
      }).then(() => {
        this.$store.dispatch('clearUser', {}).then(res => {
          location.reload()
        })
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.navigation {
  background: transparent;
  border-right: none;
  display: flex;
  flex-direction: column;
  height: 100%;

  &.el-menu--collapse {
    .el-submenu {
      &.is-active {
        &::after {
          content: '';
          border-style: solid;
          border-width: 8px 6px 8px 0;
          border-color: transparent #ffffff transparent transparent;
          position: absolute;
          right: 0;
          top: 20px;
        }
      }
    }
  }

  .title {
    font-size: 0.4rem;
    color: #ffffff;
    margin: 25px 20px;
    text-align: center;
    overflow: hidden;
    position: relative;
    height: 24px;
    line-height: 24px;

    i {
      background: linear-gradient(to right, #67C23A, #E6A23C);
      background-clip: text;
      color: transparent;

      &:hover {
        background: linear-gradient(to right, #E6A23C, #67C23A);
        background-clip: text;
        color: transparent;
      }
    }
  }

  .el-submenu {

    &.is-active,
    &.is-opened {

      ::v-deep {
        .el-submenu__title {
          color: #ffffff;

          i {
            color: #ffffff;
          }
        }
      }
    }
  }

  .el-menu-item {
    color: #a9b7d0;
    position: relative;

    &:focus,
    &:hover {
      background: transparent;
    }

    &.is-active {
      color: #409EFF;

      &::after {
        content: '';
        border-style: solid;
        border-width: 8px 6px 8px 0;
        border-color: transparent #ffffff transparent transparent;
        position: absolute;
        right: 0;
        top: 20px;
      }
    }

  }

  ::v-deep {
    .el-submenu__title {
      color: #a9b7d0;

      i {
        &.el-submenu__icon-arrow {
          color: #ffffff;
        }
      }

      &:hover {
        background: transparent;
      }
    }

    .el-menu {
      background: transparent;
    }
  }
}

</style>
