<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    :collapse="isCollapse"
    :default-active="activeMenu"
    text-color="#fff"
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

const permissionStore = usePermissionStore()

const routes = computed(() => permissionStore.routes)

const route = useRoute()

const activeMenu = computed(() => {
  const { meta, path } = route

  // if set path, the sidebar will highlight the path you set
  if (meta && meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const isCollapse = computed(() => false)
</script>
