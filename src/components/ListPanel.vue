<template>
  <div ref="list-panel" class="list-panel">
    <div v-if="filter" class="filter" :class="{shrink : shrink}">
      <div class="filter-tool">
        <slot name="filterTool"></slot>
        <el-tooltip class="item" effect="dark" :content="shrink ? $t('action.unfold') : $t('action.shrink')" placement="bottom">
          <el-button :icon="shrink ? 'el-icon-arrow-right' : 'el-icon-arrow-left'" size="mini" type="primary" circle @click="shrink = !shrink"></el-button>
        </el-tooltip>
      </div>
      <div v-if="!shrink" class="filter-content">
        <slot name="filterContent"></slot>
      </div>
      <div v-if="!shrink" class="filter-button">
        <el-button type="primary" @click="handleCurrentChange(1)">{{$t('action.search')}}</el-button>
        <el-button type="warning" @click="$emit('filterReset')">{{$t('action.reset')}}</el-button>
      </div>
    </div>
    <div class="list-panel-view">
      <el-table v-if="tableHeight" :data="tableData" style="width: 100%" :height="tableHeight" row-class-name="list-row" cell-class-name="list-cell" header-row-class-name="list-header-row" header-cell-class-name="list-header-cell">
        <slot name="listColumn"></slot>
      </el-table>
      <el-pagination v-if="pager" @current-change="handleCurrentChange" :current-page="page" :pager-count="5" :page-size="limit" layout="prev, pager, next" :prev-text="$t('action.pagination.prev')" :next-text="$t('action.pagination.next')" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListPanel',
  data() {
    return {
      shrink: true,
      page: 1,
      limit: 10,
      total: 0,
      tableHeight: 0,
      tableData: []
    }
  },
  props: {
    filter: {
      type: Boolean,
      default: false
    },
    pager: {
      type: Boolean,
      default: true
    },
    tableDataApi: {
      type: Function,
      default: null
    },
    autoLoad: {
      type: Boolean,
      default: false
    },
    listParams: {
      type: Object,
      default: null
    },
    listData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleCurrentChange(e) {
      this.page = e
      this.getTableData(e)
    },
    refresh() {
      this.getTableData(this.page)
    },
    getTableData(page) {
      var keys
      var list
      if (this.pager) {
        if (this.tableDataApi) {
          this.tableDataApi(this.listParams).then(res => {
            this.tableData = res.data
          })
        } else {
          list = this.listData
          if (this.listParams) {
            keys = Object.keys(this.listParams)
            keys.forEach(key => {
              list = this.fitlerData(list, key, this.listParams[key])
            })
          }
          this.total = list.length
          this.tableData = list.filter((e, index) => index >= (this.page - 1) * this.limit && index < this.page * this.limit)
        }
      } else {
        if (this.tableDataApi) {
          const params = Object.assign({
            limit: this.limit,
            page: page || this.page
          }, this.listParams)
          this.tableDataApi(params).then(res => {
            this.tableData = res.data.content
            this.total = res.data.total
          })
        } else {
          keys = Object.keys(this.listParams)
          list = this.listData
          keys.forEach(key => {
            list = this.fitlerData(list, key, this.ListPanel[key])
          })
          this.total = list.length
          this.tableData = list
        }
      }
    },
    fitlerData(array, key, value) {
      if (value) {
        return array.filter(e => e[key].indexOf(value) >= 0)
      } else {
        return array
      }
    },
    getCurrentTableData() {
      return this.tableData
    }
  },
  mounted() {
    this.tableHeight = this.$refs['list-panel'].clientHeight - 60
    if (this.autoLoad) {
      this.getTableData()
    }
  }
}

</script>
<style lang="scss">
.list-panel {
  display: flex;
  flex-direction: columns;
  height: 100%;

  .filter {
    width: 200px;
    margin-bottom: 60px;
    padding: 0 20px;

    &.shrink {
      width: 50px;
      padding: 0;

      .filter-tool {
        text-align: left;

        .el-button {
          margin: .1rem 0 !important;
        }
      }
    }

    .filter-tool {
      line-height: 0;
      text-align: right;
    }
  }

  .list-panel-view {
    overflow: auto;

    .el-table {
      border-left: 1px solid #EBEEF5;
      border-bottom-left-radius: 4px;
    }

    flex: 1;
  }
}

</style>
