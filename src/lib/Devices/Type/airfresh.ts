import { MiioAdapterDevice, MiioAdapterRWState, MiioAdapterROState } from "../device";
import {
    SetPower,
    SetMode,
    SetLed,
    SetChildLock,
    SetBuzzer,
    SetLevelFavorite
} from "../../Commands/command";
import {
    Power,
    Aqi,
    AverageAqi,
    Mode,
    FilterLife,
    F1HourUsed,
    Motor1Speed,
    Led,
    ChildLock,
    Buzzer,
    TempDec,
    Humidity,
    UseTime,
    FavoriteLevel,
    Co2,
    LedLevel,
} from "../../Properties/property";
import { Device } from "miio-lite";

export class DeviceClass extends MiioAdapterDevice {
    public get deviceName() {
        return "airfresh";
    }

    public get deviceType() {
        return "TypeDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState>  {
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
            favoriteLevel: {
                command: new SetLevelFavorite(),
                property: new FavoriteLevel(),
            }
        };
    }

    public get roState(): Record<string, MiioAdapterROState> {
        return {
            aqi: {
                property: new Aqi(),
            },
            averageAqi: {
                property: new AverageAqi(),
            },
            humidity: {
                property: new Humidity(),
            },
            Temperature: {
                property: new TempDec(),
            },
            filterLife: {
                property: new FilterLife(),
            },
            filterUsedTime: {
                property: new F1HourUsed(),
            },
            motor1Speed: {
                property: new Motor1Speed(),
            },
            usedTime: {
                property: new UseTime(),
            },
            co2: {
                property: new Co2(),
            },
            ledBrightnessLevel: {
                property: new LedLevel(),
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