import { MiioAdapterRWState } from "../device";
import * as Powerstrip from "../Type/powerstrip";
import { Device } from "miio-lite";
import { objectExtend } from "../../tools";
import {
    SetPowerPrice,
    SetWifiLed
} from "../../Commands/command";
import {
    PowerPrice,
    WifiLed
} from "../../Properties/property";

export class DeviceClass extends Powerstrip.DeviceClass {
    public get deviceName() {
        return "zimi.powerstrip";
    }

    public get deviceType() {
        return "VendorTypeDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return objectExtend(super.rwState, {
            powerPrice: {
                command: new SetPowerPrice(),
                property: new PowerPrice(),
            },
            wifiLed: {
                command: new SetWifiLed(),
                property: new WifiLed(),
            }
        });
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};