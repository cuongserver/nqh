<template>
  <button @click="click">Tab-le</button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  mounted() {
    console.log(this.$children);
  },
  methods: {
    click() {
      console.log(this);
    },
  },
});
</script>
