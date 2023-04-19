<template>
  <div>
    <LogicFlow v-model="flowGraphData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LogicFlow from '@/components/LogicFlow/index.vue'

export default defineComponent({
  name: 'FlowDemo',
  components: {
    LogicFlow
  },
  setup() {
    const flowGraphData = ref({})

    return {
      flowGraphData
    }
  }
})
</script>
