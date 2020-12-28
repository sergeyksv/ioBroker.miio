import { MiioAdapterDevice, MiioAdapterRWState, MiioAdapterROState } from "../device";
import { Device } from "miio-lite";
import {
    SetPower,
    SetMode,
    SetBuzzer,
    SetLedB,
    SetChildLock,
    SetLimitHum
} from "../../Commands/command";
import {
    Power,
    Mode,
    TempDec,
    Humidity,
    Buzzer,
    LedB,
    ChildLock,
    HwVersion,
    LimitHum,
    UseTime
} from "../../Properties/property";

export class DeviceClass extends MiioAdapterDevice {
    public get deviceName() {
        return "humidifier";
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
            buzzer: {
                command: new SetBuzzer(),
                property: new Buzzer(),
            },
            ledBrightnessLevel: {
                command: new SetLedB(),
                property: new LedB(),
            },
            childLock: {
                command: new SetChildLock(),
                property: new ChildLock(),
            },
            targetHumidity: {
                command: new SetLimitHum(),
                property: new LimitHum(),
            }
        };
    }

    public get roState(): Record<string, MiioAdapterROState> {
        return {
            temperature: {
                property: new TempDec(),
            },
            humidity: {
                property: new Humidity(),
            },
            hardwareVersion: {
                property: new HwVersion(),
            },
            usedTime: {
                property: new UseTime(),
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