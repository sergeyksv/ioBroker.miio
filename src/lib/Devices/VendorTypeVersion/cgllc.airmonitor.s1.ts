import { MiioAdapterDevice, MiioAdapterRWState, MiioAdapterROState } from "../device";
import { Device } from "miio-lite";
import { objectExtend } from "../../tools";
import {
    Humidity,
    Temperature,
    Co2,
    Pm25,
    Tvoc,
    Battery
} from "../../Properties/property";

export class DeviceClass extends MiioAdapterDevice {
    public get deviceName() {
        return "cgllc.airmonitor.s1";
    }

    public get deviceType() {
        return "VendorTypeVersionDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return {};
    }

    public get roState(): Record<string, MiioAdapterROState> {
        return objectExtend(super.roState, {
            humidity: {
                property: new Humidity(),
            },
            temperature: {
                property: new Temperature(),
            },
            co2: {
                property: new Co2(),
            },
            pm25: {
                property: new Pm25(),
            },
            tvoc: {
                property: new Tvoc(),
            },
            battery: {
                property: new Battery(),
            },
        });
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};