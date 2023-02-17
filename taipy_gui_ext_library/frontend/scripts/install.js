require("dotenv").config();
const { exec } = require("child_process");
const TAIPY_GUI_DIR = process.env.TAIPY_GUI_DIR;

let spinner = "|/-\\";
let i = 0;

let spinnerTimer;

exec(`npm i && npm i ${TAIPY_GUI_DIR}/taipy/gui/webapp`)
  .on("spawn", () => {
    spinnerTimer = setInterval(() => {
      process.stdout.write("Installing Taipy GUI webapp... \r" + spinner[i++]);
      i = i % spinner.length;
    }, 150);
  })
  .on("exit", (code) => {
    clearInterval(spinnerTimer);
    if (code === 0) {
      console.log("\nInstallation finished");
    } else {
      console.log(`\nInstallation failed (code ${code})`);
    }
  });
