import { mock } from "intermock";
import ts from "typescript";
import prettier from "prettier";
import clipboardy from "clipboardy";
import commander from "commander";
// ______________________________________________________
//
function getTarget() {
  commander
    .version("0.0.1", "-v, --version")
    .option("-t, --target  [path]", "Path to configuration file.")
    .parse(process.argv);
  return commander.target || "Props";
}
// ______________________________________________________
//
function getStubBlock(target: string) {
  const data = clipboardy.readSync();
  const stub: any = mock({
    files: [["", data]],
    interfaces: [target],
  });
  return JSON.stringify(stub[target]);
}
// ______________________________________________________
//
function checkStubBlock(target: string, block?: string) {
  if (!block) {
    const cyan = "\u001b[36m";
    const reset = "\u001b[0m";
    const message = `${cyan}Invalid clipboardy src. Is the name "${target}" correct?${reset}`;
    throw Error(message);
  }
}
// ______________________________________________________
//
function getEmitSrc(target: string, block: string) {
  const dataSrc = `export const stub: ${target} = ${block}`;
  const src = ts.createSourceFile("", dataSrc, ts.ScriptTarget.ES2015, true);
  const printer = ts.createPrinter();
  return prettier.format(printer.printFile(src), { parser: "babel" });
}
// ______________________________________________________
//
function resultConsoleLog(out: string) {
  console.log("______________________________________");
  console.log(out);
  console.log("______________________________________");
  console.log("You succeed create stub. It is in clipboard now✨");
}
// ______________________________________________________
//
function main() {
  const target = getTarget();
  const block = getStubBlock(target);
  checkStubBlock(target, block);
  const out = getEmitSrc(target, block);
  clipboardy.writeSync(out);
  resultConsoleLog(out);
}
// ______________________________________________________
//
main();
