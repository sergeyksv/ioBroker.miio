import { MiioAdapterRWState, MiioAdapterROState } from "../device";
import * as Airpurifier from "../Type/airpurifier";
import { Device } from "miio-lite";
import { objectExtend } from "../../tools";
import {
    SetLevelFavorite,
    SetActSleep
} from "../../Commands/command";
import {
    AverageAqi,
    Humidity,
    TempDec,
    FavoriteLevel,
    UseTime,
    PurifyVolume,
    ActSleep
} from "../../Properties/property";

export class DeviceClass extends Airpurifier.DeviceClass {
    public get deviceName() {
        return "zhimi.airpurifier.m";
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
            learnSleepMode: {
                command: new SetActSleep(),
                property: new ActSleep(),
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
            Temperature: {
                property: new TempDec(),
            },
            usedTime: {
                property: new UseTime(),
            },
            purifyVolume: {
                property: new PurifyVolume(),
            },
            illuminance: {
                delete: true,
            }
        });
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};