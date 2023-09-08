<template>
  <div class="layout-default">
    <div class="layout-default__container">
      <div class="layout-default__aside" :style="asideCSSVars">
        <SideBar v-if="!hideSidebar" />
      </div>

      <div class="layout-default__main" :class="{ 'fixed-header': fixedHeader }">
        <div class="layout-default__header">
          <NavBar :disabled-hamburger="hideSidebar" />
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
import { useRoute } from 'vue-router'

defineOptions({
  name: 'LayoutDefault'
})

const route = useRoute()
const AppStore = useAppStore()
const SettingsStore = useSettingsStore()

const sidebarIsCollapse = computed(() => !AppStore.sidebar.opened)

const hideSidebar = computed(() => route.meta?.hideSidebar)

const asideCSSVars = computed(() => ({
  '--layout-aside-width': hideSidebar.value ? '0px' : sidebarIsCollapse.value ? '64px' : '210px'
}))

const fixedHeader = computed(() => SettingsStore.fixedHeader)
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
