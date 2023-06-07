<template>
  <div class="side-bar-container">
    <SideBarLogo
      v-if="showSidebarLogo"
      :title="sidebarLogoTitle"
      :height="sideBarLogoHeight"
      :collapse="isCollapse"
    />
    <el-scrollbar :height="scrollbarHeight">
      <SideMenu />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import SideBarLogo from './SideBarLogo.vue'
import SideMenu from './SideMenu.vue'
import { useAppStore } from '@/stores/app'
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const AppStore = useAppStore()
const SettingsStore = useSettingsStore()

const isCollapse = computed(() => !AppStore.sidebar.opened)

const showSidebarLogo = computed(() => SettingsStore.sidebarLogo)

const sideBarLogoHeight = computed(() => (showSidebarLogo.value ? 50 : 0))

const sidebarLogoTitle = computed(() => SettingsStore.title)

const scrollbarHeight = computed(() => `calc(100vh - ${sideBarLogoHeight.value}px)`)
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SideBar'
})
</script>

<style lang="scss" scoped>
.side-bar-container {
  background-color: var(--layout-side-bar-bg-color);
}
</style>
