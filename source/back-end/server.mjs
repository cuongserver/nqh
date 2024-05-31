//@ts-check
import express from "express";
import { createRequire } from "module";

import todoRouter from "./routes/task.mjs";

const require = createRequire(import.meta.url);
const staticDir = process.env.STATIC_DIR || "./fe-dist";

const server = express();
server.use(express.static(staticDir));

const manifest = require(`${staticDir}/manifest.json`);

server.use(todoRouter);

server.get("/*", async (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    	<link rel="icon" href="data:,">
      <link rel="stylesheet" href="${manifest["app1-pkg.css"]}"/>
    <body>
      <div id="app"></div>
      <script src="${manifest["runtime.js"]}"></script>
      <script src="${manifest["vendors.js"]}"></script>
      <script src="${manifest["app1-pkg.js"]}"></script>
      <script>
        renderApp1("app");
      </script>
    </body>
    </html> 
    `);
});

server.listen(5753, () => {
  console.log("Server is listening to port 5753");
});
