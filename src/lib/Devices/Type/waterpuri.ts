import { MiioAdapterDevice, MiioAdapterRWState, MiioAdapterROState } from "../device";
import { Device } from "miio-lite";
import {
    SetPower,
} from "../../Commands/command";
import {
    Power,
    Tds,
    Filter1Life,
    Filter1State,
    FilterLife,
    FilterState,
    Life,
    State,
    Level,
    Volume,
    Filter,
    Usage,
    Temperature,
    UvLife,
    UvState,
    ElecvalState
} from "../../Properties/property";

export class DeviceClass extends MiioAdapterDevice {
    public get deviceName() {
        return "waterpuri";
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
            TDS: {
                property: new Tds(),
            },
            filter1Life: {
                property: new Filter1Life(),
            },
            filter1State: {
                property: new Filter1State(),
            },
            filterLife: {
                property: new FilterLife(),
            },
            filterState: {
                property: new FilterState(),
            },
            life: {
                property: new Life(),
            },
            state: {
                property: new State(),
            },
            level: {
                property: new Level(),
            },
            volume: {
                property: new Volume(),
            },
            Filter: {
                property: new Filter(),
            },
            usage: {
                property: new Usage(),
            },
            temperature: {
                property: new Temperature(),
            },
            uvLife: {
                property: new UvLife(),
            },
            uvState: {
                property: new UvState(),
            },
            elecvalState: {
                property: new ElecvalState(),
            }
        };
    }

    public constructor(miioDev: Device) {
        super(miioDev);
    }
};