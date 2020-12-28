import { MiioAdapterDevice, MiioAdapterRWState, MiioAdapterROState } from "../device";
import { Device } from "miio-lite";
import {
    SetPower
} from "../../Commands/command";
import {
    Power,
    Temperature,
    Current,
    PowerstripMode,
    PowerConsumeRate
} from "../../Properties/property";

export class DeviceClass extends MiioAdapterDevice {
    public get deviceName() {
        return "powerstrip";
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
            },
            current: {
                property: new Current(),
            },
            mode: {
                property: new PowerstripMode(),
            },
            load: {
                property: new PowerConsumeRate(),
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