import { MiioAdapterRWState } from "../device";
import * as YeelinkLight from "../VendorType/yeelink.light";
import { Device } from "miio-lite";
import { objectExtend } from "../../tools";

export class DeviceClass extends YeelinkLight.DeviceClass {
    public get deviceName() {
        return "yeelink.light.mono";
    }

    public get deviceType() {
        return "VendorTypeVersionDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return objectExtend(super.rwState, {
            colorTemperature: {
                delete: true
            },
            RGB: {
                delete: true
            }
        });
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};