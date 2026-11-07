const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const dir = process.argv[2];
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto("file:///" + path.join(dir, "informe.html").split(path.sep).join("/"));
  await p.pdf({
    path: path.join(dir, "informe.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: "<div></div>",
    footerTemplate: '<div style="font-size:10px;width:100%;text-align:right;padding-right:25mm;font-family:Times New Roman"><span class="pageNumber"></span></div>',
  });
  await b.close();
  console.log("pdf ok");
})();
