import {
  createWebHistory,
  createRouter,
  RouteRecordSingleView,
} from "vue-router";
import TasksView from "@scripts/apps/app1/views/TasksView.vue";
import FallbackView from "@scripts/apps/app1/views/FallbackView.vue";

const routes: RouteRecordSingleView[] = [
  {
    path: "/tasks",
    component: TasksView,
  },
  {
    path: "/:pathMatch(.*)",
    component: FallbackView,
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
