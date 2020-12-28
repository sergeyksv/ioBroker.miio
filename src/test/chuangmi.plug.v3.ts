import { expect } from "chai";
import { MiioTestDevice } from "./device";
import * as miio from "../lib/miio";

class ChuangmiPlugTestDevice extends MiioTestDevice {
    constructor() {
        super("chuangmi.plug.v3.ts");
    }
}

export async function testFunc(controller: miio.Controller) {
    const testDev = new ChuangmiPlugTestDevice();

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
                "usbPower": {
                    "write": true,
                    "read": true,
                    "name": "usbPower",
                    "role": "switch",
                    "type": "boolean"
                },
                "wifiLed": {
                    "write": true,
                    "read": true,
                    "name": "wifiLed",
                    "role": "switch",
                    "type": "boolean"
                },
                "temperature": {
                    "write": false,
                    "read": true,
                    "name": "temperature",
                    "role": "temperature",
                    "type": "number",
                    "unit": "°C"
                },
                "loadPower": {
                    "name": "loadPower",
                    "read": true,
                    "role": "state",
                    "type": "number",
                    "unit": "W",
                    "write": false,
                }
            });
        }
    });

    await controller.registerDevice(testDev, false);
}
