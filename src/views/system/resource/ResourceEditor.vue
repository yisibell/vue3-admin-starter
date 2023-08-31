<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :append-to-body="true"
    width="800px"
    @open="handleWhenOpen"
  >
    <el-form ref="formVNode" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="资源类型" prop="type">
        <SysResourceTypeSelect v-model="form.type" style="width: 50%" />
      </el-form-item>

      <el-form-item label="父节点" prop="parent_id">
        <el-cascader
          v-model="form.parent_id"
          :options="allResourcesOptions"
          :props="{
            checkStrictly: true,
            value: 'id',
            label: 'name',
            children: 'sub',
            emitPath: false
          }"
          clearable
          style="width: 50%"
        />
      </el-form-item>

      <el-form-item label="资源名称" prop="name">
        <el-input v-model="form.name" style="width: 50%" />
      </el-form-item>

      <template v-if="form.type === 3">
        <el-form-item label="权限标识" prop="node_name">
          <el-input v-model="form.node_name" style="width: 50%" /> </el-form-item
      ></template>

      <template v-else>
        <el-form-item label="资源图标" prop="icon">
          <SysIconsSelect v-model="form.icon" style="width: 50%" />
        </el-form-item>

        <el-form-item label="路由组件名" prop="route_component">
          <el-input
            v-model="form.route_component"
            placeholder="映射路由组件名"
            style="width: 50%"
          />
        </el-form-item>

        <el-form-item label="路由名称" prop="route_name">
          <el-input v-model="form.route_name" placeholder="与视图组件name同名" style="width: 50%" />
        </el-form-item>
        <el-form-item label="路由地址" prop="route_path">
          <el-input v-model="form.route_path" placeholder="二级目录不要填" style="width: 50%" />
          <div class="fs-12">
            TIPS:
            为了使三级菜单导航的视图组件缓存功能有效，当菜单深度达到3级时，2级目录的路由地址请保持为空，<br />
            这样最终生成的路由地址就会为2级：/a/b。 <br />
            而侧边菜单深度依然会保持3级。并且三级视图组件会成功被 keep-alive 处理。<br />
          </div>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" />
        </el-form-item>

        <el-form-item label="hidden" prop="route_hidden">
          <el-select v-model="form.route_hidden">
            <el-option
              v-for="v in bool_options"
              :key="v.value"
              :value="v.value"
              :label="v.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="alwaysShow" prop="route_always_show">
          <el-select v-model="form.route_always_show">
            <el-option
              v-for="v in bool_options"
              :key="v.value"
              :value="v.value"
              :label="v.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="noCache" prop="route_no_cache">
          <el-select v-model="form.route_no_cache">
            <el-option
              v-for="v in bool_options"
              :key="v.value"
              :value="v.value"
              :label="v.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="breadcrumb" prop="route_breadcrumb">
          <el-select v-model="form.route_breadcrumb">
            <el-option
              v-for="v in bool_options"
              :key="v.value"
              :value="v.value"
              :label="v.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleConfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { IRouteResourceInfo } from '@/api/resource/index.interface'
import SysResourceTypeSelect from '@/components/SysResourceTypeSelect/index.vue'
import type { CascaderOption, FormInstance } from 'element-plus'
import SysIconsSelect from '@/components/SysIconsSelect/index.vue'
import { bool_options } from '@/constants'
import { addResource, updateResource } from '@/api/resource'

const defaultForm = (): Omit<IRouteResourceInfo, 'id' | 'sub'> => ({
  parent_id: 0,
  name: '',
  type: 1,
  order: 0,
  node_name: '',
  route_name: '',
  route_path: '',
  route_component: '',
  route_hidden: 0,
  route_always_show: 0,
  icon: '',
  route_no_cache: 0,
  route_breadcrumb: 1
})

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    editingRow?: IRouteResourceInfo | null
    allResources: IRouteResourceInfo[]
  }>(),
  {
    modelValue: false,
    editingRow: null
  }
)

const title = computed(() => (props.editingRow ? `编辑资源` : '新增资源'))

const emit = defineEmits(['update:modelValue', 'success'])

const allResourcesOptions = computed(() => props.allResources as unknown as CascaderOption[])

const dialogVisible = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  }
})

const form = ref(defaultForm())
const formVNode = ref<FormInstance>()

const rules = computed(() => {
  return {
    type: [{ required: true, message: '请选择资源类型' }],
    name: [{ required: true, message: '请输入资源名称' }],
    route_component: [{ required: form.value.type !== 3, message: '请输入路由组件名' }],
    route_name: [{ required: form.value.type !== 3, message: '请输入路由名称' }],
    order: [{ required: form.value.type !== 3, message: '请输入排序值' }],
    node_name: [{ required: form.value.type === 3, message: '请输入权限标识' }]
  }
})

watch(
  () => form.value.route_component,
  (value) => {
    form.value.route_name = value
  }
)

const handleWhenOpen = () => {
  if (props.editingRow) {
    form.value = Object.assign(defaultForm(), props.editingRow)
  } else {
    form.value = defaultForm()
  }
}

const submitLoading = ref(false)
const handleConfirm = () => {
  formVNode.value?.validate(async (valid) => {
    if (valid) {
      try {
        submitLoading.value = true
        let res

        if (props.editingRow) {
          res = await updateResource(props.editingRow.id, form.value)
        } else {
          res = await addResource(form.value)
        }

        const { status, data } = res

        if (status === 200) {
          dialogVisible.value = false
          emit('success', data)
        }
      } finally {
        submitLoading.value = false
      }
    }
  })
}
</script>
