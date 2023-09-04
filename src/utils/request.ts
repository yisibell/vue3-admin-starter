import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { useUserStore } from '@/stores/user'
import { ElLoading, ElMessage } from 'element-plus'

export interface IAxiosResponse<T = any> {
  data: T
  status: number
  message?: string
}

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 40000
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    const UserStore = useUserStore()

    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserStore.accessToken) {
      config.headers.token = UserStore.accessToken
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    const isBlob = response.request.responseType === 'blob'
    // if the responseType is a blob.
    if (isBlob) {
      return response
    }

    const res = response.data
    if (![200, 201].includes(res.status)) {
      ElMessage.error(res.message || 'Error')

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export type IRequestMethod = <T>(
  opts: AxiosRequestConfig,
  extraOpts?: {
    mock?: boolean // 是否为 mock 模式
    loading?: boolean // 是否开启接口 loading 提示
    loadingText?: string // loading 提示文本
    loadingLock?: boolean
    dataType?: 'json' | 'formData' | 'formData2' // 请求的数据格式，默认 json
  }
) => Promise<IAxiosResponse<T>>

const request: IRequestMethod = function <T>(
  option: AxiosRequestConfig,
  {
    mock = false,
    loading = false,
    loadingText = 'Loading',
    loadingLock = true,
    dataType = 'json'
  } = {}
) {
  if (mock && import.meta.env.VITE_APP_MOCK_API) {
    option.url = `${import.meta.env.VITE_APP_MOCK_API}${option.url}`
  }

  let loadingInstance: ReturnType<typeof ElLoading.service>

  if (loading) {
    loadingInstance = ElLoading.service({
      lock: loadingLock,
      text: loadingText,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }

  let defaultHeaders = {}

  if (dataType === 'formData') {
    defaultHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded' // 发送 formData 数据格式
    }

    option.data = qs.stringify(option.data)
  } else if (dataType === 'formData2') {
    defaultHeaders = {
      'Content-Type': 'multipart/form-data' // 含文件
    }
  }

  option.headers = Object.assign(defaultHeaders, option.headers || {})

  return new Promise<IAxiosResponse<T>>((resolve, reject) => {
    service(option)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        loadingInstance && loadingInstance.close()
      })
  })
}

export default request
