<template>
  <div
    class="hamburger-container"
    :class="[{ 'is-active': isActive, disabled }]"
    @click="toggleClick"
  >
    <svg-icon name="hamburger" font-size="20px" />
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    isActive?: boolean
    disabled?: boolean
  }>(),
  {
    isActive: false,
    disabled: false
  }
)

const emit = defineEmits(['toggle-click'])

const toggleClick = () => {
  if (props.disabled) return
  emit('toggle-click')
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  height: 100%;
  padding: 0 15px;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }

  &.is-active {
    transform: rotate(180deg);
  }

  &.disabled {
    cursor: default;
  }
}
</style>
