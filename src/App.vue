<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const AppStore = useAppStore()

const locale = computed(() => AppStore.elementPlusLocale)
</script>
