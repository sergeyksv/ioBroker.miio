import { MiioAdapterDevice, MiioAdapterRWState, MiioAdapterROState } from "../device";
import { Device } from "miio-lite";
import {
    SetPower
} from "../../Commands/command";
import {
    Power,
    Temperature
} from "../../Properties/property";

export class DeviceClass extends MiioAdapterDevice {
    public get deviceName() {
        return "plug";
    }

    public get deviceType() {
        return "TypeDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return {
            power: {
                command: new SetPower(),
                property: new Power(),
            }
        };
    }

    public get roState(): Record<string, MiioAdapterROState> {
        return {
            temperature: {
                property: new Temperature(),
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