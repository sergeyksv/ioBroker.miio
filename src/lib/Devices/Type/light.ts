import { MiioAdapterDevice, MiioAdapterRWState } from "../device";
import { Device } from "miio-lite";
import {
    SetPower,
    SetBright
} from "../../Commands/command";
import {
    Power,
    Bright
} from "../../Properties/property";

export class DeviceClass extends MiioAdapterDevice {
    public get deviceName() {
        return "light";
    }

    public get deviceType() {
        return "TypeDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return {
            power: {
                command: new SetPower(),
                property: new Power(),
            },
            brightness: {
                command: new SetBright(),
                property: new Bright(),
            }
        };
    }

    public get polling() {
        return 3000;
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};