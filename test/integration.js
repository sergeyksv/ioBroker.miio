const path = require("path");
const { tests } = require("@iobroker/testing");
const miioLiteMock = require("./lib/miio-lite-mock");

// Run integration tests - See https://github.com/ioBroker/testing for a detailed explanation and further options
console.log("run miio integration test");
tests.integration(path.join(__dirname, ".."), {

});
