import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface ITagView extends Partial<RouteLocationNormalizedLoaded> {
  title?: string
}

export const useTagsViewStore = defineStore('tags-view', {
  state: () => ({
    // used by tags view list
    visitedViews: [] as ITagView[],
    // used by <keep-alive />
    cachedViews: [] as string[]
  }),
  actions: {
    // 添加已访问路由
    ADD_VISITED_VIEW(view: ITagView) {
      if (this.visitedViews.some((v) => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view?.meta?.title || 'no-name'
        })
      )
    },

    // 添加已缓存路由
    ADD_CACHED_VIEW(view: ITagView) {
      if (view.name === null || typeof view.name !== 'string') return

      if (this.cachedViews.includes(view?.name)) return
      if (!view?.meta?.noCache) {
        this.cachedViews.push(view.name)
      }
    },

    // 删除已访问路由
    DEL_VISITED_VIEW(view: ITagView) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
    },

    // 删除已缓存路由
    DEL_CACHED_VIEW(view: ITagView) {
      if (view.name === null || typeof view.name !== 'string') return
      const index = this.cachedViews.indexOf(view.name)
      index > -1 && this.cachedViews.splice(index, 1)
    },

    // 删除其他已访问路由
    DEL_OTHERS_VISITED_VIEWS(view: ITagView) {
      this.visitedViews = this.visitedViews.filter((v) => {
        return v?.meta?.affix || v.path === view.path
      })
    },

    // 删除其他已缓存路由
    DEL_OTHERS_CACHED_VIEWS(view: ITagView) {
      if (view.name === null || typeof view.name !== 'string') return
      const index = this.cachedViews.indexOf(view.name)
      if (index > -1) {
        this.cachedViews = this.cachedViews.slice(index, index + 1)
      } else {
        // if index = -1, there is no cached tags
        this.cachedViews = []
      }
    },

    // 删除所有已访问路由
    DEL_ALL_VISITED_VIEWS() {
      // keep affix tags
      const affixTags = this.visitedViews.filter((tag) => tag?.meta?.affix)
      this.visitedViews = affixTags
    },

    // 删除所有已缓存路由
    DEL_ALL_CACHED_VIEWS() {
      this.cachedViews = []
    },

    // 更新已访问路由
    UPDATE_VISITED_VIEW(view: ITagView) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },

    // 添加
    addView(view: ITagView) {
      this.ADD_VISITED_VIEW(view)
      this.ADD_CACHED_VIEW(view)
    },

    // 添加已访问
    addVisitedView(view: ITagView) {
      this.ADD_VISITED_VIEW(view)
    },

    // 删除
    delView(view: ITagView) {
      this.DEL_VISITED_VIEW(view)
      this.DEL_CACHED_VIEW(view)

      return this.visitedViews
    },

    // 删除已缓存
    delCachedView(view: ITagView) {
      this.DEL_CACHED_VIEW(view)
    },

    // 删除其他
    delOthersViews(view: ITagView) {
      this.DEL_OTHERS_VISITED_VIEWS(view)
      this.DEL_OTHERS_CACHED_VIEWS(view)
    },

    // 删除所有
    delAllViews() {
      this.DEL_ALL_VISITED_VIEWS()
      this.DEL_ALL_CACHED_VIEWS()
    },

    // 删除所有已缓存
    delAllCachedViews() {
      this.DEL_ALL_CACHED_VIEWS()
    },

    // 更新已访问
    updateVisitedView(view: ITagView) {
      this.UPDATE_VISITED_VIEW(view)
    }
  }
})
