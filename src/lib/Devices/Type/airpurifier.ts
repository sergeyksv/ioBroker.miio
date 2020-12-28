import { MiioAdapterDevice, MiioAdapterRWState, MiioAdapterROState } from "../device";
import {
    SetPower,
    SetMode,
    SetLed,
    SetChildLock,
    SetBuzzer,
    SetLedB,

} from "../../Commands/command";
import {
    Power,
    Aqi,
    Mode,
    Filter1Life,
    F1HourUsed,
    Motor1Speed,
    Led,
    ChildLock,
    Buzzer,
    Bright,
    LedB
} from "../../Properties/property";
import { Device } from "miio-lite";

export class DeviceClass extends MiioAdapterDevice {
    public get deviceName() {
        return "airpurifier";
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
            mode: {
                command: new SetMode(),
                property: new Mode(),
            },
            led: {
                command: new SetLed(),
                property: new Led(),
            },
            childLock: {
                command: new SetChildLock(),
                property: new ChildLock(),
            },
            buzzer: {
                command: new SetBuzzer(),
                property: new Buzzer(),
            },
            ledBrightnessLevel: {
                command: new SetLedB(),
                property: new LedB(),
            }
        };
    }

    public get roState(): Record<string, MiioAdapterROState> {
        return {
            aqi: {
                property: new Aqi(),
            },
            filterLife: {
                property: new Filter1Life(),
            },
            filterUsedTime: {
                property: new F1HourUsed(),
            },
            motor1Speed: {
                property: new Motor1Speed(),
            },
            illuminance: {
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