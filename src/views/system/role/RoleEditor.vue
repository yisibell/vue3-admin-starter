<template>
  <el-drawer
    v-model="drawerVisible"
    :show-close="false"
    direction="rtl"
    size="90%"
    @opened="handleWhenOpen"
  >
    <template #header>
      <div class="d-flex justify-space-between">
        <div>{{ editingRow ? '编辑角色' : '新增角色' }}</div>
        <div>
          <el-button type="primary" :loading="submitLoading" @click="handleSubmit">提交</el-button>
          <el-button type="danger" @click="drawerVisible = false">关闭</el-button>
        </div>
      </div>
    </template>

    <div class="role-editor-container">
      <div class="role-editor__left">
        <el-card class="mb-16">
          <template #header>角色基础信息</template>
          <el-form ref="formVNode" :model="form" :rules="rules" label-width="90px">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="form.name" :maxlength="60" :show-word-limit="true" />
            </el-form-item>
            <el-form-item label="角色类型" prop="type">
              <el-select v-model="form.type" style="width: 100%">
                <el-option
                  v-for="v in role_types"
                  :key="v.value"
                  :label="v.label"
                  :value="v.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="order">
              <el-input-number v-model="form.order" style="width: 100%" />
            </el-form-item>
            <el-form-item label="角色描述" prop="description">
              <el-input v-model="form.description" :maxlength="200" />
            </el-form-item>
          </el-form>
        </el-card>
        <el-card>
          <template #header>分配菜单权限</template>
          <div v-loading="resourceTreeLoading">
            <el-tree
              ref="resourceTreeVNode"
              v-loading="resourceTreeLoading"
              :data="resourceTree"
              :props="{ label: 'name', children: 'sub' }"
              show-checkbox
              :default-expand-all="false"
              :expand-on-click-node="false"
              highlight-current
              node-key="id"
            >
              <template #default="{ node, data }">
                <div class="fs-14">
                  <span v-if="data.type === 3" class="color--warning pr-4">[页面级]</span>
                  <span :title="data.id">{{ node.label }}</span>
                </div>
              </template>
            </el-tree>
          </div>
        </el-card>
      </div>
      <div class="role-editor__right">
        <DataAuthTable ref="dataAuthTableVNode" v-model:permisstion-ids="form.permissions" />
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, nextTick } from 'vue'
import type { IRoleInfo } from '@/api/role/index.interface'
import { role_types } from '@/constants'
import { usePermissionStore } from '@/stores/permission'
import type { IRouteResourceInfo } from '@/api/resource/index.interface'
import { ElTree, ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { addRole, updateRole, getRoleById } from '@/api/role'
import DataAuthTable from './DataAuthTable.vue'

const defaultForm = (): Omit<IRoleInfo, 'id'> => ({
  name: '',
  description: '',
  type: 0,
  order: 0,
  permissions: [],
  resources: []
})

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    editingRow?: IRoleInfo | null
  }>(),
  {
    modelValue: false
  }
)

const emit = defineEmits(['update:modelValue', 'success'])

const drawerVisible = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  }
})

const formVNode = ref<FormInstance>()
const form = ref(defaultForm())
const rules = {
  name: [{ required: true, message: '请输入角色名称' }],
  type: [{ required: true, message: '请选择角色类型' }]
}

const PermissionStore = usePermissionStore()

const resourceTree = ref<IRouteResourceInfo[]>([])
const resourceTreeLoading = ref(false)
const resourceTreeVNode = ref<InstanceType<typeof ElTree>>()
const dataAuthTableVNode = ref<InstanceType<typeof DataAuthTable>>()

const init = async () => {
  try {
    resourceTreeLoading.value = true
    resourceTree.value = await PermissionStore.allResources()
  } finally {
    resourceTreeLoading.value = false
  }
}

const loading = ref(false)
const handleWhenOpen = async () => {
  try {
    loading.value = true
    if (props.editingRow?.id) {
      const { status, data } = await getRoleById(props.editingRow.id)
      if (status === 200) {
        form.value = Object.assign(defaultForm(), data)

        form.value.resources.forEach((id) => {
          resourceTreeVNode.value?.setChecked(id, true, false)
        })
      }
    } else {
      form.value = defaultForm()
      resourceTreeVNode.value?.setCheckedKeys([])
      dataAuthTableVNode.value?.empty()
    }

    nextTick(() => {
      dataAuthTableVNode.value?.init()
    })
  } finally {
    loading.value = false
  }
}

const getCheckedKeys = () => {
  const checkedKeys = resourceTreeVNode.value?.getCheckedKeys() || []
  const halfCheckedKeys = resourceTreeVNode.value?.getHalfCheckedKeys() || []

  return checkedKeys.concat(halfCheckedKeys) as number[]
}

const submitLoading = ref(false)
const handleSubmit = () => {
  formVNode.value?.validate(async (valid) => {
    if (valid) {
      try {
        submitLoading.value = true
        form.value.resources = getCheckedKeys()

        let res

        if (props.editingRow?.id) {
          res = await updateRole(props.editingRow.id, form.value)
        } else {
          res = await addRole(form.value)
        }

        const { status, data } = res

        if (status === 200) {
          ElMessage.success('操作成功!')
          drawerVisible.value = false
          emit('success', data)
        }
      } finally {
        submitLoading.value = false
      }
    }
  })
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.role-editor-container {
  display: flex;
}

.role-editor {
  &__left {
    width: 400px;
    margin-right: 14px;
  }

  &__right {
    flex: 1;
  }
}
</style>
