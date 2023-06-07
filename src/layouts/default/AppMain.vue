<template>
  <div class="app-main" :style="CSSVars">
    <el-scrollbar>
      <RouterView />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const SettingsStore = useSettingsStore()

const CSSVars = computed(() => ({
  '--app-main-height': SettingsStore.fixedHeader ? `calc(100vh - calc(34px + 50px))` : 'auto'
}))
</script>

<style lang="scss" scoped>
.app-main {
  height: var(--app-main-height);
}
</style>
