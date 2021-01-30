<template>
  <div class="home">
    <div class="home-tool">
      <el-tooltip class="item" effect="dark" :content="$t('action.customize')" placement="bottom">
        <el-button icon="el-icon-copy-document" size="mini" type="success" circle @click="customize"></el-button>
      </el-tooltip>
    </div>
    <div class="home-view">
      <div v-if="viewsLayout.length === 0" class="home-empty">{{$t('home.empty')}}</div>
      <grid-layout v-else ref="views-layout" class="views-layout" :layout.sync="viewsLayout" :col-num="colNum" :row-height="rowHeight" :margin="colMargin" :verticalCompact="false">
        <grid-item v-for="item in viewsLayout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :minW="item.minW" :minH="item.minH" :maxW="item.maxW" :maxH="item.maxH" :key="item.i" :isDraggable="false" :isResizable="false">
          <component :ref="'widget-item-' + item.i" :is="item.componentName" :attributes="item.attributes"></component>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>
<script>
import widget from '@/components/customize/widget'
import merge from '@/utils/merge'
import VueGridLayout from 'vue-grid-layout'
export default {
  name: 'Home',
  data() {
    return {
      rowHeight: 40,
      colNum: 12,
      colMargin: [0, 0],
      defaultGridW: 2,
      defaultGridH: 1,
      maxRows: 20,
      viewsLayout: JSON.parse(JSON.stringify(this.$store.getters.viewsLayout))
    }
  },
  components: merge({
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  }, widget),
  methods: {
    customize() {
      this.$emit('openDialog', 'Customize', '80%')
    },
    refresh() {
      this.viewsLayout = JSON.parse(JSON.stringify(this.$store.getters.viewsLayout))
    }
  }
}

</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: columns;

  .home-tool {
    width: 50px;
    line-height: 0;

    .el-button {
      margin: .1rem 0 !important;
    }
  }

  .home-view {
    flex: 1;
    border-left: 1px solid #EBEEF5;
    padding: 0 20px;
    overflow: auto;

    .home-empty {
      text-align: center;
      font-size: .4rem;
      line-height: 4rem;
      color: #969696;
    }

    .vue-grid-item {
      overflow: hidden;
    }
  }
}

</style>
