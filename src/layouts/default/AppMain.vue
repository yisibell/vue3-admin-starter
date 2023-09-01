<template>
  <div class="app-main" :style="CSSVars">
    <el-scrollbar>
      <RouterView #default="{ Component }">
        <Transition name="fade-transform" mode="out-in">
          <KeepAlive :include="cachedViews">
            <Component :is="Component" :key="key" />
          </KeepAlive>
        </Transition>
      </RouterView>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useTagsViewStore } from '@/stores/tagsView'
import { useRoute } from 'vue-router'

const route = useRoute()
const SettingsStore = useSettingsStore()
const TagsViewStore = useTagsViewStore()

const CSSVars = computed(() => ({
  '--app-main-height': SettingsStore.fixedHeader ? `calc(100vh - calc(34px + 50px))` : 'auto'
}))

const cachedViews = computed(() => TagsViewStore.cachedViews)
const key = computed(() => route.path)
</script>

<style lang="scss" scoped>
.app-main {
  height: var(--app-main-height);
  background-color: #f2f6fc;
}
</style>
