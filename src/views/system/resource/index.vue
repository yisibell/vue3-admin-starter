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
      <el-tree
        :data="tableData"
        :props="{
          label: 'name',
          children: 'sub'
        }"
      >
        <template #default="{ data }">
          <div class="d-flex justify-space-between" style="width: 100%">
            <div class="mr-36 flex-10">
              <ResourceNode :data="data" />
            </div>

            <div class="">
              <el-button type="primary" size="small" circle @click.stop="handleEdit(data)">
                <el-icon><Edit /></el-icon>
              </el-button>
              <el-button type="danger" size="small" circle @click.stop="handleDel(data)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
          </div>
        </template>
      </el-tree>
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
import ResourceEditor from './ResourceEditor.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { usePermissionStore } from '@/stores/permission'
import ResourceNode from './ResourceNode.vue'

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
