<template>
  <div class="hamburger-icon" :class="[{ 'is-active': isActive }]" @click="toggleClick">
    <svg-icon name="hamburger" font-size="20px" />
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    isActive: boolean
  }>(),
  {
    isActive: false
  }
)

const emit = defineEmits(['toggle-click'])

const toggleClick = () => {
  emit('toggle-click')
}
</script>

<style lang="scss" scoped>
.is-active {
  transform: rotate(180deg);
}

.hamburger-icon {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
</style>
