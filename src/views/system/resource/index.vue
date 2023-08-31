<template>
  <div class="view-container" v-loading="loading">
    <el-card class="mb-16">
      <el-form :model="form" :inline="true">
        <el-form-item label="资源类型">
          <SysResourceTypeSelect v-model="form.type" />
        </el-form-item>
        <el-form-item label="资源名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="资源ID">
          <el-input v-model="form.id" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button type="danger" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <div class="d-flex justify-end">
        <el-button type="primary" @click="handleAdd">新增资源</el-button>
      </div>
    </el-card>

    <el-card>
      <el-table
        :data="tableData"
        :tree-props="{
          children: 'sub'
        }"
        row-key="id"
        :border="true"
        style="width: 100%"
      >
        <el-table-column fixed="left" prop="name" label="资源名称" align="left" width="210" />

        <el-table-column prop="type" label="资源类型" width="90" align="center">
          <template #default="{ row }">{{ filterResourceTypeLabel(row.type) }}</template>
        </el-table-column>

        <el-table-column prop="icon" label="资源图标" align="center" width="90">
          <template #default="{ row }">
            <!-- <svg-icon :name="row.icon" /> -->
            {{ row.icon }}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="id" align="center" width="60" />
        <el-table-column prop="order" label="排序" align="center" width="60" />
        <el-table-column prop="node_name" label="权限标识" align="center" width="100" />
        <el-table-column prop="route_name" label="路由名称" align="center" width="100" />
        <el-table-column prop="route_path" label="路由地址" align="center" />
        <el-table-column prop="route_component" label="路由组件名" align="center" width="100" />
        <el-table-column prop="route_hidden" label="hidden" align="center" width="80">
          <template #default="{ row }">
            {{ filterBoolToText(row.route_hidden) }}
          </template>
        </el-table-column>
        <el-table-column prop="route_no_cache" label="noCache" align="center" width="100">
          <template #default="{ row }">
            {{ filterBoolToText(row.route_no_cache) }}
          </template>
        </el-table-column>
        <el-table-column prop="route_breadcrumb" label="breadcrumb" align="center" width="110">
          <template #default="{ row }">
            {{ filterBoolToText(row.route_breadcrumb) }}
          </template>
        </el-table-column>
        <el-table-column prop="route_always_show" label="alwaysShow" align="center" width="110">
          <template #default="{ row }">
            {{ filterBoolToText(row.route_always_show) }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="130" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button type="danger" size="small" @click="handleDel(row)">
              <el-icon><Delete /></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <ResourceEditor
      v-model="resourceEditorVisible"
      :editing-row="editingRow"
      :all-resources="allResources"
      @success="handleRefresh"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { IGetAllResourceParams, IRouteResourceInfo } from '@/api/resource/index.interface'
import SysResourceTypeSelect from '@/components/SysResourceTypeSelect/index.vue'
import { getAllResource, delResource } from '@/api/resource'
import { paramsVerify } from '@/utils'
import { filterResourceTypeLabel, filterBoolToText } from '@/filters'
import ResourceEditor from './ResourceEditor.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { usePermissionStore } from '@/stores/permission'

defineOptions({
  name: 'SystemResource'
})

const defaultForm = (): IGetAllResourceParams => ({
  type: '',
  id: '',
  name: ''
})

const form = ref(defaultForm())

const tableData = ref<IRouteResourceInfo[]>([])
const loading = ref(false)
const getTableData = async () => {
  try {
    loading.value = true
    const { status, data } = await getAllResource(paramsVerify(form.value))
    if (status === 200) {
      tableData.value = data
    }
  } finally {
    loading.value = false
  }
}

const PermissionStore = usePermissionStore()

const allResources = ref<IRouteResourceInfo[]>([])
const cacheAllResources = async () => {
  allResources.value = await PermissionStore.allResources({ force: true })
}

const handleQuery = () => {
  getTableData()
}

const handleReset = () => {
  form.value = defaultForm()
  getTableData()
}

const handleRefresh = () => {
  handleQuery()
  cacheAllResources()
}

const resourceEditorVisible = ref(false)
const editingRow = ref<IRouteResourceInfo | null>(null)

const handleAdd = () => {
  resourceEditorVisible.value = true
  editingRow.value = null
}

const handleEdit = (row: IRouteResourceInfo) => {
  resourceEditorVisible.value = true
  editingRow.value = row
}

const handleDel = (row: IRouteResourceInfo) => {
  ElMessageBox.confirm('确定要删除吗?', {
    title: '温馨提示',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(async () => {
    try {
      loading.value = true
      const { status } = await delResource(row.id)
      if (status === 200) {
        ElMessage.success('删除成功!')
        getTableData()
      }
    } finally {
      loading.value = false
    }
  })
}

onMounted(() => {
  handleQuery()
  cacheAllResources()
})
</script>
