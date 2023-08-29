import request from '@/utils/request'
import type { IRouteResourceInfo, IGetAllResourceParams } from './index.interface'

// 获取所有资源
export const getAllResource = (params?: IGetAllResourceParams) => {
  return request<IRouteResourceInfo[]>({
    url: '/routes',
    method: 'get',
    params
  })
}
