import { MiioAdapterDevice, MiioAdapterRWState, MiioAdapterROState } from "../device";
import { Device } from "miio-lite";
import {
    SetPower,
    SetTimeState,
    SetNightState
} from "../../Commands/command";
import {
    Power,
    Aqi,
    Battery,
    UsbState,
    TimeState,
    NightState
} from "../../Properties/property";

export class DeviceClass extends MiioAdapterDevice {
    public get deviceName() {
        return "airmonitor";
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
            displayClock: {
                command: new SetTimeState(),
                property: new TimeState(),
            },
            nightMode: {
                command: new SetNightState(),
                property: new NightState(),  
            }
        };
    }

    public get roState(): Record<string, MiioAdapterROState> {
        return {
            aqi: {
                property: new Aqi(),
            },
            battery: {
                property: new Battery(),
            },
            USBConnected: {
                property: new UsbState(),
            }
        };
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};