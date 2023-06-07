<template>
  <div class="layout-default">
    <div class="layout-default__container">
      <div class="layout-default__aside" :style="asideCSSVars">
        <SideBar />
      </div>

      <div class="layout-default__main" :class="{ 'fixed-header': fixedHeader }">
        <div class="layout-default__header">
          <NavBar />
          <TagsView />
        </div>
        <AppMain />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SideBar from './SideBar/index.vue'
import AppMain from './AppMain.vue'
import NavBar from './NavBar/index.vue'
import TagsView from './TagsView/index.vue'
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { useSettingsStore } from '@/stores/settings'

const AppStore = useAppStore()
const SettingsStore = useSettingsStore()

const sidebarIsCollapse = computed(() => !AppStore.sidebar.opened)

const asideCSSVars = computed(() => ({
  '--layout-aside-width': sidebarIsCollapse.value ? '64px' : '210px'
}))

const fixedHeader = computed(() => SettingsStore.fixedHeader)
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutDefault'
})
</script>

<style lang="scss" scoped>
.layout-default {
  &__container {
    display: flex;
    height: 100vh;
  }

  &__aside {
    width: var(--layout-aside-width);
    min-height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    transition: width 0.3s ease;
  }

  &__main {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;

    &.fixed-header {
      overflow-y: hidden;
    }
  }
}
</style>
