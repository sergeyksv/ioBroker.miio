import { MiioAdapterRWState, MiioAdapterROState } from "../device";
import * as Airpurifier from "../Type/airpurifier";
import { Device } from "miio-lite";
import { objectExtend } from "../../tools";
import {
    SetLevelFavorite,
    SetActSleep,
    SetVolume
} from "../../Commands/command";
import {
    AverageAqi,
    Humidity,
    TempDec,
    FavoriteLevel,
    UseTime,
    PurifyVolume,
    ActSleep,
    Motor2Speed,
    Volume
} from "../../Properties/property";

export class DeviceClass extends Airpurifier.DeviceClass {
    public get deviceName() {
        return "zhimi.airpurifier.v6";
    }

    public get deviceType() {
        return "VendorTypeVersionDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return objectExtend(super.rwState, {
            favoriteLevel: {
                command: new SetLevelFavorite(),
                property: new FavoriteLevel(),
            },
            volume: {
                command: new SetVolume(),
                property: new Volume(),
            },
            learnSleepMode: {
                command: new SetActSleep(),
                property: new ActSleep(),
            },
            buzzer: {
                delete: true,
            },
            ledBrightnessLevel: {
                delete: true,
            }
        });
    }

    public get roState(): Record<string, MiioAdapterROState> {
        return objectExtend(super.roState, {
            averageAqi: {
                property: new AverageAqi(),
            },
            humidity: {
                property: new Humidity(),
            },
            temperature: {
                property: new TempDec(),
            },
            usedTime: {
                property: new UseTime(),
            },
            motor2Speed: {
                property: new Motor2Speed(),
            },
            purifyVolume: {
                property: new PurifyVolume(),
            }
        });
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};