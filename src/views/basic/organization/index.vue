<template>
  <div class="organization">
    <tree-panel autoLoad :treeData="treeData" :treeParams="treeParams" @select="select">
      <template v-slot:detailTool>
        <el-tooltip class="item" effect="dark" :content="detailEdit ? $t('action.cancel') + $t('action.edit') : $t('action.edit')" placement="bottom">
          <el-button icon="el-icon-edit" size="mini" type="warning" circle @click="detailEdit = !detailEdit"></el-button>
        </el-tooltip>
        <el-tooltip v-if="detailEdit" class="item" effect="dark" :content="$t('action.save')" placement="bottom">
          <el-button icon="el-icon-document-checked" size="mini" type="success" circle @click="save"></el-button>
        </el-tooltip>
      </template>
      <template v-slot:detailContent>
        <el-form :model="detailForm" :disabled="!detailEdit">
          <el-form-item :label="$t('organization.name')">
            <el-input v-model="selectedData.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('organization.functional')">
            <el-input v-model="selectedData.functional"></el-input>
          </el-form-item>
          <el-form-item :label="$t('organization.category')">
            <el-input v-model="selectedData.category"></el-input>
          </el-form-item>
          <el-form-item :label="$t('organization.remarks')">
            <el-input v-model="selectedData.remarks"></el-input>
          </el-form-item>
          <el-form-item>
            <el-form-item :label="$t('organization.users')">
            </el-form-item>
            <el-avatar v-for="user of selectedData.users" :key="user.id">{{user.label}}</el-avatar>
          </el-form-item>
        </el-form>
      </template>
    </tree-panel>
  </div>
</template>
<script>
import testData from './testData.json'
import TreePanel from '@/components/TreePanel'
export default {
  name: 'Organization',
  data() {
    return {
      detailEdit: false,
      selectedData: null,
      detailForm: {},
      treeData: this.parseTree(testData, '#'),
      treeParams: {}
    }
  },
  computed: {},
  props: {},
  watch: {},
  components: {
    TreePanel
  },
  methods: {
    select(data) {
      this.selectedData = {
        name: data.data.groupName,
        functional: data.data.groupDomain,
        category: data.data.groupDesc,
        remarks: data.data.memo,
        users: data.users
      }
    },
    save() {
      this.$notify({
        showClose: false,
        message: this.$t('action.success'),
        iconClass: 'el-icon-circle-check',
        duration: 3000
      })
    },
    parseTree(array, parent, type) {
      var list = []
      var obj
      array.filter(e => e.parent === parent).forEach(e => {
        if (type === 'users' && e.type === 'user') {
          obj = {
            id: e.id,
            label: e.text,
            data: e.data,
            type: e.type
          }
          list.push(obj)
        } else if (type === undefined && e.type !== 'user') {
          obj = {
            id: e.id,
            label: e.text,
            data: e.data,
            type: e.type,
            users: this.parseTree(array, e.id, 'users')
          }
          obj.children = this.parseTree(array, e.id)
          list.push(obj)
        }
      })
      return list
    }
  },
  mounted() {}
}

</script>
<style lang="scss" scoped>
.tree-panel {
  height: 100%;
  overflow: auto;
}

</style>
