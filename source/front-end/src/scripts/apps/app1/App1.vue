<template>
  <div @click="handleClick">App1</div>
  <div class="dropdown" v-for="(item, index) in list">
    <button
      class="btn btn-secondary dropdown-toggle"
      type="button"
      :id="index.toString()"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Check Bootstrap
    </button>
    <ul class="dropdown-menu" :aria-labelledby="index.toString()">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import "bootstrap";

export default defineComponent({
  data() {
    return {
      list: [] as number[],
    };
  },
  mounted() {
    console.log("App1");
  },
  methods: {
    handleClick() {
      this.list.push(1);
    },
  },
});
</script>
<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
</style>
