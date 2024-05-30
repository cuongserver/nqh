import App1 from "@scripts/apps/app1/App1.vue";
import { createApp } from "vue";
declare var globalThis: any;

globalThis.__VUE_OPTIONS_API__ = true;
globalThis.__VUE_PROD_DEVTOOLS__ = true;
globalThis.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = true;

globalThis.renderApp1 = (elementId: string) => {
  const app = createApp(App1);
  app.mount("#" + elementId);
};
