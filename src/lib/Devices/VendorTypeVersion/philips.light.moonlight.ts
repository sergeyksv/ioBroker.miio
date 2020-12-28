import { MiioAdapterRWState } from "../device";
import * as PhilipsLight from "../VendorType/philips.light";
import { Device } from "miio-lite";
import { objectExtend } from "../../tools";
import {
    SetRgb
} from "../../Commands/command";
import {
    Pow,
    Bri,
    Rgb
} from "../../Properties/property";

export class DeviceClass extends PhilipsLight.DeviceClass {
    public get deviceName() {
        return "philips.light.moonlight";
    }

    public get deviceType() {
        return "VendorTypeVersionDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return objectExtend(super.rwState, {
            RGB: {
                command: new SetRgb(),
                property: new Rgb(),
            },
            power: {
                property: new Pow(),
            },
            brightness: {
                property: new Bri(),
            }
        });
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};