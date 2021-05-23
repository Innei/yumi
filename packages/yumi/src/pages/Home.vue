<template>
  <div class="">{{ count }}</div>
</template>

<script lang="ts">
import { useInjector } from '../hooks/use-deps-injection'
import { defineComponent, inject } from 'vue'
import { foo } from '../App.vue'
export default defineComponent({
  setup() {
    const count = useInjector(foo)

    return { count: count.count }
  },
})
</script>
