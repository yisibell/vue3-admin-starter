<template>
  <div class="dashboard-container">
    <div class="state-overview">
      <el-card class="state-overview__item" />
      <el-card class="state-overview__item" />
      <el-card class="state-overview__item" />
      <el-card class="state-overview__item" />
    </div>

    <div class="charts-overview">
      <div class="charts-overview__left">
        <el-card class="charts-overview__left__inner"></el-card>
      </div>
      <div class="charts-overview__right">
        <el-card class="charts-overview__right__inner mb-16"></el-card>
        <el-card class="charts-overview__right__inner"></el-card>
      </div>
    </div>

    <div class="work-progress">
      <el-card class="work-progress__item"></el-card>
      <el-card class="work-progress__item"></el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DashboardView'
})
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 16px;
  max-width: 1380px;
  margin: 0 auto;
}

.state-overview {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  &__item {
    flex: 1;
    margin-right: 16px;
    min-height: 120px;

    &:last-of-type {
      margin-right: 0;
    }
  }
}

.charts-overview {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  &__left {
    flex: 0.7;
    margin-right: 16px;

    &__inner {
      height: 420px;
    }
  }

  &__right {
    flex: 0.3;

    &__inner {
      height: 202px;
    }
  }
}

.work-progress {
  display: flex;
  justify-content: space-between;

  &__item {
    flex: 1;
    height: 280px;

    &:first-of-type {
      flex: 0.3;
      margin-right: 16px;
    }
  }
}
</style>
