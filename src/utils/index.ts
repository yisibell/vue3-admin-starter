/** 验证对象或数组是否为空 */
export const isEmpty = (obj: Object & Array<any>) => {
  if (['{}', '[]', 'null', undefined].includes(JSON.stringify(obj))) {
    return true
  }
  return false
}

/**
 * 筛选请求参数
 * @param obj 筛选对象
 * @param excludeKey 排除key
 * @returns 筛选后对象
 */
export function paramsVerify<T extends Object>(obj: T, excludeKey?: any[]): T {
  const res = <T>{}
  if (!obj || typeof obj !== 'object') return res
  Object.keys(obj).forEach((key) => {
    const val = (<any>obj)[key]
    if ((!isEmpty(val) && val !== '' && val !== -9) || (excludeKey && excludeKey.includes(key))) {
      // 规定 -9 number类型默认值，相当于''
      ;(<any>res)[key] = val
    }
  })
  return res
}
