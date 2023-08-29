import request from '@/utils/request'
import type { IUserLoginParams, IUserInfo } from './index.interface'

/**
 * 登录
 */
export const userLogin = (data: IUserLoginParams) =>
  request<string>({
    url: '/auth/login',
    method: 'post',
    data
  })

/** 获取用户信息 */
export const getUserInfo = () =>
  request<IUserInfo>({
    url: '/auth/me',
    method: 'get'
  })
