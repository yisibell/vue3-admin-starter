<template>
  <div class="app-main">
    <el-scrollbar>
      <RouterView />
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  // 减去 navbar 和 tags-view 的高度
  height: calc(100vh - calc(34px + 50px));
}
</style>
