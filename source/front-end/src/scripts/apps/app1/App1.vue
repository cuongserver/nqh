<template>
  <div class="container">
    <div class="border rounded p-3 my-3">
      <h1 class="fs-4">Company News Here</h1>
      <p>Lorem ipsum .....</p>
    </div>
    <RouterView class="mt-3" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import "bootstrap";
import TasksView from "@scripts/apps/app1/views/TasksView.vue";

export default defineComponent({
  components: {
    TasksView,
  },
});
</script>
<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";

#app {
  min-height: 100vh;
}
</style>
