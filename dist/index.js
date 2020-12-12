"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var intermock_1 = require("intermock");
var typescript_1 = __importDefault(require("typescript"));
var prettier_1 = __importDefault(require("prettier"));
var clipboardy_1 = __importDefault(require("clipboardy"));
var commander_1 = __importDefault(require("commander"));
// ______________________________________________________
//
function getTarget() {
    commander_1.default
        .version("0.0.1", "-v, --version")
        .option("-t, --target  [path]", "Path to configuration file.")
        .parse(process.argv);
    return commander_1.default.target || "Props";
}
// ______________________________________________________
//
function getStubBlock(target) {
    var data = clipboardy_1.default.readSync();
    var stub = intermock_1.mock({
        files: [["", data]],
        interfaces: [target],
    });
    return JSON.stringify(stub[target]);
}
// ______________________________________________________
//
function checkStubBlock(target, block) {
    if (!block) {
        var cyan = "\u001b[36m";
        var reset = "\u001b[0m";
        var message = cyan + "Invalid clipboardy src. Is the name \"" + target + "\" correct?" + reset;
        throw Error(message);
    }
}
// ______________________________________________________
//
function getEmitSrc(target, block) {
    var dataSrc = "export const stub: " + target + " = " + block;
    var src = typescript_1.default.createSourceFile("", dataSrc, typescript_1.default.ScriptTarget.ES2015, true);
    var printer = typescript_1.default.createPrinter();
    return prettier_1.default.format(printer.printFile(src), { parser: "babel" });
}
// ______________________________________________________
//
function resultConsoleLog(out) {
    console.log("______________________________________");
    console.log(out);
    console.log("______________________________________");
    console.log("You succeed create stub. It is in clipboard now✨");
}
// ______________________________________________________
//
function main() {
    var target = getTarget();
    var block = getStubBlock(target);
    checkStubBlock(target, block);
    var out = getEmitSrc(target, block);
    clipboardy_1.default.writeSync(out);
    resultConsoleLog(out);
}
// ______________________________________________________
//
main();
