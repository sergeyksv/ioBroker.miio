import { expect } from "chai";
import { MiioTestDevice } from "./device";
import * as miio from "../lib/miio";

class ZhimiHumidifierV3TestDevice extends MiioTestDevice {
    constructor() {
        super("zhimi.humidifier.v3");
    }
}

export async function testFunc(controller: miio.Controller) {
    const testDev = new ZhimiHumidifierV3TestDevice();

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
                "power": {
                    "write": true,
                    "read": true,
                    "name": "power",
                    "role": "switch",
                    "type": "boolean"
                },
                "mode": {
                    "write": true,
                    "read": true,
                    "name": "mode",
                    "role": "state",
                    "type": "string"
                },
                "buzzer": {
                    "write": true,
                    "read": true,
                    "name": "buzzer",
                    "role": "state",
                    "type": "boolean"
                },
                "ledBrightnessLevel": {
                    "write": true,
                    "read": true,
                    "name": "ledBrightnessLevel",
                    "role": "state",
                    "type": "number",
                    "min": 0,
                    "max": 2
                },
                "childLock": {
                    "write": true,
                    "read": true,
                    "name": "childLock",
                    "role": "state",
                    "type": "boolean"
                },
                "targetHumidity": {
                    "write": true,
                    "read": true,
                    "name": "targetHumidity",
                    "unit": "%",
                    "role": "state",
                    "type": "number"
                },
                "temperature": {
                    "write": false,
                    "read": true,
                    "name": "temperature",
                    "role": "temperature",
                    "type": "number",
                    "unit": "°C"
                },
                "humidity": {
                    "write": false,
                    "read": true,
                    "name": "humidity",
                    "role": "humidity",
                    "type": "number",
                    "unit": "%"
                },
                "hardwareVersion": {
                    "write": false,
                    "read": true,
                    "name": "hardwareVersion",
                    "role": "state",
                    "type": "number"
                },
                "usedTime": {
                    "write": false,
                    "read": true,
                    "name": "usedTime",
                    "role": "state",
                    "type": "number",
                    "unit": "secs"
                },
                "LastPressedButton": {
                    "write": false,
                    "read": true,
                    "name": "LastPressedButton",
                    "role": "state",
                    "type": "string"
                }
            });
        }
    });

    await controller.registerDevice(testDev, false);
}
