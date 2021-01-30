<template>
  <div class="user">
    <list-panel ref="listPanel" filter :listData="listData" autoLoad :listParams="listParams" @filterReset="listParams={}">
      <template v-slot:filterTool>
        <el-tooltip class="item" effect="dark" :content="$t('action.add')" placement="bottom">
          <el-button icon="el-icon-plus" size="mini" type="success" circle @click="add"></el-button>
        </el-tooltip>
      </template>
      <template v-slot:filterContent>
        <el-form :model="listParams">
          <el-form-item :label="$t('user.account')">
            <el-input v-model="listParams.account"></el-input>
          </el-form-item>
          <el-form-item :label="$t('user.email')">
            <el-input v-model="listParams.email"></el-input>
          </el-form-item>
          <el-form-item :label="$t('user.name')">
            <el-input v-model="listParams.name"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:listColumn>
        <el-table-column align="center" header-align="center" prop="account" :label="$t('user.account')" min-width="120"></el-table-column>
        <el-table-column align="center" header-align="center" prop="name" :label="$t('user.name')" min-width="120"></el-table-column>
        <el-table-column align="center" header-align="center" prop="email" :label="$t('user.email')" min-width="120"></el-table-column>
        <el-table-column align="center" header-align="center" :label="$t('user.role')" min-width="120">
          <template slot-scope="scope">{{scope.row.roles.map(e=>e.name).toString()}}</template>
        </el-table-column>
        <el-table-column align="center" header-align="center" :label="$t('user.organization')" min-width="120">
          <template slot-scope="scope">{{scope.row.organizations.map(e=>e.name).toString()}}</template>
        </el-table-column>
        <el-table-column align="center" header-align="center" :label="$t('action.operate')" min-width="120">
          <template v-slot:default="scope">
            <el-tooltip class="item" effect="dark" :content="$t('action.edit')" placement="bottom">
              <el-button icon="el-icon-edit" size="mini" type="success" circle @click="edit($event, scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('action.remove')" placement="bottom">
              <el-button icon="el-icon-delete" size="mini" type="danger" circle @click="remove($event, scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </template>
    </list-panel>
  </div>
</template>
<script>
import testData from './testData.json'
import ListPanel from '@/components/ListPanel'
export default {
  name: 'User',
  data() {
    return {
      listData: testData,
      listParams: {}
    }
  },
  computed: {},
  props: {},
  watch: {},
  components: {
    ListPanel
  },
  methods: {
    add() {
      this.$emit('openDrawer', 'UserForm', null)
    },
    edit(e, row) {
      this.$emit('openDrawer', 'UserForm', row)
    },
    refresh() {
      this.$refs.listPanel.refresh()
    },
    remove(e, row) {
      this.$confirm(this.$t('action.delete'), this.$t('action.warning'), {
        confirmButtonText: this.$t('action.confirm'),
        cancelButtonText: this.$t('action.cancel'),
        showClose: false,
        closeOnClickModal: false,
        iconClass: 'el-icon-warning-outline',
        confirmButtonClass: 'el-button--mini',
        cancelButtonClass: 'el-button--mini el-button--info'
      }).then(() => {
        this.$notify({
          showClose: false,
          message: this.$t('action.success'),
          iconClass: 'el-icon-circle-check',
          duration: 3000
        })
        this.refresh()
      })
    }
  },
  mounted() {}
}

</script>
<style lang="scss" scoped>
</style>
