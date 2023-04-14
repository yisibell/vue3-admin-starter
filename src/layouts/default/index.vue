<template>
  <div class="layout-default">
    <el-container>
      <el-aside width="200px">
        <SideMenu />
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideMenu from './SideMenu.vue'

export default defineComponent({
  name: 'LayoutDefault',
  components: {
    SideMenu
  }
})
</script>

<style lang="scss" scoped>
.layout-default {
  min-height: 100vh;
}
</style>
