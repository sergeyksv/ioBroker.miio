import { MiioAdapterROState } from "../device";
import * as Powerstrip from "../Type/powerstrip";
import { Device } from "miio-lite";
import { objectExtend } from "../../tools";
import {
    Voltage,
    PowerFactor,
    ElecLeakage
} from "../../Properties/property";

export class DeviceClass extends Powerstrip.DeviceClass {
    public get deviceName() {
        return "qmi.powerstrip";
    }

    public get deviceType() {
        return "VendorTypeDevice";
    }

    public get roState(): Record<string, MiioAdapterROState> {
        return objectExtend(super.roState, {
            voltage: {
                property: new Voltage(),
            },
            powerFactor: {
                property: new PowerFactor(),
            },
            LeakageCurrent: {
                property: new ElecLeakage(),
            }
        });
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};