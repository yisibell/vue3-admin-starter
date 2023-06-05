<template>
  <div class="app-main">
    <el-scrollbar>
      <RouterView />
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  height: calc(100vh - 50px);
}
</style>
