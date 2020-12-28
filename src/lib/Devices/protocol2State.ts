import {
    MiioAdapterRWState,
    MiioAdapterROState,
    MiioAdapterWOState
} from "./device"
import { Devices, Command, Property } from "miio-dev";
import { MiioCommand, MiioAdapterCommandPara } from "../Commands/command";
import { MiioProperty, MiioPropertyPara } from "../Properties/property";

interface MiioIobRWState {
    id: string;
    command: string;
    property: string;
    name?: string;
    icon?: string;
    role: string;
}

interface MiioIobWOState {
    id: string;
    command: string;
    name?: string;
    icon?: string | undefined;
    role: string;
}

interface MiioIobROState {
    id: string;
    property: string;
    name?: string;
    icon?: string | undefined;
    role: string;
}

type MiioIobState = MiioIobRWState | MiioIobWOState | MiioIobROState

interface MiioIobStates {
    rw: Record<string, MiioIobRWState>;
    wo: Record<string, MiioIobWOState>;
    ro: Record<string, MiioIobROState>;
}

const states: MiioIobStates = {
    rw: {
        viomiWaterHeaterTemperature: {
            id: "temperature",
            command: "set_temp",
            property: "targetTemp",
            name: "Heater target temperature",
            icon: undefined,
            role: "state",
        },
    },
    wo: {
        viomiWaterHeaterPower: {
            id: "power",
            command: "set_power",
            icon: undefined,
            role: "state",
        },
        viomiWaterHeaterMode: {
            id: "mode",
            command: "set_mode",
            icon: undefined,
            role: "state",
        }
    },
    ro: {
        viomiWaterHeaterWashStatus: {
            id: "wash_status",
            property: "washStatus",
            icon: undefined,
            role: "state",
        },
        viomiWaterHeaterVelocity: {
            id: "velocity",
            property: "velocity",
            icon: undefined,
            role: "state",
        },
        viomiWaterHeaterWaterTemperature: {
            id: "waterTemp",
            property: "waterTemp",
            icon: undefined,
            role: "state",
        },
        viomiWaterHeaterErrStatus: {
            id: "errStatus",
            property: "errStatus",
            icon: undefined,
            role: "state",
        },
        viomiWaterHeaterHotWater: {
            id: "hotWater",
            property: "hotWater",
            icon: undefined,
            role: "state",
        },
        viomiWaterHeaterModeType: {
            id: "modeType",
            property: "modeType",
            icon: undefined,
            role: "state",
        },
        viomiWaterHeaterAppointStart: {
            id: "appointStart",
            property: "appointStart",
            icon: undefined,
            role: "state",
        },
        viomiWaterHeaterAppointEnd: {
            id: "appointEnd",
            property: "appointEnd",
            icon: undefined,
            role: "state",
        },
        viomiWaterHeaterNeedClean: {
            id: "needClean",
            property: "needClean",
            icon: undefined,
            role: "state",
        },
    }
}

interface MiioIobDevice {
    type: string;
    vendor: string;
    models: string[];
    icon?: string;
    states: MiioIobState[];
}

const devices: MiioIobDevice[] = [
    {
        type: "waterheater",
        vendor: "viomi",
        models: ["viomi.waterheater.e1"],
        icon: "viomi_waterheater_e1.png",
        states: [
            states.rw.viomiWaterHeaterTemperature,
            states.wo.viomiWaterHeaterMode,
            states.wo.viomiWaterHeaterPower,
            states.ro.viomiWaterHeaterAppointEnd,
            states.ro.viomiWaterHeaterAppointStart,
            states.ro.viomiWaterHeaterErrStatus,
            states.ro.viomiWaterHeaterHotWater,
            states.ro.viomiWaterHeaterModeType,
            states.ro.viomiWaterHeaterNeedClean,
            states.ro.viomiWaterHeaterVelocity,
            states.ro.viomiWaterHeaterWashStatus,
            states.ro.viomiWaterHeaterWaterTemperature,
        ],
    },
]

function findBestMatchCommand(vendor: string,
    type: string,
    version: string,
    command: string): MiioCommand | undefined {
    let protocolCmd: Command | undefined;
    if (type in Devices) {
        if (vendor in Devices[type]["vendors"]) {
            if (version in Devices[type]["vendors"][vendor]["devices"]) {
                if (command in Devices[type]["vendors"][vendor]["devices"][version]["commands"]) {
                    protocolCmd = Devices[type]["vendors"][vendor]["devices"][version]["commands"][command];
                }
            } else {
                if (command in Devices[type]["vendors"][vendor]["commands"]) {
                    protocolCmd = Devices[type]["vendors"][vendor]["commands"][command];
                }
            }
        } else {
            if (command in Devices[type]["commands"]) {
                protocolCmd = Devices[type]["commands"][command];
            }
        }
    }

    if (protocolCmd) {
        const para: MiioAdapterCommandPara[] = [];

        for (const i in protocolCmd.parameters) {
            const p = protocolCmd.parameters[i];
            para.push({
                type: p.type
            });
        }

        return new MiioCommand(command, {
//            name: string;
//            desc?: string;
//            para?: MiioAdapterCommandPara[];
//            returnType?: string;
//            statePara?: MiioAdapterCommandPara;
            name: command,
            desc: protocolCmd.description,
            para: para
        })
    }
}

