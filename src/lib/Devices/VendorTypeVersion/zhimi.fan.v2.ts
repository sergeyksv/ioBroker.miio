import { MiioAdapterRWState, MiioAdapterROState } from "../device";
import * as Fan from "../Type/fan";
import { Device } from "miio-lite";
import { objectExtend } from "../../tools";
import {
    SetLed
} from "../../Commands/command";
import {
    Battery,
    Humidity,
    TempDec,
    BatCharge,
    ButtonPressed,
    Led,
    BatState
} from "../../Properties/property";

export class DeviceClass extends Fan.DeviceClass {
    public get deviceName() {
        return "zhimi.fan.v2";
    }

    public get deviceType() {
        return "VendorTypeVersionDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return objectExtend(super.rwState, {
            led: {
                command: new SetLed(),
                property: new Led(),
            }
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
            },
            batteryState: {
                property: new BatState(),
            }
        });
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};