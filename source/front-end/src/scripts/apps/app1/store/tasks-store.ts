import { CreateOrUpdateTaskRequestModel, Task } from "@scripts/common/types";
import {
  createOrUpdateTask,
  deleteTask,
  getTasks,
} from "@scripts/apps/app1/utils/api";
import { ActionContext } from "vuex";
import { validStatuses } from "@scripts/apps/app1/utils/constants";

interface State {
  tasks: Task[];
  currentTask?: Task;
  useCreateTaskMode: boolean;
  filters: string[];
}

const state: () => State = () => ({
  tasks: [],
  useCreateTaskMode: false,
  filters: [...validStatuses],
});

const getters = {
  tasks(state: State) {
    //return state.tasks.filter((s) => state.filters.includes(s.status));
    return [...state.tasks];
  },
  currentTask(state: State) {
    return state.currentTask;
  },
  useCreateTaskMode(state: State) {
    return state.useCreateTaskMode;
  },
  filters(state: State) {
    return [...state.filters];
  },
};

const mutations = {
  setTasks(state: State, payload: Task[]) {
    state.tasks = [...payload];
  },
  setCurrentTask(state: State, currentTask?: Task) {
    state.currentTask = currentTask ? { ...currentTask } : undefined;
  },
  setUseCreateTaskMode(state: State, status: boolean) {
    state.useCreateTaskMode = status;
  },
  setFilters(state: State, filters: string[]) {
    state.filters = [...filters];
  },
};

const actions = {
  async getTasks({ commit }: ActionContext<State, {}>, payload: string[]) {
    try {
      const data = await getTasks(payload);
      if (!data) commit("setTasks", []);
      commit("setTasks", data?.result);
    } catch {
      commit("setTasks", []);
    }
  },

  async createOrUpdateTask(
    { commit, state }: ActionContext<State, {}>,
    payload: CreateOrUpdateTaskRequestModel
  ) {
    const data = await createOrUpdateTask(payload);

    if (
      data &&
      (
        data as {
          success: boolean;
        }
      ).success
    ) {
      const _tasks = [...state.tasks];
      const task = _tasks.find((item) => item.id === payload.id);
      if (task) {
        task.desc = payload.desc;
        task.status = payload.status ?? task.status;
      }
      commit(
        "setTasks",
        _tasks.filter((s) => state.filters.includes(s.status))
      );
      return;
    }

    if (data) {
      if (state.filters.includes((data as Task).status))
        commit("setTasks", [...state.tasks, data]);
    }
  },
  async deleteTask(
    { commit, state }: ActionContext<State, {}>,
    payload: string
  ) {
    const data = await deleteTask(payload);
    if (data) {
      const _tasks = state.tasks.filter((task) => task.id !== payload);
      commit("setTasks", _tasks);
    }
  },
};

export const taskStoreModule = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
