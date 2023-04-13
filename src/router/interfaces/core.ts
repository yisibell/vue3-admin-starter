import type { RouteMeta, RouteRecord } from 'vue-router'

export interface IRouteMeta extends RouteMeta {
  roles?: string[]
}

export interface IRouteRecord extends Omit<RouteRecord, 'children'> {
  title?: string
  meta: IRouteMeta
  children?: IRouteRecord[]
}
