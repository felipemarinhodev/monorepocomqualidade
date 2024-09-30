import { execSync } from "child_process";
import fs from "fs";

const diffChangedFiles = execSync("git diff --name-only HEAD^..HEAD", {
  encoding: "utf-8"
}).split("\n");

const changedPackageNames = diffChangedFiles
  // 1 - Precisamos ter os paths dos package JSONs
  .map((path) => {
    const [workspace, packageFolder] = path.split("/");
    if (workspace !== "apps" && workspace !== "commons") return null;
    return `${workspace}/${packageFolder}/package.json`;
  })
  // 1.1 - Remover os valores `nulls`
  .filter(Boolean)
  // 2 - Podemos ter algum duplicado, precismos remover os duplicados
  .filter((pathToPackageJSON, index, arr) => {
    return arr.indexOf(pathToPackageJSON) === index;
  })
  // 3 - Ler os arquivos `package.json` e pegar o nome dentro do package JSON 
  .reduce((_changePackageNames: string[], pathToPackageJSON: string | null) => {
    if (pathToPackageJSON) {
      const packageJSON = JSON.parse(fs.readFileSync(pathToPackageJSON, {
        encoding: "utf-8"
      }));
      const packageName = packageJSON.name;
      return [
        ..._changePackageNames,
        packageName
      ]
    }
return _changePackageNames;
  }, [] as string[]);

const workspacesFlags = changedPackageNames.map((packageName) => {
  return `--workspace=${packageName}`}).join(" ");

if (workspacesFlags) {
  const command = process.argv.at(-1);
  const commandToRun = `${command} ${workspacesFlags}`;
  execSync(commandToRun, { 
    stdio: "inherit"
  });
} else {
  console.log("Nothing has changed");
}
