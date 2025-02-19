const puppeteer = require("puppeteer-core");
const path = require("path");
const { execSync } = require("child_process");
const http = require("http");

function getChromeExecutable() {
  // If CHROME_PATH is set, try that first.
  if (process.env.CHROME_PATH) {
    try {
      execSync(`test -x ${process.env.CHROME_PATH}`);
      console.log(`Found executable at ${process.env.CHROME_PATH} from CHROME_PATH`);
      return process.env.CHROME_PATH;
    } catch (error) {
      console.error(`CHROME_PATH is set to ${process.env.CHROME_PATH} but is not executable.`);
    }
  }
  // Check common paths.
  const possiblePaths = [
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
    "/usr/bin/google-chrome"
  ];

  for (const p of possiblePaths) {
    try {
      execSync(`test -x ${p}`);
      console.log(`Found executable at ${p}`);
      return p;
    } catch (err) {
      // Not executable; continue.
    }
  }

  // Fallback: use the 'which' command.
  const commands = ["chromium-browser", "chromium", "google-chrome"];
  for (const cmd of commands) {
    try {
      const p = execSync(`which ${cmd}`).toString().trim();
      if (p) {
        console.log(`Found executable using which: ${p}`);
        return p;
      }
    } catch (err) {
      // Command not found; continue.
    }
  }

  throw new Error("No Chromium/Chrome executable found!");
}

(async () => {
  console.log("Launching headless browser using puppeteer-core...");

  const chromePath = getChromeExecutable();
  console.log("Using Chrome executable at:", chromePath);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chromePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  // Construct the file URL for your local HTML file.
  const filePath = path.join("file://", __dirname, "public", "index.html");
  console.log("Navigating to:", filePath);

  await page.goto(filePath, { waitUntil: "networkidle2" });
  console.log("Mining page loaded and running.");

  // You may add additional logic here if needed.
})();

// Start a minimal HTTP server to satisfy Render's port binding requirement.
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Mining is running.\n");
}).listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on port ${port}`);
});
