<template>
  <div class="fs-14" :class="{ hidden: !!data.route_hidden }">
    <el-tooltip placement="top">
      <template #content>
        <div>
          {{ filterResourceTypeLabel(data.type) }}
          <span v-if="data.route_hidden">(已隐藏)</span>
          <span v-if="data.node_name">({{ data.node_name }})</span>
        </div>
      </template>

      <span class="mr-10">
        <el-icon v-if="data.type === 1" class="color--warning"><Tickets /></el-icon>
        <el-icon v-else-if="data.type === 2" class="color--success"><Folder /></el-icon>
        <el-icon v-else-if="data.type === 3" class="color--danger"><Flag /></el-icon>
      </span>
    </el-tooltip>

    <span :title="data.node_name">{{ data.name }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { filterResourceTypeLabel } from '@/filters'

const props = defineProps({
  data: Object
})

const data = computed(() => props.data)
</script>

<style lang="scss" scoped>
.hidden {
  opacity: 0.35;
}
</style>
