import { MiioAdapterDevice, MiioAdapterRWState, MiioAdapterROState } from "../device";
import { Device } from "miio-lite";
import {
    SetPower,
    SetMove,
    SetChildLock,
    SetBuzzer,
    SetLedB,
    SetAngle,
    SetNaturalLevel,
    SetSpeedLevel,
    SetAngleEnable,
    SetPoweroffTime,
} from "../../Commands/command";
import {
    Power,
    Move,
    ChildLock,
    Buzzer,
    LedB,
    Angle,
    NaturalLevel,
    SpeedLevel,
    AngleEnable,
    Speed,
    AcPower,
    PoweroffTime,
    UseTime
} from "../../Properties/property";

export class DeviceClass extends MiioAdapterDevice {
    public get deviceName() {
        return "fan";
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
            move: {
                command: new SetMove(),
                property: new Move(),
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
            },
            angle: {
                command: new SetAngle(),
                property: new Angle(),
            },
            naturalSpeed: {
                command: new SetNaturalLevel(),
                property: new NaturalLevel(),
            },
            directSpeed: {
                command: new SetSpeedLevel(),
                property: new SpeedLevel(),
            },
            oscillate: {
                command: new SetAngleEnable(),
                property: new AngleEnable(),
            },
            timedOff: {
                command: new SetPoweroffTime(),
                property: new PoweroffTime(),
            }
        };
    }

    public get roState(): Record<string, MiioAdapterROState> {
        return {
            motorSpeed: {
                property: new Speed(),
            },
            ConnectAC: {
                property: new AcPower(),
            },
            UseTime: {
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
