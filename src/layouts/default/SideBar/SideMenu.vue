<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="activeMenu"
    :collapse-transition="false"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    class="side-menu"
  >
    <SideMenuItem
      v-for="route in routes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
      :is-collapse="isCollapse"
    />
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import SideMenuItem from './SideMenuItem.vue'
import { useRoute } from 'vue-router'
import { usePermissionStore } from '@/stores/permission'
import { useAppStore } from '@/stores/app'

const permissionStore = usePermissionStore()

const routes = computed(() => permissionStore.sidebarList)

const route = useRoute()

const activeMenu = computed(() => {
  const { meta, path } = route

  // if set path, the sidebar will highlight the path you set
  if (meta && meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const AppStore = useAppStore()

const isCollapse = computed(() => !AppStore.sidebar.opened)
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none !important;
}
</style>
