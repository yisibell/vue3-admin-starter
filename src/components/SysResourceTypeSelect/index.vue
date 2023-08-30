<template>
  <el-select v-model="resource">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script lang="ts" setup>
import { resource_type } from '@/constants'
import { computed } from 'vue'

defineOptions({
  name: 'SysResourceTypeSelect'
})

const props = withDefaults(
  defineProps<{
    modelValue: string | number
  }>(),
  {
    modelValue: ''
  }
)

const emit = defineEmits(['update:modelValue'])

const options = resource_type

const resource = computed({
  get() {
    return props.modelValue
  },
  set(value: string | number) {
    emit('update:modelValue', value)
  }
})
</script>
