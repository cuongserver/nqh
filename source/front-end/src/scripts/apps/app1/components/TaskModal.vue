<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header py-2">
          <h1 class="modal-title fs-5" id="modalLabel">
            <template v-if="currentTaskData"
              ><b>Task ID: </b>{{ currentTaskData.id }}</template
            >
            <template v-if="useCreateTaskMode"
              ><b>Create New Task </b></template
            >
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3" v-if="currentTaskData">
            <b>Created At: </b
            >{{ new Date(currentTaskData.createdAt).toISOString() }}
          </div>
          <div class="mb-3" v-if="currentTaskData">
            <label for="taskDescription1" class="form-label"
              >Task Description:</label
            >
            <textarea
              class="form-control"
              id="taskDescription1"
              rows="3"
              v-model="currentTaskData!.desc"
              style="resize: none"
            ></textarea>
          </div>
          <div class="mb-3" v-if="useCreateTaskMode">
            <label for="taskDescription2" class="form-label"
              >Task Description:</label
            >
            <textarea
              class="form-control"
              id="taskDescription2"
              rows="3"
              v-model="currentTaskDataForCreate.desc"
              style="resize: none"
            ></textarea>
          </div>
          <div class="mb-3" v-if="currentTaskData">
            <label class="form-label">Task Status:</label>
            <div class="form-check" v-for="(statusValue, i) in validStatuses">
              <input
                class="form-check-input"
                type="radio"
                name="statusRadio"
                :id="`statusRadio${i}`"
                :value="statusValue"
                :checked="currentTaskData.status === statusValue"
                @click="handleRadioClick(statusValue)"
              />
              <label class="form-check-label" :for="`statusRadio${i}`">
                {{ statusValue }}
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer py-2">
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="handleSave"
          >
            Save
          </button>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            v-if="currentTaskData"
            @click="handleDelete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { CreateOrUpdateTaskRequestModel, Task } from "@scripts/common/types";
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Modal } from "bootstrap";
import { validStatuses } from "@scripts/apps/app1/utils/constants";
export default defineComponent({
  computed: {
    ...mapGetters("taskStoreModule", ["currentTask", "useCreateTaskMode"]),
    validStatuses() {
      return validStatuses;
    },
  },
  data() {
    return {
      currentTaskData: undefined as Task | undefined,
      modal: undefined as Modal | undefined,
      currentTaskDataForCreate: {
        desc: "",
      },
    };
  },
  mounted() {
    if (!this.$refs.modalRef) return;
    this.modal = new Modal(this.$refs.modalRef as Element);
    (this.$refs.modalRef as Element).addEventListener(
      "hide.bs.modal",
      this.handleModalHide
    );
  },
  methods: {
    ...mapActions("taskStoreModule", ["createOrUpdateTask", "deleteTask"]),
    ...mapMutations("taskStoreModule", [
      "setCurrentTask",
      "setUseCreateTaskMode",
    ]),
    async handleSave() {
      if (!this.useCreateTaskMode) {
        await this.createOrUpdateTask({
          id: this.currentTaskData?.id,
          desc: this.currentTaskData?.desc,
          status: this.currentTaskData?.status,
        } as CreateOrUpdateTaskRequestModel);
        this.modal?.hide();
        return;
      }
      await this.createOrUpdateTask({
        desc: this.currentTaskDataForCreate.desc,
      } as CreateOrUpdateTaskRequestModel);
      this.modal?.hide();
    },
    handleRadioClick(val: string) {
      if (this.currentTaskData) this.currentTaskData.status = val;
    },
    handleModalHide() {
      this.currentTaskDataForCreate.desc = "";
      this.currentTaskData = undefined;
      this.setUseCreateTaskMode(false);
    },
    async handleDelete() {
      await this.deleteTask(this.currentTaskData?.id);
      this.modal?.hide();
    },
  },
  watch: {
    currentTask(newData, _oldData) {
      if (!newData) this.modal?.hide();
      this.currentTaskData = { ...newData };
      this.modal?.show();
    },
    useCreateTaskMode(newData: boolean, _oldData: boolean) {
      if (!newData) return;
      this.currentTaskDataForCreate.desc = "";
      this.modal?.show();
    },
  },
  beforeUnmount() {
    (this.$refs.modalRef as Element).removeEventListener(
      "hide.bs.modal",
      this.handleModalHide
    );
  },
});
</script>
