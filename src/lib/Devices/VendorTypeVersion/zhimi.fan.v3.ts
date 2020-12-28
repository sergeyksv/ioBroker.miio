import { MiioAdapterRWState, MiioAdapterROState } from "../device";
import * as Fan from "../Type/fan";
import { Device } from "miio-lite";
import { objectExtend } from "../../tools";

import {
    Battery,
    Humidity,
    TempDec,
    BatCharge,
    ButtonPressed
} from "../../Properties/property";

export class DeviceClass extends Fan.DeviceClass {
    public get deviceName() {
        return "zhimi.fan.v3";
    }

    public get deviceType() {
        return "VendorTypeVersionDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return objectExtend(super.rwState, {
        });
    }

    public get roState(): Record<string, MiioAdapterROState> {
        return objectExtend(super.roState, {
            humidity: {
                property: new Humidity(),
            },
            temperature: {
                property: new TempDec(),
            },
            battery: {
                property: new Battery(),
            },
            ChargeState: {
                property: new BatCharge(),
            },
            LastPressedButton: {
                property: new ButtonPressed(),
            }
        });
    }

    constructor(miioDev: Device) {
        super(miioDev);
    }
};