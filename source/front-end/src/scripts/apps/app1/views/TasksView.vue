<template>
  <TaskModal />
  <RouterLink to="/">Go to Home</RouterLink>
  <div class="my-3">
    <button class="btn btn-primary" @click="handleAddNewBtnClick">
      Add New Task
    </button>
  </div>
  <div class="mb-3 border rounded p-2">
    <label class="form-label">Filter by status:</label>
    <div class="form-check" v-for="(status, i) in validStatuses">
      <input
        class="form-check-input"
        type="checkbox"
        :value="status"
        :id="`checkbox${i}`"
        :checked="filters.includes(status)"
        @click="handleFilterCheck(status)"
      />
      <label class="form-check-label" :for="`checkbox${i}`">
        {{ status }}
      </label>
    </div>
    <div class="mt-3">
      <button class="btn btn-primary" @click="handleApplyFilterClick">
        Apply Filter
      </button>
    </div>
  </div>
  <Table :columns="columns" :data="tasks" @rowClick="handleRowClick" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Table, { TableColumn } from "@scripts/common/components/Table.vue";
import { Task } from "@scripts/common/types";
import TaskModal from "@scripts/apps/app1/components/TaskModal.vue";
import { validStatuses } from "@scripts/apps/app1/utils/constants";

export default defineComponent({
  components: { Table, TaskModal },
  computed: {
    ...mapGetters("taskStoreModule", ["tasks", "filters"]),
    validStatuses() {
      return validStatuses;
    },
    columns(): TableColumn[] {
      return [
        { key: "id", label: "Id" },
        {
          key: "desc",
          label: "Description",
        },
        {
          key: "status",
          label: "Status",
        },
        {
          key: "createdAt",
          label: "Created At",
          transformValue: (val) => {
            return new Date(val).toISOString();
          },
        },
      ];
    },
  },
  methods: {
    ...mapActions("taskStoreModule", ["getTasks", "createOrUpdateTask"]),
    ...mapMutations("taskStoreModule", [
      "setCurrentTask",
      "setUseCreateTaskMode",
      "setFilters",
    ]),
    async handleApplyFilterClick() {
      this.getTasks(this.filters);
    },
    async handleRowClick(rowData: Task) {
      this.setCurrentTask(rowData);
    },
    handleAddNewBtnClick() {
      this.setUseCreateTaskMode(true);
    },
    handleFilterCheck(status: string) {
      if (this.filters.includes(status)) {
        const newFilter = this.filters.filter((val: string) => val !== status);
        this.setFilters(newFilter);
      } else {
        this.setFilters([...this.filters, status]);
      }
    },
  },
  mounted() {
    this.getTasks(this.filters);
  },
  beforeUnmount() {
    this.setFilters([...validStatuses]);
  },
});
</script>
