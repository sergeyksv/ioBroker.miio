import { expect } from "chai";
import { MiioTestDevice } from "./device";
import * as miio from "../lib/miio";

class PhilipsLightBulbTestDevice extends MiioTestDevice {
    constructor() {
        super("philips.light.bulb");
    }
}

export async function testFunc(controller: miio.Controller) {
    const testDev = new PhilipsLightBulbTestDevice();

    controller.once("device", (dev: miio.Device, opt: string) => {
        if (opt === "add") {
            expect(dev.device.states).to.deep.equal({
                "connected": {
                    "desc": "Will be set to false if get property failed for 5 times",
                    "name": "Is device connected",
                    "read": true,
                    "role": "indicator.reachable",
                    "type": "boolean",
                    "write": false
                },
                "model": {
                    "desc": "show current device's MIIO model",
                    "name": "device model",
                    "read": true,
                    "role": "info",
                    "type": "string",
                    "write": false
                },
                "brightness": {
                    "max": 100,
                    "min": 0,
                    "name": "brightness",
                    "read": true,
                    "role": "level.brightness",
                    "type": "number",
                    "unit": "%",
                    "write": true
                },
                "colorTemperature": {
                    "max": 100,
                    "min": 1,
                    "name": "colorTemperature",
                    "read": true,
                    "role": "state",
                    "type": "number",
                    "unit": "%",
                    "write": true
                },
                "power": {
                    "name": "power",
                    "read": true,
                    "role": "switch",
                    "type": "boolean",
                    "write": true
                }
            });
        }
    });

    await controller.registerDevice(testDev, false);
}
