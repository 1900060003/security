<template>
  <div class="library">
    <div class="widget-layout">
      <component class="widget-item" v-for="(item, index) in widgetCmps" :is="item.widgetName" :key="'widget-item-' + index" hasLibrary :component-name="item.widgetName" :widget-width="item.widgetWidth" :widget-height="item.widgetHeight" :widget-max-width="item.widgetMaxWidth" :widget-max-height="item.widgetMaxHeight" :widget-min-width="item.widgetMinWidth" :widget-min-height="item.widgetMinHeight"></component>
    </div>
    <grid-layout ref="views-layout" class="views-layout" :layout.sync="viewsLayout" :col-num="colNum" :row-height="rowHeight" :margin="colMargin">
      <grid-item v-for="item in viewsLayout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :minW="item.minW" :minH="item.minH" :maxW="item.maxW || Infinity" :maxH="item.maxH || Infinity" :key="item.i" @contextmenu.native.prevent="rightClick($event, item)">
        <component :ref="'widget-item-' + item.i" hasCustomize :is="item.componentName" :attributes="item.attributes"></component>
      </grid-item>
      <div class="contextmenu" v-if="menuVisible" :style="{left: contextmenu.x + 'px', top: contextmenu.y + 'px'}">
        <div @click="editItem">{{$t('action.edit')}}</div>
        <div @click="deleteItem">{{$t('action.remove')}}</div>
      </div>
    </grid-layout>
    <el-dialog append-to-body :visible.sync="dialogVisible" width="30%" :show-close="false" :destroy-on-close="true" center :close-on-click-modal="false">
      <div style="font-size: .4rem; text-align: center; padding: .4rem;">{{$t('action.attributes')}}</div>
      <el-form v-if="attributesLayout">
        <el-form-item v-for="(attributes,index) of attributesLayout.config" :key="'attributes-cmp-' + index" :label="attributes.name">
          <el-select v-if="attributes.type === 'select'" @change="attributes.fn($event)" v-model="attributes.value">
            <el-option v-for="(option, optionIndex) of attributes.option" :key="'attributes-cmp-' + index + '-item-' + optionIndex" :label="option.text" :value="option.value">
            </el-option>
          </el-select>
          <el-input v-if="attributes.type === 'input'" v-model="attributes.value" @change="attributes.fn($event)"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAttributes">{{$t('action.cancel')}}</el-button>
        <el-button type="primary" @click="saveAttributes">{{$t('action.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import interact from 'interactjs'
import widget from '@/components/customize/widget'
import merge from '@/utils/merge'
import VueGridLayout from 'vue-grid-layout'
export default {
  name: 'Library',
  data() {
    return {
      dialogVisible: false,
      menuVisible: false,
      rowHeight: 40,
      colNum: 12,
      colMargin: [0, 0],
      defaultGridW: 2,
      defaultGridH: 1,
      maxRows: Infinity,
      viewsLayout: JSON.parse(JSON.stringify(this.$store.getters.viewsLayout)),
      attributesLayout: null,
      selectItem: null,
      contextmenu: null
    }
  },
  computed: {
    widgetCmps() {
      return Object.getOwnPropertyNames(widget).map(e => {
        return {
          widgetName: e,
          widgetWidth: widget[e].customizationSize.width,
          widgetHeight: widget[e].customizationSize.height,
          widgetMaxWidth: widget[e].customizationSize.maxWidth,
          widgetMaxHeight: widget[e].customizationSize.maxHeight,
          widgetMinWidth: widget[e].customizationSize.minWidth,
          widgetMinHeight: widget[e].customizationSize.minHeight
        }
      })
    }
  },
  components: merge({
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  }, widget),

  methods: {
    cancelAttributes() {
      this.dialogVisible = false
    },
    saveAttributes() {
      this.cancelAttributes()
    },
    deleteItem() {
      this.viewsLayout.splice(this.viewsLayout.map(e => e.i).indexOf(this.selectItem.i), 1)
      this.$store.commit('SET_VIEW_LAYOUT', this.getLayout())
    },
    editItem() {
      this.dialogVisible = true
      this.attributesLayout = {
        config: this.$refs[('widget-item-' + this.selectItem.i)][0].getCustomizationConfig(this.viewsLayout.filter(e => e.i === this.selectItem.i)[0])
      }
    },
    foo() {
      this.menuVisible = false
      document.removeEventListener('click', this.foo)
    },
    rightClick(e, item) {
      this.menuVisible = true
      this.selectItem = item
      this.contextmenu = {
        x: e.clientX,
        y: e.clientY
      }
      document.addEventListener('click', this.foo)
    },
    getLayout() {
      return this.viewsLayout
    },
    calcXY(top, left) {
      const colWidth = this.calcColWidth()
      var x = Math.round((left - this.colMargin[0]) / (colWidth + this.colMargin[0]))
      var y = Math.round((top - this.colMargin[1]) / (this.rowHeight + this.colMargin[1]))
      x = Math.max(Math.min(x, this.colNum - this.defaultGridW), 0)
      y = Math.max(Math.min(y, this.maxRows - this.defaultGridH), 0)
      return { x, y }
    },
    calcColWidth() {
      return (this.$refs['views-layout'].$children[0].containerWidth - (this.colMargin[0] * (this.colNum + 1))) / this.colNum
    },
    initComponentDrag() {
      var _this = this
      var entered = false
      var { x: viewX, y: viewY } = this.$refs['views-layout'].$el.getBoundingClientRect()
      var copyDragCmpItem = null
      var movingGridDeltaY = 0
      var i = this.viewsLayout.length > 0 ? Math.max.apply(Math, this.viewsLayout.map(e => e.i)) + 1 : 0
      var x = 0
      var y = 0
      var position = { x: 0, y: 0 }
      interact('.widget-item').draggable({
        listeners: {
          start(e) {
            copyDragCmpItem = e.target.cloneNode(true)
            copyDragCmpItem.classList.add('copy-item')
            e.target.appendChild(copyDragCmpItem)
            movingGridDeltaY = event.target.getBoundingClientRect().y
          },
          move(e) {
            position.x += e.dx
            position.y += e.dy
            copyDragCmpItem.style.transform = `translate(${position.x}px, ${position.y}px)`
            var { x: _x, y: _y } = (_this.calcXY(position.y + movingGridDeltaY - viewY, position.x - viewX))
            x = _x
            y = _y
            if (entered) {
              var currentDragGridData = _this.viewsLayout[_this.viewsLayout.length - 1]
              currentDragGridData.x = x
              currentDragGridData.y = y
              _this.$refs['views-layout'].eventBus.$emit('dragEvent', 'dragmove', i, x, y, +copyDragCmpItem.getAttribute('widget-height') || _this.defaultGridH, +copyDragCmpItem.getAttribute('widget-width') || _this.defaultGridW)
            }
          },
          end(e) {
            if (!entered) {
              _this.viewsLayout.splice(_this.viewsLayout.length - 1, 1)
            }
            _this.$refs['views-layout'].isDragging = false
            e.target.removeChild(copyDragCmpItem)
            copyDragCmpItem = null
            movingGridDeltaY = 0
            position = { x: 0, y: 0 }
            x = 0
            y = 0
            i++
          }
        }
      })
      interact('.views-layout').dropzone({
        accept: '.widget-item',
        ondropactivate(e) {
          e.target.classList.add('drop-active')
        },
        ondragenter(e) {
          entered = true
          if (!copyDragCmpItem) {
            return
          }
          copyDragCmpItem.classList.add('hidden')
          if (!_this.viewsLayout.some(e => e.i === i)) {
            _this.viewsLayout.push({
              x: x,
              y: y,
              w: +copyDragCmpItem.getAttribute('widget-width') || _this.defaultGridW,
              h: +copyDragCmpItem.getAttribute('widget-height') || _this.defaultGridH,
              i: i,
              minW: +copyDragCmpItem.getAttribute('widget-min-width') || 1,
              minH: +copyDragCmpItem.getAttribute('widget-min-height') || 1,
              maxW: +copyDragCmpItem.getAttribute('widget-max-width') || 1,
              maxH: +copyDragCmpItem.getAttribute('widget-max-height') || 1,
              componentName: copyDragCmpItem.getAttribute('component-name')
            })
          }
        },
        ondragleave(e) {
          entered = false
          if (!copyDragCmpItem) {
            return
          }
          copyDragCmpItem.classList.remove('hidden')
        },
        ondrop() {},
        ondropdeactivate(e) {
          e.target.classList.remove('drop-active')
        }
      })
    }
  },
  mounted() {
    this.initComponentDrag()
  }
}

</script>
<style lang="scss" scoped>
.el-form {
  padding: 0 20px;
}

.library {
  height: 100%;
  width: 100%;
  display: flex;
  padding: 0 20px 0 0;

  .widget-layout {
    height: 100% !important;
    width: 200px;

    .widget-item {
      line-height: 30px;
      padding-left: 20px;
      height: 30px;
      position: relative;

      >.widget-item.copy-item {
        position: absolute;
        width: 100%;
        top: 0;
        background-color: rgba(0, 0, 0, .2);

        &.hidden {
          display: none;
        }
      }
    }
  }

  .views-layout {
    position: relative;
    height: 100% !important;
    background-color: #EBEEF5;
    flex: 1;
    overflow: auto;

    &.drop-active {
      outline: 1px dashed #409EFF;
    }

    .vue-grid-item {
      overflow: hidden;
      border: 1px dashed #adadad;

      &.outline {
        outline: 1px dashed rgba(0, 0, 0, .5);
      }
    }

    ::v-deep .vue-grid-item.vue-grid-placeholder {
      background-color: rgba(0, 0, 0, .5);
      box-shadow: 2px 2px 6px rgba(0, 0, 0, .5)
    }
  }
}

</style>
