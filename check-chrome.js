const { execSync } = require("child_process");

const commands = ["chromium-browser", "chromium", "google-chrome"];

commands.forEach(cmd => {
  try {
    const p = execSync(`which ${cmd}`).toString().trim();
    console.log(`${cmd} found at: ${p}`);
  } catch (err) {
    console.error(`${cmd} not found.`);
  }
});
