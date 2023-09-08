// typings.d.ts or router.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * 设置该路由在侧边栏和面包屑中展示的名字
     */
    title?: string
    /**
     * 设置该路由的图标
     */
    icon?: string
    /**
     * 如果设置为true，它则会固定在tags-view中(默认 false)
     */
    affix?: boolean
    /**
     * 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
     */
    noCache?: boolean
    /**
     * 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
     */
    hidden?: boolean
    /**
     * 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
     * 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
     * 若你想不管路由下面的 children 声明的个数都显示你的根路由
     * 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
     */
    alwaysShow?: boolean

    /**
     * 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
     */
    redirect?: string

    /**
     * 自定义当前路由激活菜单项 path
     */
    activeMenu?: string

    /**
     * 跳转到当前路由时，是否隐藏侧边菜单
     */
    hideSidebar?: boolean
  }
}
