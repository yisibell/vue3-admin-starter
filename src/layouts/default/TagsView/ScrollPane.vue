<template>
  <el-scrollbar ref="scrollContainer" class="scroll-container" @wheel.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import type { ElScrollbar } from 'element-plus'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    tagListElements: HTMLElement[]
    tagAndTagSpacing?: number
  }>(),
  {
    tagAndTagSpacing: 4
  }
)

const emit = defineEmits(['scroll'])

const scrollContainer = ref<InstanceType<typeof ElScrollbar>>()
const scrollContainerEl = computed(() => scrollContainer.value?.$el)
const scrollWrapper = computed(() => scrollContainer.value?.wrapRef)

const emitScroll = () => {
  emit('scroll')
}

const handleScroll = (e: WheelEvent) => {
  const eventDelta = -e.deltaY * 40
  const $scrollWrapper = scrollWrapper.value

  if ($scrollWrapper) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
  }
}

const moveToTarget = (currentTag: HTMLElement) => {
  const $container = scrollContainerEl.value
  const $scrollWrapper = scrollWrapper.value

  if (!$container || !$scrollWrapper) return

  const $containerWidth = $container.offsetWidth

  const tagListElements = props.tagListElements

  let firstTag = null
  let lastTag = null

  // find first tag and last tag
  if (tagListElements.length > 0) {
    firstTag = tagListElements[0]
    lastTag = tagListElements[tagListElements.length - 1]
  }

  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0
  } else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
  } else {
    // find preTag and nextTag
    const currentIndex = tagListElements.findIndex((item) => item === currentTag)

    if (currentIndex < 0) return

    const prevTag = tagListElements[currentIndex - 1]
    const nextTag = tagListElements[currentIndex + 1]

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + props.tagAndTagSpacing

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - props.tagAndTagSpacing

    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}

onMounted(() => {
  scrollWrapper.value?.addEventListener('scroll', emitScroll, true)
})

onUnmounted(() => {
  scrollWrapper.value?.removeEventListener('scroll', emitScroll)
})

defineExpose({
  moveToTarget
})
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
}
</style>
