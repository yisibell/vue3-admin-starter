import request from '@/utils/request'
import type { IRoleInfo, IGetRolesParams, IDataAuthInfo } from './index.interface'

// 获取所有角色
export const getRoles = (params: IGetRolesParams) => {
  return request<{ data: IRoleInfo[]; total: number }>({
    url: '/roles',
    method: 'get',
    params
  })
}

// 删除角色
export const deleteRole = (id: number) => {
  return request({
    url: `/roles/${id}`,
    method: 'delete'
  })
}

// 获取单个角色详情
export const getRoleById = (id: number) => {
  return request<IRoleInfo>({
    url: `/roles/${id}`,
    method: 'get'
  })
}

// 修改角色
export const updateRole = (id: number, data: Omit<IRoleInfo, 'id'>) => {
  return request({
    url: `/roles/${id}`,
    method: 'put',
    data
  })
}

// 新增角色
export const addRole = (data: Omit<IRoleInfo, 'id'>) => {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

// 获取所有数据权限
export const getPermissions = () => {
  return request<IDataAuthInfo[]>({
    url: '/permission',
    method: 'get'
  })
}
