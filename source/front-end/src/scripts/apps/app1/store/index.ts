import { taskStoreModule } from "./tasks-store";
import { createStore } from "vuex";

export const creatApp1Store = () =>
  createStore({
    modules: {
      taskStoreModule,
    },
  });
