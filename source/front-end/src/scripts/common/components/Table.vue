<template>
  <div v-if="!columns || columns.length === 0 || !data || data.length === 0">
    No data
  </div>
  <div class="overflow-y-auto">
    <table
      v-if="!!columns && columns.length && !!data && data.length"
      class="table table-striped table-hover"
    >
      <thead>
        <tr>
          <th v-for="(col, i) in columns" :scope="i === 0 ? 'col' : undefined">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in data"
          @click="rowClick(item)"
          role="button"
          :aria-label="`Click row to edit or delete item with id ${item.id}`"
          :title="`Click row to edit or delete item with id ${item.id}`"
        >
          <template v-for="(col, i) in columns">
            <th v-if="i === 0" scope="row" class="fw-normal">
              {{
                col.transformValue
                  ? col.transformValue((item as any)[col.key])
                  : (item as any)[col.key]
              }}
            </th>
            <td v-if="i !== 0">
              {{
                col.transformValue
                  ? col.transformValue((item as any)[col.key])
                  : (item as any)[col.key]
              }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Task } from "@scripts/common/types";

export interface TableColumn {
  key: string;
  label: string;
  transformValue?: (val: any) => string;
}

export default defineComponent({
  props: {
    columns: {
      type: Object as PropType<TableColumn[]>,
    },
    data: {
      type: Object as PropType<Task[]>,
    },
  },
  methods: {
    rowClick(rowData: Task) {
      this.$emit("rowClick", rowData);
    },
  },
});
</script>
