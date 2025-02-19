const puppeteer = require("puppeteer-core");
const path = require("path");

(async () => {
  console.log("Launching headless browser using puppeteer-core...");

  // Adjust executablePath to match the installed Chromium/Chrome on Render.
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/chromium-browser", // Change this if necessary.
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  
  const page = await browser.newPage();
  
  // Construct the file URL for the local HTML file.
  const filePath = path.join("file://", __dirname, "public", "index.html");
  await page.goto(filePath, { waitUntil: "networkidle2" });
  
  console.log("Mining page loaded and running.");

  // The process will keep running. Add error handling or logging as needed.
})();
