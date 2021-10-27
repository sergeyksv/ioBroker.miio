"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const device_1 = require("../device");
const tools_1 = require("../../tools");
const property_1 = require("../../Properties/property");
class DeviceClass extends device_1.MiioAdapterDevice {
    get deviceName() {
        return "cgllc.airmonitor.s1";
    }
    get deviceType() {
        return "VendorTypeVersionDevice";
    }
    get rwState() {
        return {};
    }
    get roState() {
        return (0, tools_1.objectExtend)(super.roState, {
            humidity: {
                property: new property_1.Humidity(),
            },
            temperature: {
                property: new property_1.Temperature(),
            },
            co2: {
                property: new property_1.Co2(),
            },
            pm25: {
                property: new property_1.Pm25(),
            },
            tvoc: {
                property: new property_1.Tvoc(),
            },
            battery: {
                property: new property_1.Battery(),
            },
        });
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.DeviceClass = DeviceClass;
;
