<template>
  <div class="layout-default">
    <el-container>
      <el-aside width="200px">
        <SideMenu />
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <AppMain />
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideMenu from './SideMenu.vue'
import AppMain from './AppMain.vue'

export default defineComponent({
  name: 'LayoutDefault',
  components: {
    SideMenu,
    AppMain
  }
})
</script>

<style lang="scss" scoped>
.layout-default {
  min-height: 100vh;
}
</style>
