<template>
  <div ref="tagsViewContainerEl" class="tags-view-container">
    <ScrollPane :tag-list="tagList" class="tags-view-wrapper" @scroll="handleScroll">
      <RouterLink
        v-for="tag in visitedViews"
        :ref="getTagVNodes"
        :key="tag.fullPath"
        :class="tag.path === route.path ? 'active' : ''"
        :to="{ path: `${tag.path}`, query: tag.query }"
        class="tags-view-item"
        @click.middle="closeSelectedTag(tag)"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ $t(tag.title || '') }}
        <el-icon
          v-if="!isAffix(tag)"
          :size="10"
          class="tags-view-item__close"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <Close />
        </el-icon>
      </RouterLink>
    </ScrollPane>

    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import path from 'pathe'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { computed, onMounted, ref, nextTick, watch } from 'vue'
import { usePermissionStore } from '@/stores/permission'
import { useTagsViewStore } from '@/stores/tagsView'
import type { IRouteRecord } from '@/router/interfaces/core'
import type { ITagView } from '@/stores/tagsView'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import ScrollPane from './ScrollPane.vue'

type ScrollPaneComponent = InstanceType<typeof ScrollPane>

const PermissionStore = usePermissionStore()
const TagsViewStore = useTagsViewStore()

const routes = computed(() => PermissionStore.routes)
const visitedViews = computed(() => TagsViewStore.visitedViews)
const affixTags = ref<ITagView[]>([])
const selectedTag = ref<RouteLocationNormalizedLoaded | {}>({})
const visible = ref(false)
const left = ref(0)
const top = ref(0)

const scrollPane = ref<ScrollPaneComponent>()

const route = useRoute()
const router = useRouter()

watch(
  () => route,
  () => {
    addTags()
    moveToCurrentTag()
  },
  { deep: true }
)

watch(visible, (value: boolean) => {
  if (value) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

const tagList = ref<HTMLAnchorElement[]>([])
const getTagVNodes = (VNode: any) => {
  const tagEl = (VNode && VNode.$el) as HTMLAnchorElement
  if (tagEl) {
    if (tagList.value.some((v) => v.href === tagEl.href)) return

    tagList.value.push(tagEl)
  }
}

// 过滤固定标签
const filterAffixTags = (routes: IRouteRecord[], basePath = '/') => {
  let tags: ITagView[] = []

  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })

  return tags
}

// 初始化标签
const initTags = () => {
  affixTags.value = filterAffixTags(routes.value)
  for (const tag of affixTags.value) {
    // Must have tag name
    if (tag.name) {
      TagsViewStore.addVisitedView(tag)
    }
  }
}

// 添加标签
const addTags = () => {
  const { name } = route
  if (name) {
    TagsViewStore.addView(route)
  }
  return false
}

// 某路由是否激活
const isActive = (route: ITagView) => {
  return route.path === route.path
}

// 某标签是否为固定标签
const isAffix = (tag: ITagView) => {
  return tag.meta && tag.meta.affix
}

const moveToCurrentTag = () => {
  const tags = visitedViews.value

  nextTick(() => {
    for (const tag of tags) {
      if (tag.path === route.path) {
        scrollPane.value?.moveToTarget(tag) // TODO: move to target tag

        // when query is different then update
        if (tag.fullPath !== route.fullPath) {
          TagsViewStore.updateVisitedView(route)
        }

        break
      }
    }
  })
}

const toLastView = (visitedViews: ITagView[], view: ITagView) => {
  const latestView = visitedViews.slice(-1)[0]

  if (latestView !== undefined && latestView.fullPath !== undefined) {
    router.push(latestView.fullPath).catch((err) => {
      console.warn(err)
    })
  } else {
    // Default redirect to the home page if there is no tags-view, adjust it if you want
    if (view.name === 'Dashboard') {
      // to reload home page
      router.replace({ path: '/redirect' + view.fullPath }).catch((err) => {
        console.warn(err)
      })
    } else {
      router.push('/').catch((err) => {
        console.warn(err)
      })
    }
  }
}

// 刷新
const refreshSelectedTag = (view: ITagView) => {
  TagsViewStore.delCachedView(view)

  const { fullPath } = view
  nextTick(() => {
    router.replace({
      path: '/redirect' + fullPath
    })
  })
}

// 关闭
const closeSelectedTag = (view: ITagView) => {
  if (isAffix(view)) return

  TagsViewStore.delView(view)

  if (isActive(view)) {
    toLastView(visitedViews.value, view)
  }
}

// 关闭其他
const closeOthersTags = () => {
  router.push(selectedTag.value)
  TagsViewStore.delOthersViews(selectedTag.value)
  moveToCurrentTag()
}

// 关闭所有
const closeAllTags = (view: ITagView) => {
  TagsViewStore.delAllViews()
  if (affixTags.value.some((tag) => tag.path === view.path)) {
    return
  }

  toLastView(visitedViews.value, view)
}

const tagsViewContainerEl = ref<HTMLElement | null>(null)
const openMenu = (tag: ITagView, e: MouseEvent) => {
  if (!tagsViewContainerEl.value) return

  const menuMinWidth = 105
  const offsetWidth = tagsViewContainerEl.value.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const tagLeft = e.clientX - 15 // 15: margin right

  if (tagLeft > maxLeft) {
    left.value = maxLeft
  } else {
    left.value = tagLeft
  }

  top.value = e.clientY
  visible.value = true
  selectedTag.value = tag
}

const closeMenu = () => {
  visible.value = false
}

const handleScroll = () => {
  closeMenu()
}

onMounted(() => {
  initTags()
  addTags()
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TagsView'
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #d8dce5;
}

.tags-view-item {
  display: inline-flex;
  position: relative;
  cursor: pointer;
  height: 26px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
  align-items: center;

  &:first-of-type {
    margin-left: 15px;
  }

  &:last-of-type {
    margin-right: 15px;
  }

  &.active {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
    &::before {
      content: '';
      background: #fff;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      margin-right: 2px;
    }
  }

  &__close {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
}

.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
