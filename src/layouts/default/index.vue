<template>
  <div class="layout-default">
    <div class="layout-default__container">
      <div class="layout-default__aside" :style="asideCSSVars">
        <SideMenu />
      </div>

      <div class="layout-default__main">
        <div class="layout-default__header">
          <NavBar />
        </div>
        <AppMain />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SideMenu from './SideMenu.vue'
import AppMain from './AppMain.vue'
import NavBar from './NavBar/index.vue'
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const AppStore = useAppStore()

const sidebarIsCollapse = computed(() => AppStore.sidebar.opened)

const asideCSSVars = computed(() => ({
  '--layout-aside-width': sidebarIsCollapse.value ? '64px' : '210px'
}))
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
    background-color: var(--layout-side-menu-bg-color);
    overflow-x: hidden;
    overflow-y: auto;
    transition: width 0.3s ease;
  }

  &__main {
    flex: 1;
  }
}
</style>
