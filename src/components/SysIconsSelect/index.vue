<template>
  <el-select v-model="selected">
    <el-option v-for="v in options" :key="v.value" :value="v.value">
      <SvgIcon :name="v.value" size="28" />
      <span class="px-10">{{ v.label }}</span>
    </el-option>
  </el-select>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
defineOptions({
  name: 'SysIconsSelect'
})

const props = withDefaults(
  defineProps<{
    modelValue: string
  }>(),
  {}
)

const emit = defineEmits(['update:modelValue'])

const selected = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
  }
})

const options = ref<{ label: string; value: string }[]>([])

const init = () => {
  const iconsMap = import.meta.glob('@/assets/icons/**/**.svg', { eager: true, as: 'url' })

  options.value = Object.keys(iconsMap).reduce(
    (res, v) => {
      const arr = v.match(/.*assets\/icons\/(.*)\.svg$/)

      if (arr) {
        const item = arr[1]
        res.push({
          label: item,
          value: item
        })
      }

      return res
    },
    [] as { label: string; value: string }[]
  )
}

onMounted(() => {
  init()
})
</script>
