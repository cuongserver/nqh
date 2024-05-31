import App1 from "@scripts/apps/app1/App1.vue";
import { createApp } from "vue";
import { creatApp1Store } from "@scripts/apps/app1/store";
import { router } from "@scripts/apps/app1/router";

export const configureApp1 = () => {
  const app = createApp(App1);
  const store = creatApp1Store();
  app.use(store);
  app.use(router);
  return app;
};
