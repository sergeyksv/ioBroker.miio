import { expect } from "chai";
import { MiioTestDevice } from "./device";
import * as miio from "../lib/miio";

class YunmiWaterpuriLx3TestDevice extends MiioTestDevice {
    constructor() {
        super("yunmi.waterpuri.lx3");
    }
}

export async function testFunc(controller: miio.Controller) {
    const testDev = new YunmiWaterpuriLx3TestDevice();

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
                "FilteredWaterTDS": {
                    "name": "FilteredWaterTDS",
                    "read": true,
                    "role": "state",
                    "type": "number",
                    "unit": "TDS",
                    "write": false
                },
                "FrontActiveCarbonFilter": {
                    "name": "FrontActiveCarbonFilter",
                    "read": true,
                    "role": "state",
                    "type": "number",
                    "unit": "%",
                    "write": false
                },
                "FrontActiveCarbonFilterDay": {
                    "name": "FrontActiveCarbonFilterDay",
                    "read": true,
                    "role": "state",
                    "type": "number",
                    "unit": "days",
                    "write": false
                },
                "PPCottonFilter": {
                    "name": "PPCottonFilter",
                    "read": true,
                    "role": "state",
                    "type": "number",
                    "unit": "%",
                    "write": false
                },
                "PPCottonFilterDay": {
                    "name": "PPCottonFilterDay",
                    "read": true,
                    "role": "state",
                    "type": "number",
                    "unit": "days",
                    "write": false
                },
                "ROFilter": {
                    "name": "ROFilter",
                    "read": true,
                    "role": "state",
                    "type": "number",
                    "unit": "%",
                    "write": false
                },
                "ROFilterDay": {
                    "name": "ROFilterDay",
                    "read": true,
                    "role": "state",
                    "type": "number",
                    "unit": "days",
                    "write": false
                },
                "RearActiveCarbonFilter": {
                    "name": "RearActiveCarbonFilter",
                    "read": true,
                    "role": "state",
                    "type": "number",
                    "unit": "%",
                    "write": false
                },
                "RearActiveCarbonFilterDay": {
                    "name": "RearActiveCarbonFilterDay",
                    "read": true,
                    "role": "state",
                    "type": "number",
                    "unit": "days",
                    "write": false
                },
                "TapWaterTDS": {
                    "name": "TapWaterTDS",
                    "read": true,
                    "role": "state",
                    "type": "number",
                    "unit": "TDS",
                    "write": false
                }
            });
        }
    });

    await controller.registerDevice(testDev, false);
}
