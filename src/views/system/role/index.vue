<template>
  <div class="view-container" v-loading="loading">
    <el-card class="mb-16">
      <el-form :model="form" :inline="true">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="角色类型" prop="type">
          <el-select v-model="form.type">
            <el-option
              v-for="v in role_types"
              :key="v.value"
              :label="v.label"
              :value="v.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="d-flex justify-end">
        <el-button type="primary" @click="handleAdd">新增角色</el-button>
      </div>
    </el-card>

    <el-card>
      <el-table :data="tableData" max-height="650px" border>
        <el-table-column label="序号" type="index" align="center" width="100" />
        <el-table-column label="角色ID" prop="id" align="center" width="120" />
        <el-table-column label="角色名称" prop="name" align="center" width="180" />
        <el-table-column label="角色描述" prop="description" align="center" />
        <el-table-column label="操作" align="center" width="160">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="small" plain @click="handleDel(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div class="d-flex justify-end py-16">
      <el-pagination
        v-model:current-page="form.page"
        v-model:page-size="form.page_size"
        :total="total"
        layout="total,sizes,pager"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>

    <RoleEditor v-model="editorVisible" :editing-row="editingRow" @success="getTableData" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getRoles, deleteRole } from '@/api/role'
import type { IGetRolesParams, IRoleInfo } from '@/api/role/index.interface'
import { role_types } from '@/constants'
import { paramsVerify } from '@/utils'
import RoleEditor from './RoleEditor.vue'
import { ElMessageBox, ElMessage } from 'element-plus'

defineOptions({
  name: 'SystemRole'
})

const defaultForm = (): IGetRolesParams => ({
  name: '',
  type: '',
  page: 1,
  page_size: 10
})

const form = ref(defaultForm())

const loading = ref(false)
const total = ref(0)
const tableData = ref<IRoleInfo[]>([])
const getTableData = async () => {
  try {
    loading.value = true
    const params = paramsVerify(form.value)

    const { status, data } = await getRoles(params)
    if (status === 200) {
      tableData.value = data.data
      total.value = data.total
    }
  } finally {
    loading.value = false
  }
}

const handleQuery = () => {
  form.value.page = 1
  getTableData()
}

const handleCurrentChange = (index: number) => {
  form.value.page = index
  getTableData()
}

const handleSizeChange = (size: number) => {
  form.value.page_size = size
  getTableData()
}

const editingRow = ref<IRoleInfo | null>(null)
const editorVisible = ref(false)
const handleAdd = () => {
  editorVisible.value = true
  editingRow.value = null
}

const handleEdit = (row: IRoleInfo) => {
  editorVisible.value = true
  editingRow.value = row
}

const handleDel = (row: IRoleInfo) => {
  ElMessageBox.confirm('确定要删除吗?', {
    title: '温馨提示'
  }).then(async () => {
    try {
      loading.value = true
      const { status } = await deleteRole(row.id)
      if (status === 200) {
        ElMessage.success('删除成功!')
        handleQuery()
      }
    } finally {
      loading.value = false
    }
  })
}

onMounted(() => {
  handleQuery()
})
</script>
