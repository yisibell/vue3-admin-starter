<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[isCollapse ? 'simple-mode' : 'full-mode', { 'first-level': isFirstLevel }]"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <SideMenuItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item
          :index="item.component ? resolvePath(theOnlyOneChild.path) : item?.meta?.title"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
        >
          <SvgIcon
            v-if="theOnlyOneChild.meta.icon"
            :name="theOnlyOneChild.meta.icon"
            color="currentColor"
            class="menu-item-icon"
          />
          <template #title>
            <span v-if="theOnlyOneChild.meta.title" :title="theOnlyOneChild.meta.title">
              {{ theOnlyOneChild.meta.title }}
            </span>
          </template>
        </el-menu-item>
      </SideMenuItemLink>
    </template>

    <el-sub-menu
      v-else
      :index="item.component ? resolvePath(item.path) : item?.meta?.title"
      :teleported="true"
    >
      <template #title>
        <SvgIcon
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon"
          color="currentColor"
          class="menu-item-icon"
        />
        <span v-if="item.meta && item.meta.title && !isCollapse">
          {{ item.meta.title }}
        </span>
      </template>

      <template v-if="item.children">
        <SideMenuItem
          v-for="(child, index) in item.children"
          :key="child.path + index"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { isExternal } from '../utils'
import path from 'pathe'
import SideMenuItemLink from './SideMenuItemLink.vue'

const props = withDefaults(
  defineProps<{
    item: RouteRecordRaw
    isCollapse: boolean
    isFirstLevel?: boolean
    basePath: string
  }>(),
  {
    isFirstLevel: true
  }
)

const alwaysShowRootMenu = computed(() => {
  if (props.item.meta && props.item.meta.alwaysShow) {
    return true
  }
  return false
})

const showingChildNumber = computed(() => {
  if (props.item.children) {
    const showingChildren = props.item.children.filter((item) => {
      if (item.meta && item.meta.hidden) {
        return false
      } else {
        return true
      }
    })
    return showingChildren.length
  }
  return 0
})

const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) {
    return null
  }
  if (props.item.children) {
    for (const child of props.item.children) {
      if (!child.meta || !child.meta.hidden) {
        return child
      }
    }
  }
  // If there is no children, return itself with path removed,
  // because this.basePath already conatins item's path information
  return { ...props.item, path: '' }
})

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>

<style lang="scss" scoped>
.menu-item-icon {
  margin-right: 6px !important;
  visibility: unset !important;
}

.simple-mode {
  .menu-item-icon {
    margin-right: 0px !important;
  }
}
</style>

<style lang="scss">
.simple-mode {
  &.first-level {
    .el-sub-menu {
      & > .el-sub-menu__title {
        padding: 0 20px;
        .el-sub-menu__icon-arrow {
          display: none;
        }
      }
    }

    .el-menu-tooltip__trigger,
    .el-sub-menu__title {
      justify-content: center !important;
    }
  }
}
</style>
