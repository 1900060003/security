<template>
  <div class="customize">
    <div class="title">{{$t('action.customize')}}</div>
    <div class="content">
      <library ref="library"></library>
    </div>
  </div>
</template>
<script>
import Library from './Library'
export default {
  name: 'Customize',
  data() {
    return {}
  },
  computed: {},
  props: {},
  watch: {},
  components: {
    Library
  },
  methods: {
    save() {
      this.$store.commit('SET_VIEW_LAYOUT', this.$refs.library.getLayout())
    }
  },
  mounted() {}
}

</script>
<style lang="scss" scoped>
.customize {
  .title {
    text-align: center;
    font-size: .4rem;
    padding: .2rem;
  }

  .content {
    height: 70vh;
    border-top: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
  }
}

</style>
