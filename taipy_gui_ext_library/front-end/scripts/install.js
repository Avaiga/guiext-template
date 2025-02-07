require("dotenv").config();
const { exec, execSync } = require("child_process");
const { existsSync, writeFileSync, appendFileSync } = require("fs");
const { sep } = require("path");

const fetchTaipyDir = () => {
    let pipenvPrefix = ""
    if (!process.env.VIRTUAL_ENV) {
	try {
	    execSync("pipenv --version");
	    pipenvPrefix = "pipenv run ";
	}
	catch {}
    }
    const locatePackage = (package) => {
	let desc = null;
	try {
	    desc = execSync(`${pipenvPrefix}pip show ${package}`, {stdio: [null,null,"ignore"]})
	} catch {};
	let location = null;
	let editableLocation = null;
	if (desc) {
	    desc.toString().split("\n").forEach(line => {
		if (line.startsWith("Location: ")) {
		    location = line.substring(10).trim();
		} else if (line.startsWith("Editable project location: ")) {
		    editableLocation = line.substring(27).trim();
		}
	    });
	}
	return editableLocation || location;
    }
    return locatePackage("taipy-gui") || locatePackage("taipy");
};

let taipyDir = process.env.TAIPY_DIR;
let taipyDirFetched = false;
if (!taipyDir) {
    taipyDir = fetchTaipyDir();
    taipyDirFetched = !!taipyDir;
}
if (!existsSync(taipyDir)) {
    message = taipyDir ? `Cannot find Taipy in '${taipyDir}'` : 'Cannot find the Taipy GUI installation directory';
    console.error(
        `${message}.\nMake sure TAIPY_DIR is set to the root directory of your Taipy installation.`
    );
    process.exit(1);
}
const taipyWebappDir = `${taipyDir}${sep}taipy${sep}gui${sep}webapp`;
if (!existsSync(taipyWebappDir)) {
    console.error(
        `Cannot find the Taipy GUI (${taipyWebappDir}) webapp directory.\nMake sure TAIPY_DIR is set to the root directory of your Taipy installation.`
    );
}
else {
    console.error(`Taipy GUI webapp was located in ${taipyWebappDir}.`);
}
// Save TAIPY_DIR for future runs
if (taipyDirFetched) {
    if (existsSync(".env")) {
        appendFileSync(".env", `\nTAIPY_DIR=${taipyDir}`);
    } else {
        writeFileSync(".env", `TAIPY_DIR=${taipyDir}`);
    }
}

const spinner = "|/-\\";
let i = 0;

let spinnerTimer;

exec(`npm i ${taipyWebappDir}`)
    .on("spawn", () => {
        spinnerTimer = setInterval(() => {
            process.stdout.write("Installing the Taipy GUI library... \r" + spinner[i++]);
            i = i % spinner.length;
        }, 150);
    })
    .on("exit", (code, signal) => {
        clearInterval(spinnerTimer);
        if (code === 0) {
            console.log("\nInstallation finished");
        } else {
            console.log(`\nInstallation failed (code ${code}, signal ${signal})`);
        }
    });
