export interface IRoleInfo {
  description: string
  id: number
  name: string
  order: number
  permissions: number[]
  resources: number[]
  type: 0 | 1
}

export interface IGetRolesParams {
  page: number
  page_size: number
  name: string
  type: 0 | 1 | ''
}

export interface IDataAuthInfo {
  group_name: string
  id: number
  name: string
}
