const path = require("path");
const { tests, utils } = require("@iobroker/testing");
const miioLiteMock = require("./lib/miio-lite-mock");

// Run unit tests - See https://github.com/ioBroker/testing for a detailed explanation and further options
console.log("run miio unit test");
tests.unit(path.join(__dirname, ".."), {
    additionalMockedModules: {
        "miio-lite": miioLiteMock,
        // Use the {CONTROLLER_DIR} placeholder to access the path where JS-Controller would be installed.
        // Don't forget to provide mocks for every module you need, as they don't exist in unit tests
        //"{CONTROLLER_DIR}/lib/tools.js": {},
    },
    overwriteAdapterConfig(config) {
        config.autoDiscover = true;
        // Don't forget to return it
        return config;
    },
    defineAdditionalTests() {
        // Create mocks and asserts
        const { adapter, database } = utils.unit.createMocks();
        const { assertObjectExists } = utils.unit.createAsserts(database, adapter);

        describe("my test", () => {

            afterEach(() => {
                // The mocks keep track of all method invocations - reset them after each single test
                adapter.resetMockHistory();
                // We want to start each test with a fresh database
                database.clear();
            });

            it("works", () => {
                console.log(`${JSON.stringify(adapter.objects)}`)
            });
        });
    }
});
