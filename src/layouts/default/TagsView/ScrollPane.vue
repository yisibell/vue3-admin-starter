<template>
  <el-scrollbar ref="scrollContainer" class="scroll-container">
    <slot />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import type { ITagView } from '@/stores/tagsView'

const moveToTarget = (tag: ITagView) => {
  console.log(tag)
}

defineExpose({
  moveToTarget
})
</script>
