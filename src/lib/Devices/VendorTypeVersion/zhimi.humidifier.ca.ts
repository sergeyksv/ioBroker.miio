import { MiioAdapterRWState, MiioAdapterROState } from "../device";
import * as Humidifier from "../Type/humidifier";
import { Device } from "miio-lite";
import { objectExtend } from "../../tools";
import {
    SetDry
} from "../../Commands/command";
import {
    Speed,
    Depth,
    Dry
} from "../../Properties/property";

export class DeviceClass extends Humidifier.DeviceClass {
    public get deviceName() {
        return "zhimi.humidifier.v";
    }

    public get deviceType() {
        return "VendorTypeVersionDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return objectExtend(super.rwState, {
            dryMode: {
                command: new SetDry(),
                property: new Dry(),
            }
        });
    }

    public get roState(): Record<string, MiioAdapterROState> {
        return objectExtend(super.roState, {
            fanSpeed: {
                property: new Speed(),
            },
            waterRemain: {
                property: new Depth(),
            }
        });
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};