import { resource_type } from '@/constants'

export const filterResourceTypeLabel = (value: number) => {
  return resource_type.find((v) => v.value === value)?.label
}

export const filterBoolToText = (value: number | boolean) => {
  return value ? '是' : '否'
}
