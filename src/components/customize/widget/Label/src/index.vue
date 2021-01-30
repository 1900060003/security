<template>
  <div :class="['air-label', {'is-library': label_hasLibrary}, label_customCls, label_labelAlign]">
    <template v-if="label_hasLibrary">
      <div><i class="el-icon-postcard"></i>{{$t('attributes.text')}}</div>
    </template>
    <template v-else>
      <div :style="{'font-size': label_fontSize + 'px'}">{{label_text}}</div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'air-label',
  customizationSize: {
    width: 3,
    height: 1,
    maxWidth: Infinity,
    maxHeight: Infinity,
    minWidth: 3,
    minHeight: 1
  },
  data() {
    return {
      layout: null,
      label_hasLibrary: this.hasLibrary,
      label_customCls: '',
      label_text: this.$t('attributes.tip'),
      label_labelAlign: 'AC',
      label_fontSize: 12
    }
  },
  computed: {},
  props: {
    hasLibrary: {
      type: Boolean,
      default: false
    },
    attributes: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    label_text() {
      if (this.layout) {
        this.layout.attributes.text = this.label_text
      }
    },
    label_labelAlign() {
      if (this.layout) {
        this.layout.attributes.labelAlign = this.label_labelAlign
      }
    },
    label_fontSize() {
      if (this.layout) {
        this.layout.attributes.fontSize = this.label_fontSize
      }
    },
    attributes() {
      this.label_text = this.attributes.text
      this.label_labelAlign = this.attributes.labelAlign
      this.label_fontSize = this.attributes.fontSize
    }
  },
  components: {},
  methods: {
    setText(e) {
      this.label_text = e
    },
    setLabelAlign(e) {
      this.label_labelAlign = e
    },
    setFontSize(e) {
      this.label_fontSize = e
    },
    getCustomizationConfig(layout) {
      this.layout = layout
      this.layout.attributes = {
        text: this.label_text,
        labelAlign: this.label_labelAlign,
        fontSize: this.label_fontSize
      }
      return [{
        name: this.$t('attributes.text'),
        type: 'input',
        value: this.label_text,
        fn: this.setText
      }, {
        name: this.$t('attributes.textAlign'),
        type: 'select',
        option: [{
          text: '左',
          value: 'AL'
        }, {
          text: '右',
          value: 'AR'
        }, {
          text: '居中',
          value: 'AC'
        }],
        value: this.label_labelAlign,
        fn: this.setLabelAlign
      }, {
        name: this.$t('attributes.fontSize'),
        type: 'select',
        option: [{
          text: '12px',
          value: 12
        }, {
          text: '14px',
          value: 14
        }, {
          text: '16px',
          value: 16
        }, {
          text: '18px',
          value: 18
        }, {
          text: '20px',
          value: 20
        }, {
          text: '22px',
          value: 22
        }, {
          text: '24px',
          value: 24
        }],
        value: this.label_fontSize,
        fn: this.setFontSize
      }]
    }
  },
  mounted() {
    if (this.attributes) {
      this.label_text = this.attributes.text
      this.label_labelAlign = this.attributes.labelAlign
      this.label_fontSize = this.attributes.fontSize
    }
  }
}

</script>
<style lang="scss" scoped>
.air-label {
  line-height: .8rem;
  font-size: .24rem;
  text-align: center;
  background: rgba(255, 255, 255, .5);
  height: 100%;

  &.is-library {
    font-size: .32rem;
    text-align: left;

    i {
      margin-right: 10px;
    }

    &:hover {
      background: #292f4c;
      color: #ffffff;
    }
  }

  &:not(.is-library) {
    &.AL {
      text-align: left;
    }

    &.AR {
      text-align: right;
    }

    &.AC {
      text-align: center;
    }
  }
}

</style>
