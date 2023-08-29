export interface IUserLoginParams {
  username: string
  password: string
}

export interface IUserInfo {
  id: number
  username: string
  email: string
  is_admin: 0 | 1
  resourceIds: number[]
}
