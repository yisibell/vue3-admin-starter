import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface ITagView extends RouteLocationNormalizedLoaded {
  title: string
}

export const useTagsViewStore = defineStore('tags-view', {
  state: () => ({
    // used by tags view list
    visitedViews: [] as ITagView[],
    // used by <keep-alive />
    cachedViews: [] as (string | undefined | symbol)[]
  }),
  actions: {
    ADD_VISITED_VIEW(view: ITagView) {
      if (this.visitedViews.some((v) => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view?.meta?.title || 'no-name'
        })
      )
    },

    ADD_CACHED_VIEW(view: ITagView) {
      if (view.name === null) return
      if (this.cachedViews.includes(view?.name)) return
      if (!view?.meta?.noCache) {
        this.cachedViews.push(view.name)
      }
    },

    DEL_VISITED_VIEW(view: ITagView) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
    },

    DEL_CACHED_VIEW(view: ITagView) {
      if (view.name === null) return
      const index = this.cachedViews.indexOf(view.name)
      index > -1 && this.cachedViews.splice(index, 1)
    },

    DEL_OTHERS_VISITED_VIEWS(view: ITagView) {
      this.visitedViews = this.visitedViews.filter((v) => {
        return v?.meta?.affix || v.path === view.path
      })
    },

    DEL_OTHERS_CACHED_VIEWS(view: ITagView) {
      if (view.name === null) return
      const index = this.cachedViews.indexOf(view.name)
      if (index > -1) {
        this.cachedViews = this.cachedViews.slice(index, index + 1)
      } else {
        // if index = -1, there is no cached tags
        this.cachedViews = []
      }
    },

    DEL_ALL_VISITED_VIEWS() {
      // keep affix tags
      const affixTags = this.visitedViews.filter((tag) => tag?.meta?.affix)
      this.visitedViews = affixTags
    },

    DEL_ALL_CACHED_VIEWS() {
      this.cachedViews = []
    },

    UPDATE_VISITED_VIEW(view: ITagView) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },

    addView(view: ITagView) {
      this.ADD_VISITED_VIEW(view)
      this.ADD_CACHED_VIEW(view)
    },

    addVisitedView(view: ITagView) {
      this.ADD_VISITED_VIEW(view)
    },

    delView(view: ITagView) {
      this.DEL_VISITED_VIEW(view)
      this.DEL_CACHED_VIEW(view)
    },

    delCachedView(view: ITagView) {
      this.DEL_CACHED_VIEW(view)
    },

    delOthersViews(view: ITagView) {
      this.DEL_OTHERS_VISITED_VIEWS(view)
      this.DEL_OTHERS_CACHED_VIEWS(view)
    },

    delAllViews() {
      this.DEL_ALL_VISITED_VIEWS()
      this.DEL_ALL_CACHED_VIEWS()
    },

    delAllCachedViews() {
      this.DEL_ALL_CACHED_VIEWS()
    },

    updateVisitedView(view: ITagView) {
      this.UPDATE_VISITED_VIEW(view)
    }
  }
})
