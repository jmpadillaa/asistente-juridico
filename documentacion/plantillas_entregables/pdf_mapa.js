const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const dir = process.argv[2];
  const b = await chromium.launch();
  const p = await b.newPage();
  for (const n of ["mapa", "notas"]) {
    await p.goto("file:///" + path.join(dir, n + ".html").split(path.sep).join("/"));
    await p.pdf({ path: path.join(dir, n + ".pdf"), printBackground: true, preferCSSPageSize: true });
  }
  await b.close();
  console.log("pdf ok");
})();
