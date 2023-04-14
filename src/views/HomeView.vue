<template>
  <div>home</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { imageToDataURLBatch } from '@/utils/imageToDataUrl'

const imgs = ref<string[]>([])

onMounted(async () => {
  const res = await imageToDataURLBatch([
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
  ])
  imgs.value = res
})
</script>
