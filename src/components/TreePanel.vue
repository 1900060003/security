<template>
  <div ref="tree-panel" class="tree-panel">
    <el-tree class="tree-panel-view" :expand-on-click-node="false" :data="tableData" :props="defaultProps" default-expand-all ref="tree" @node-click="treeClick">
      <span class="tree-node" slot-scope="{data}">
        <i :class="treeIcons[data.type]"></i>
        <span>{{ data.label }}</span>
      </span>
    </el-tree>
    <div v-if="showDetail" class="tree-panel-detail" :class="{shrink: shrink}">
      <div class="detail-tool">
        <slot name="detailTool"></slot>
        <el-tooltip class="item" effect="dark" :content="shrink ? $t('action.unfold') : $t('action.shrink')" placement="bottom">
          <el-button :icon="shrink ? 'el-icon-arrow-left' : 'el-icon-arrow-right'" size="mini" type="primary" circle @click="shrink = !shrink"></el-button>
        </el-tooltip>
      </div>
      <div v-if="!shrink" class="detail-content">
        <slot name="detailContent"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TreePanel',
  data() {
    return {
      treeIcons: {
        subGroup: 'el-icon-office-building',
        underGroup: 'el-icon-school',
        user: 'el-icon-user'
      },
      showDetail: false,
      shrink: false,
      defaultProps: [],
      tableData: []
    }
  },
  computed: {},
  props: {
    treeDataApi: {
      type: Function,
      default: null
    },
    autoLoad: {
      type: Boolean,
      default: false
    },
    treeParams: {
      type: Object,
      default: null
    },
    treeData: {
      type: Array,
      default: () => []
    }
  },
  watch: {},
  components: {},
  methods: {
    treeClick(data, node, dom) {
      this.$emit('select', data)
      this.shrink = false
      this.showDetail = true
    },
    getTreeData() {
      if (this.treeDataApi) {
        this.treeDataApi(this.treeParams).then(res => {
          this.tableData = res.data
        })
      } else {
        this.tableData = this.treeData
      }
    }
  },
  mounted() {
    if (this.autoLoad) {
      this.getTreeData()
    }
  }
}

</script>
<style lang="scss" scoped>
.tree-panel {
  display: flex;

  .tree-node {
    font-size: 0.32rem;
    line-height: .32rem;

    i {
      vertical-align: middle;
    }
  }

  .tree-panel-view {
    flex: 1;
    overflow: auto;
  }

  .tree-panel-detail {
    width: 400px;
    border-left: 1px solid #EBEEF5;
    padding: 0 20px;

    &.shrink {
      width: 50px;
      padding: 0;

      .el-button {
        margin: 0 0 .1rem 0 !important;
      }
    }

    .detail-tool {
      line-height: 0;
      text-align: right;
    }
  }
}

</style>
