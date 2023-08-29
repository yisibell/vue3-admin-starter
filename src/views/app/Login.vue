<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <el-card>
        <div class="login-card-header">系统登录</div>

        <el-form ref="formVNode" :model="form" :rules="rules" size="large">
          <el-form-item prop="username">
            <el-input v-model="form.username">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" show-password>
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              style="width: 100%"
              :loading="loading"
              @click="handleLogin"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type FormInstance, ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { userLogin } from '@/api/user'
import { useUserStore } from '@/stores/user'
import type { LocationQueryRaw } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const redirectPath = computed(() => {
  return route.query.redirect as string
})

const redirectQuery = computed(() => {
  return getRedirectQuery(route.query)
})

const form = ref({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const formVNode = ref<FormInstance>()

const { setToken } = useUserStore()

const loading = ref(false)
const handleLogin = () => {
  formVNode.value?.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        const { status, data, message } = await userLogin(form.value)
        if (status === 200) {
          setToken(data)

          router.push({
            path: redirectPath.value || '/',
            query: redirectQuery.value
          })
        } else {
          ElMessage({
            message,
            type: 'error'
          })
        }
      } finally {
        loading.value = false
      }
    }
  })
}

const getRedirectQuery = (query: LocationQueryRaw) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {} as LocationQueryRaw)
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginView'
})
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100vh;
}

.login-form-wrapper {
  width: 500px;
  position: absolute;
  left: calc(50% - 250px);
  top: 200px;
}

.login-card-header {
  padding: 16px;
  text-align: center;
  font-size: 20px;
}
</style>
