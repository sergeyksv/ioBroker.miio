import { MiioAdapterRWState } from "../device";
import * as Light from "../Type/light";
import { Device } from "miio-lite";
import { objectExtend } from "../../tools";
import {
    SetCtAbx,
    SetRgb,
    SetPs
} from "../../Commands/command";
import {
    Ct,
    Rgb,
    SaveState
} from "../../Properties/property";

export class DeviceClass extends Light.DeviceClass {
    public get deviceName() {
        return "yeelink.light";
    }

    public get deviceType() {
        return "VendorTypeDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return objectExtend(super.rwState, {
            colorTemperature: {
                command: new SetCtAbx(),
                property: new Ct(),
            },
            RGB: {
                command: new SetRgb(),
                property: new Rgb(),
            },
            RememberState: {
                command: new SetPs(),
                property: new SaveState(),
            }
        });
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};