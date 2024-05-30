<template>
  <div @click="handleClick">App1</div>
  <button @click="handleClick2">ABC</button>
  <!-- <div class="dropdown" v-for="(item, index) in tasks">
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
  </div> -->
  <Table>
    <div></div>
    <div></div>
    <div></div>
  </Table>
  {{ tasks }}
</template>
<script lang="ts">
import { defineComponent } from "vue";
import "bootstrap";
import { createTask } from "@scripts/common/utils/api";
import { mapActions, mapGetters } from "vuex";
import Table from "@scripts/common/components/Table.vue";

export default defineComponent({
  components: { Table },

  data() {
    return {
      list: [] as number[],
    };
  },
  computed: {
    ...mapGetters("taskStoreModule", ["tasks", "currentTask"]),
  },
  methods: {
    ...mapActions("taskStoreModule", ["getTasks"]),
    async handleClick() {
      const response = await createTask({
        desc: "AVC",
      });
    },
    handleClick2() {
      this.getTasks([]);
    },
  },
});
</script>
<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
</style>
