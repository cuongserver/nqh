<template>
  <RouterLink to="/tasks">Go to Tasks Page</RouterLink>
  <div>
    You are viewing page
    {{ $route.fullPath === "/" ? "Home" : $route.fullPath }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
