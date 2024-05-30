import { Task } from "@scripts/common/types";
import { getTasks } from "@scripts/common/utils/api";
import { ActionContext } from "vuex";

interface State {
  tasks: Task[];
  currentTask?: Task;
}

const state: () => State = () => ({
  tasks: [],
});

const getters = {
  tasks(state: State) {
    return state.tasks;
  },
  currentTask(state: State) {
    return state.currentTask;
  },
};

const mutations = {
  setTasks(state: State, payload: Task[]) {
    state.tasks = [...payload];
  },
  setCurrentTask(state: State, currentTask?: Task) {
    state.currentTask = currentTask ? { ...currentTask } : undefined;
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
};

export const taskStoreModule = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
