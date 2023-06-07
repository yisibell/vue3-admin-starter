<template>
  <div class="dashboard-container">
    <div>{{ $t('home_page') }} {{ i18n.t('home_page') }}</div>
    <div>
      <el-button type="primary">button</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

onMounted(() => {
  console.log(i18n)
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DashboardView'
})
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 16px;
}
</style>
