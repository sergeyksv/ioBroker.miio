import { MiioAdapterRWState } from "../device";
import * as PhilipsLight from "../VendorType/philips.light";
import { Device } from "miio-lite";
import { objectExtend } from "../../tools";
import {
    EnableAmb,
    SetAmbBright,
    SetEyeCare,
} from "../../Commands/command";
import {
    AmbStatus,
    AmbValue,
    EyeCare
} from "../../Properties/property";

export class DeviceClass extends PhilipsLight.DeviceClass {
    public get deviceName() {
        return "philips.light.sread";
    }

    public get deviceType() {
        return "VendorTypeVersionDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return objectExtend(super.rwState, {
            colorTemperature: {
                delete: true
            },
            eyeCare: {
                command: new SetEyeCare(),
                property: new EyeCare(),
            },
            secondLightPower: {
                command: new EnableAmb(),
                property: new AmbStatus(),
            },
            secondLightBrightness: {
                command: new SetAmbBright(),
                property: new AmbValue(),
            }
        });
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};