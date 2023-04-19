<template>
  <div class="logic-flow-container" ref="logicflowContainer" :style="[{ width, height }]"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, computed, watch } from 'vue'
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import type { NodeEventData } from './interfaces/core'

import { Control, DndPanel, SelectionSelect, Menu, Snapshot } from '@logicflow/extension'
import '@logicflow/extension/lib/style/index.css'

LogicFlow.use(DndPanel)
LogicFlow.use(Control)
LogicFlow.use(SelectionSelect)
LogicFlow.use(Menu)
LogicFlow.use(Snapshot)

import scaleableRect from './nodes/scaleableRect'
import { registerDndPanel } from './extensions/dndPanel'
import { registerControl } from './extensions/control'

export default defineComponent({
  name: 'LogicFlow',
  props: {
    // 图数据
    modelValue: {
      type: Object,
      default: () => ({})
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '80vh'
    }
  },
  emits: ['update:modelValue', 'node:click', 'selection:selected'],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props)

    const graphData = computed({
      get() {
        return modelValue.value
      },
      set(value: Record<string, any>) {
        emit('update:modelValue', value)
      }
    })

    const logicflowContainer = ref<HTMLElement>()
    const lf = ref<LogicFlow>()
    const activeNodeData = ref<NodeEventData>()

    const init = () => {
      if (!logicflowContainer.value) return

      lf.value = new LogicFlow({
        container: logicflowContainer.value,
        grid: true,
        stopMoveGraph: true,
        keyboard: {
          enabled: true
        }
      })

      registerDndPanel(lf.value)
      registerControl(lf.value)

      lf.value.register(scaleableRect)

      lf.value.render(graphData.value)

      lf.value.on('node:click', (e: NodeEventData) => {
        activeNodeData.value = e
        emit('node:click', e)
      })

      lf.value.on('selection:selected', (e) => {
        emit('selection:selected', e)
      })

      lf.value.on('history:change', () => {
        graphData.value = lf.value?.getGraphData()
      })
    }

    const initNativeEvent = () => {
      logicflowContainer.value?.addEventListener('keypress', (e) => {
        console.log(e)
      })
    }

    watch(graphData, (value) => {
      lf.value?.render(value)
    })

    onMounted(() => {
      init()
      initNativeEvent()
    })

    return {
      logicflowContainer,
      lf,
      graphData,
      activeNodeData
    }
  }
})
</script>
