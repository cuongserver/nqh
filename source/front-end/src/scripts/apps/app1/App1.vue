<template>
  <div>App1</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  mounted() {
    console.log("App1");
  },
});
</script>
<style lang="scss">
html,
body {
  color: red;
}
</style>
