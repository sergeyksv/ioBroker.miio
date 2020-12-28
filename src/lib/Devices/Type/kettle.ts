import { MiioAdapterDevice, MiioAdapterRWState, MiioAdapterROState } from "../device";
import { Device } from "miio-lite";
import {
    SetTempeSetup,
    SetDrinkRemindEnable,
    SetDrinkRemindTime
} from "../../Commands/command";
import {
    Tds,
    WaterRemainTime,
    CurrTempe,
    SetupTempe,
    MinSetTempe,
    DrinkRemind,
    DrinkRemindTime,
    WorkMode,
    DrinkTimeCount
} from "../../Properties/property";

export class DeviceClass extends MiioAdapterDevice {
    public get deviceName() {
        return "kettle";
    }

    public get deviceType() {
        return "TypeDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return {
            WarmWaterTemperature: {
                command: new SetTempeSetup(),
                property: new SetupTempe(),
            },
            remindDrink: {
                command: new SetDrinkRemindEnable(),
                property: new DrinkRemind(),
            },
            remindDrinkDuration: {
                command: new SetDrinkRemindTime(),
                property: new DrinkRemindTime(),
            }
        };
    }

    public get roState(): Record<string, MiioAdapterROState> {
        return {
            TDS: {
                property: new Tds(),
            },
            waterStorageTime: {
                property: new WaterRemainTime(),
            },
            currentWaterTemperature: {
                property: new CurrTempe(),
            },
            minWarmWaterTemperature: {
                property: new MinSetTempe(),
            },
            workMode: {
                property: new WorkMode(),
            },
            lastDrinkTime: {
                property: new DrinkTimeCount(),
            }
        };
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};