<template>
  <div class="">
    <el-card>
      <template #header>{{ title }}</template>

      <div>
        <el-form :model="form" :inline="true">
          <el-form-item label="权限分组" prop="group_name">
            <el-select v-model="form.group_name" :multiple="true" :clearable="true">
              <el-option v-for="v in group_name_options" :key="v" :value="v" :label="v"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="form.name" :clearable="true" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
            <el-button type="danger" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table
        ref="tableVNode"
        v-loading="loading"
        :data="tableData"
        :span-method="handleSpanMethod"
        max-height="630"
        border
        @select="handleSelect"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column align="center" label="权限分组" prop="group_name" />
        <el-table-column label="权限名称" prop="name" />
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted, onUnmounted, computed } from 'vue'
import type { IDataAuthInfo } from '@/api/role/index.interface'
import { getPermissions } from '@/api/role'
import cloneDeep from 'lodash/cloneDeep'
import type { TableInstance } from 'element-plus'

const defaultForm = (): { group_name: string[]; name: string } => ({
  group_name: [],
  name: ''
})

const props = withDefaults(
  defineProps<{
    title?: string
    permisstionIds: number[]
  }>(),
  {
    title: '分配数据权限'
  }
)

const emit = defineEmits(['update:permisstionIds'])

const form = ref(defaultForm())
const origin = ref<IDataAuthInfo[]>([])
const tableData = ref<IDataAuthInfo[]>([])
const tableVNode = ref<TableInstance>()

const currPermisstionIds = computed({
  get() {
    return props.permisstionIds
  },
  set(value: number[]) {
    emit('update:permisstionIds', value)
  }
})

const loading = ref(false)

const group_name_options = computed(() => {
  const arr = origin.value.map((v) => v.group_name)
  return Array.from(new Set(arr))
})

/** 查询指定数据权限 */
const query = () => {
  tableData.value = origin.value.filter((item) => {
    let filter1 = true
    let filter2 = true
    const reg = new RegExp(form.value.name)
    form.value.name && (filter1 = reg.test(item.name))
    form.value.group_name.length && (filter2 = form.value.group_name.includes(item.group_name))

    return filter1 && filter2
  })
  updatePermisstionIds()
}

const reset = () => {
  form.value = defaultForm()

  tableData.value = cloneDeep(origin.value)

  updatePermisstionIds()
}

const init = async () => {
  try {
    loading.value = true
    const { status, data } = await getPermissions()
    if (status === 200) {
      origin.value = cloneDeep(data)
      reset()
    }
  } finally {
    loading.value = false
  }
}

/** 更新权限 id 勾选状态 */
const updatePermisstionIds = () => {
  nextTick(() => {
    tableData.value.forEach((item) => {
      if (currPermisstionIds.value.includes(item.id)) {
        tableVNode.value?.toggleRowSelection(item, true)
      }
    })
  })
}

/** 处理 table 单选 */
const handleSelect = (arr: IDataAuthInfo[], row: IDataAuthInfo) => {
  const index = currPermisstionIds.value.findIndex((v) => v === row.id)

  if (index >= 0) {
    currPermisstionIds.value.splice(index, 1)
  } else {
    currPermisstionIds.value.push(row.id)
  }
}

/** 处理 table 全选 */
const handleSelectAll = (arr: IDataAuthInfo[]) => {
  if (arr.length) {
    const now_ids = arr.map((v) => v.id)
    currPermisstionIds.value = [...new Set([...currPermisstionIds.value, ...now_ids])]
  } else {
    tableData.value.forEach((v) => {
      const index = currPermisstionIds.value.findIndex((e) => e === v.id)
      if (index >= 0) currPermisstionIds.value.splice(index, 1)
    })
  }
}

/** 单元格合并方法 */
const handleSpanMethod = ({ row, rowIndex, columnIndex }: any) => {
  if (columnIndex === 1) {
    const preRow = tableData.value[rowIndex - 1]
    let nextRow = tableData.value[rowIndex + 1]
    let count = 1
    if (!preRow || preRow.group_name !== row.group_name) {
      while (nextRow && nextRow.group_name === row.group_name) {
        count++
        nextRow = tableData.value[rowIndex + count]
      }
      return {
        rowspan: count,
        colspan: 1
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0
      }
    }
  }
}

const empty = () => {
  form.value = defaultForm()
  tableData.value = []
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  empty()
})

defineExpose({
  init,
  reset,
  empty
})
</script>
