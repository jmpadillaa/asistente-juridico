const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const dir = process.argv[2];
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file:///" + path.join(dir, "infografia.html").replace(/\\/g, "/"));
  await page.pdf({ path: path.join(dir, "infografia.pdf"), width: "420mm", height: "297mm", printBackground: true, preferCSSPageSize: true });
  await page.goto("file:///" + path.join(dir, "nota.html").replace(/\\/g, "/"));
  await page.pdf({
    path: path.join(dir, "nota.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: "<div></div>",
    footerTemplate: '<div style="font-size:9px;width:100%;text-align:center;font-family:Times New Roman"><span class="pageNumber"></span></div>',
  });
  await browser.close();
  console.log("pdf ok");
})();
