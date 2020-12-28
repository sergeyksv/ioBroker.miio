/**
 * This is a dummy TypeScript test file using chai and mocha
 *
 * It's automatically excluded from npm and its build output is excluded from both git and npm.
 * It is advised to test all your modules with accompanying *.test.ts-files
 */

import { expect } from "chai";
// import { functionToTest } from "./moduleToTest";
// import { tests, utils} from "@iobroker/testing";
import * as utils from "@iobroker/adapter-core";
import * as miio from "./lib/miio";
import * as ZhimiHumidifierV3 from "./test/zhimi.humidifier.v3";
import * as ChuangmiPlugV3 from "./test/chuangmi.plug.v3";
import * as PhilipsLightBulb from "./test/philips.light.bulb";
import * as YunmiWaterpuriLx3 from "./test/yunmi.waterpuri.lx3"

const controller = new miio.Controller({});
controller.on("debug", /** @param {string} msg */ msg => console.log(`DEBUG: ${msg}`));
controller.on("info", /** @param {string} msg */ msg => console.log(`INFO : ${msg}`));
controller.on("warning", /** @param {string} msg */ msg => console.log(`WARN : ${msg}`));
controller.on("error", /** @param {string} msg */ msg => {
    console.log(`ERROR: ${msg}`);
});
controller.on("data",
    /**
     * @param {string} id
     * @param {string} state
     * @param {any} val
     */
    (id, state, val) => {
        console.log(`Get data from ID=${id}, State=${JSON.stringify(state)}, Val=${JSON.stringify(val)}`);
    }
);

describe("Virtual Device Test", () => {
    it("zhimi.humidifier.v3 test", async () => {
        await ZhimiHumidifierV3.testFunc(controller);
    });
    it("chuangmi.plug.v3 test", async () => {
        await ChuangmiPlugV3.testFunc(controller);
    });
    it("philips.light.bulb test", async () => {
        await PhilipsLightBulb.testFunc(controller);
    });
    it("yunmi.waterpuri.lx3 test", async () => {
        await YunmiWaterpuriLx3.testFunc(controller);
    });
});
