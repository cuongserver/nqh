import expesss from "express";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const server = expesss();
server.use(expesss.static(path.resolve(process.env.STATIC_DIR)));

const manifest = require(`${process.env.STATIC_DIR}/manifest.json`);

server.get("/", async (_req, res) => {
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