function findBestMatchProperty(vendor: string,
    type: string,
    version: string,
    property: string): MiioProperty | undefined  {
    let protocolProp: Property | undefined;
    if (type in Devices) {
        if (vendor in Devices[type]["vendors"]) {
            if (version in Devices[type]["vendors"][vendor]["devices"]) {
                if (property in Devices[type]["vendors"][vendor]["devices"][version]["properties"]) {
                    protocolProp = Devices[type]["vendors"][vendor]["devices"][version]["properties"][property];
                }
            } else {
                if (property in Devices[type]["vendors"][vendor]["properties"]) {
                    protocolProp = Devices[type]["vendors"][vendor]["properties"][property];
                }
            }
        } else {
            if (property in Devices[type]["properties"]) {
                protocolProp = Devices[type]["properties"][property];
            }
        }
    }

    if (protocolProp) {
        return new MiioProperty(property, {
//            name: string;
//            type: ioBroker.CommonType;
//            desc?: string;
//            vtype?: ioBroker.CommonType;
//            min?: number;
//            max?: number;
//            unit?: string;
//            role?: string;
//            obj?: Record<string, number|string|boolean>;
//            statePara?: MiioPropertyPara;
//            enum?: (string|number)[];
//            mapper?: (v:any) => any;
//            cmd?: string;
            name: property,
            desc: protocolProp.description,
            type: protocolProp.results[0].type,
        })
    }
}

function findSupportDevice(vendor: string, type: string, version: string): MiioIobDevice | undefined {
    for (const i in devices) {
        if (`${vendor}.${type}.${version}` in devices[i].models) {
            return devices[i];
        }
    }
}

function getDeviceRWStates(device: MiioIobDevice,
    vendor: string,
    type: string,
    version: string): Record<string, MiioAdapterRWState> {
    const states: Record<string, MiioAdapterRWState> = {}

    for (const i in device.states) {
        const state = device.states[i];
        if (("command" in state) && ("property" in state)) {
            const cmd = findBestMatchCommand(vendor, type, version, state.command);
            const prop = findBestMatchProperty(vendor, type, version, state.property);
            if (cmd && prop) {
                states[state.id] = {
                    command: cmd,
                    property: prop,
                }
            }
        }
    }
    return states;
}

function getDeviceROStates(device: MiioIobDevice,
    vendor: string,
    type: string,
    version: string): Record<string, MiioAdapterROState> {
    const states: Record<string, MiioAdapterROState> = {}

    for (const i in device.states) {
        const state = device.states[i];
        if (!("command" in state) && ("property" in state)) {
            const prop = findBestMatchProperty(vendor, type, version, state.property);
            if (prop) {
                states[state.id] = {
                    property: prop,
                }
            }
        }
    }
    return states;
}

function getDeviceWOStates(device: MiioIobDevice,
    vendor: string,
    type: string,
    version: string): Record<string, MiioAdapterWOState> {
    const states: Record<string, MiioAdapterWOState> = {}

    for (const i in device.states) {
        const state = device.states[i];
        if (("command" in state) && !("property" in state)) {
            const cmd = findBestMatchCommand(vendor, type, version, state.command);
            if (cmd) {
                states[state.id] = {
                    command: cmd,
                }
            }
        }
    }
    return states;
}

export function protocol2ReadWriteState (
    vendor: string,
    type: string,
    version: string): Record<string, MiioAdapterRWState> {
    const device = findSupportDevice(vendor, type, version);
    if (device) {
        return getDeviceRWStates(device, vendor, type, version);
    }
    return {}
}

export function protocol2ReadOnlyState (
    vendor: string,
    type: string,
    version: string): Record<string, MiioAdapterROState> {
    const device = findSupportDevice(vendor, type, version);
    if (device) {
        return getDeviceROStates(device, vendor, type, version);
    }
    return {}
}

export function protocol2WriteOnlyState (
    vendor: string,
    type: string,
    version: string): Record<string, MiioAdapterWOState> {
    const device = findSupportDevice(vendor, type, version);
    if (device) {
        return getDeviceWOStates(device, vendor, type, version);
    }
    return {}
}