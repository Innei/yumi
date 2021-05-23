<template>
  <span class="text-6xl">{{ a }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return { a: 1 }
  },
})
</script>
