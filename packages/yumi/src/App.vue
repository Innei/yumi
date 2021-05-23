<template>
  <div>
    <router-link to="/">Home</router-link>|
    <router-link to="/page">Page</router-link>|
    <p>
      <button @click="count++">+1</button>
    </p>
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import { useProvider } from './hooks/use-deps-injection'
import { store } from './store'
export function foo() {
  const count = ref(1)
  return { count }
}
export default defineComponent({
  setup() {
    // provide('store', store)

    const d = useProvider(foo)
    return {
      count: d.count,
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
