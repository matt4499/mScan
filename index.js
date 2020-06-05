var glob = require("glob");
var lineReader = require('line-reader');
var chalk = require("chalk");
var MATCHES = {
    STEAMIDCHECK: { pattern:"STEAM_", reason: "Presence of SteamID which could be used for backdooring" },
    HTTPPOST: { pattern: "http.Post", reason: "http.Post can send information to outside websites such as IP, playercount, and more"},
    HTTPFETCH: { pattern: "http.Fetch", reason: "http.Fetch can request and run lua from outside websites, which is how most backdoors work." },
    RUNSTRING: { pattern: "runstring", reason: "Runs lua code, which is often used for running obfuscated/encrypted lua code"},
    OBFUSCATEDCODE1: { pattern: "0[xX][0-9a-fA-F]+", reason: "[Check 1] Obfuscated/Encrypted code which is often used for running backdoored code hiddenly"},
    OBFUSCATEDCODE2: { pattern: "\\[xX][0-9a-fA-F][0-9a-fA-F]", reason:"[Check 2] Obfuscated/Encrypted code which is often used for running backdoored code hiddenly"},
    GETFENV: { pattern: "getfenv", reason:"Calling to run function getFenv"},
    COMPILESTRING: { pattern: "compilestring", reason:"CompileString is often used for compiling obfuscated code and running it"},
    GLOBAL: { pattern: " _G ", reason: "References global table, which is often used for generating obfuscated code"},
    BACKDOOR_TEXT: { pattern: "backdoor", reason: "Contains 'backdoor' text"}
}
function checkfile(file){
    console.log("Queued file: " + file);
    var linenum = 0;
    lineReader.eachLine(file, function(line) {
        linenum = linenum + 1;
        Object.values(MATCHES).forEach(function(match){
            if(line.match(match.pattern) || line.includes(match.pattern)){
                console.log(chalk.red("[FOUND] " + line.trimLeft()));
                console.log(chalk.yellow("    [LOCATION] " + file + chalk.white(":" + linenum)));
                console.log(chalk.green("        [REASON] " + match.reason));
                console.log(" ");
            }
        });
    });
    linenum = 0;
}
glob("C:/Users/your name/Desktop/gmod/addons/**/*.lua", function (er, files) {
    files.forEach(function(file){
        checkfile(file);
    });
    console.log(chalk.green("Successfully queued all files to be scanned."));
});
