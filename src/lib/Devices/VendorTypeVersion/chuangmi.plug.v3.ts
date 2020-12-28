import { MiioAdapterRWState, MiioAdapterROState } from "../device";
import * as Plug from "../Type/plug";
import { Device } from "miio-lite";
import { objectExtend } from "../../tools";
import {
    SetPowerChuangmiPlugV3,
    SetUsbPowerChuangmiPlugV3,
    SetWifiLed
} from "../../Commands/command";
import {
    On,
    UsbOn,
    WifiLed,
    GetPower
} from "../../Properties/property";

export class DeviceClass extends Plug.DeviceClass {
    public get deviceName() {
        return "chuangmi.plug.v3";
    }

    public get deviceType() {
        return "VendorTypeVersionDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return objectExtend(super.rwState, {
            power: {
                command: new SetPowerChuangmiPlugV3(),
                property: new On(),
            },
            usbPower: {
                command: new SetUsbPowerChuangmiPlugV3(),
                property: new UsbOn(),
            },
            wifiLed: {
                command: new SetWifiLed(),
                property: new WifiLed(),
            }
        });
    }

    public get roState(): Record<string, MiioAdapterROState> {
        return objectExtend(super.roState, {
            loadPower: {
                property: new GetPower()
            }
        });
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};