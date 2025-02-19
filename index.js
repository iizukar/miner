const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  console.log("Launching headless browser...");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  
  const page = await browser.newPage();
  
  // Construct the file URL for the local HTML file
  const filePath = path.join("file://", __dirname, "public", "index.html");
  await page.goto(filePath, { waitUntil: "networkidle2" });
  
  console.log("Mining page loaded and running.");
  
  // Keep the process running indefinitely.
  // Optionally, you can log status or catch errors periodically.
})();
