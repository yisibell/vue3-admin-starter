import request from '@/utils/request'
import type { IRouteResourceInfo, IGetAllResourceParams, IResourceParams } from './index.interface'

// 获取所有资源
export const getAllResource = (params?: IGetAllResourceParams) => {
  return request<IRouteResourceInfo[]>({
    url: '/routes',
    method: 'get',
    params
  })
}

// 新增资源
export const addResource = (data: IResourceParams) => {
  return request({
    url: '/routes',
    method: 'post',
    data
  })
}

// 修改资源
export const updateResource = (id: number, data: IResourceParams) => {
  return request({
    url: `/routes/${id}`,
    method: 'put',
    data
  })
}

// 删除资源
export const delResource = (id: number) => {
  return request({
    url: `/routes/${id}`,
    method: 'delete'
  })
}
