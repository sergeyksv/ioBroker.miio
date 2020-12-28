"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const miio_dev_1 = require("miio-dev");
const command_1 = require("../Commands/command");
const property_1 = require("../Properties/property");
const states = {
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
};
const devices = [
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
];
function findBestMatchCommand(vendor, type, version, command) {
    let protocolCmd;
    if (type in miio_dev_1.Devices) {
        if (vendor in miio_dev_1.Devices[type]["vendors"]) {
            if (version in miio_dev_1.Devices[type]["vendors"][vendor]["devices"]) {
                if (command in miio_dev_1.Devices[type]["vendors"][vendor]["devices"][version]["commands"]) {
                    protocolCmd = miio_dev_1.Devices[type]["vendors"][vendor]["devices"][version]["commands"][command];
                }
            }
            else {
                if (command in miio_dev_1.Devices[type]["vendors"][vendor]["commands"]) {
                    protocolCmd = miio_dev_1.Devices[type]["vendors"][vendor]["commands"][command];
                }
            }
        }
        else {
            if (command in miio_dev_1.Devices[type]["commands"]) {
                protocolCmd = miio_dev_1.Devices[type]["commands"][command];
            }
        }
    }
    if (protocolCmd) {
        const para = [];
        for (const i in protocolCmd.parameters) {
            const p = protocolCmd.parameters[i];
            para.push({
                type: p.type
            });
        }
        return new command_1.MiioCommand(command, {
            //            name: string;
            //            desc?: string;
            //            para?: MiioAdapterCommandPara[];
            //            returnType?: string;
            //            statePara?: MiioAdapterCommandPara;
            name: command,
            desc: protocolCmd.description,
            para: para
        });
    }
}
function findBestMatchProperty(vendor, type, version, property) {
    let protocolProp;
    if (type in miio_dev_1.Devices) {
        if (vendor in miio_dev_1.Devices[type]["vendors"]) {
            if (version in miio_dev_1.Devices[type]["vendors"][vendor]["devices"]) {
                if (property in miio_dev_1.Devices[type]["vendors"][vendor]["devices"][version]["properties"]) {
                    protocolProp = miio_dev_1.Devices[type]["vendors"][vendor]["devices"][version]["properties"][property];
                }
            }
            else {
                if (property in miio_dev_1.Devices[type]["vendors"][vendor]["properties"]) {
                    protocolProp = miio_dev_1.Devices[type]["vendors"][vendor]["properties"][property];
                }
            }
        }
        else {
            if (property in miio_dev_1.Devices[type]["properties"]) {
                protocolProp = miio_dev_1.Devices[type]["properties"][property];
            }
        }
    }
    if (protocolProp) {
        return new property_1.MiioProperty(property, {
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
        });
    }
}
function findSupportDevice(vendor, type, version) {
    for (const i in devices) {
        if (`${vendor}.${type}.${version}` in devices[i].models) {
            return devices[i];
        }
    }
}
function getDeviceRWStates(device, vendor, type, version) {
    const states = {};
    for (const i in device.states) {
        const state = device.states[i];
        if (("command" in state) && ("property" in state)) {
            const cmd = findBestMatchCommand(vendor, type, version, state.command);
            const prop = findBestMatchProperty(vendor, type, version, state.property);
            if (cmd && prop) {
                states[state.id] = {
                    command: cmd,
                    property: prop,
                };
            }
        }
    }
    return states;
}
function getDeviceROStates(device, vendor, type, version) {
    const states = {};
    for (const i in device.states) {
        const state = device.states[i];
        if (!("command" in state) && ("property" in state)) {
            const prop = findBestMatchProperty(vendor, type, version, state.property);
            if (prop) {
                states[state.id] = {
                    property: prop,
                };
            }
        }
    }
    return states;
}
function getDeviceWOStates(device, vendor, type, version) {
    const states = {};
    for (const i in device.states) {
        const state = device.states[i];
        if (("command" in state) && !("property" in state)) {
            const cmd = findBestMatchCommand(vendor, type, version, state.command);
            if (cmd) {
                states[state.id] = {
                    command: cmd,
                };
            }
        }
    }
    return states;
}
function protocol2ReadWriteState(vendor, type, version) {
    const device = findSupportDevice(vendor, type, version);
    if (device) {
        return getDeviceRWStates(device, vendor, type, version);
    }
    return {};
}
exports.protocol2ReadWriteState = protocol2ReadWriteState;
function protocol2ReadOnlyState(vendor, type, version) {
    const device = findSupportDevice(vendor, type, version);
    if (device) {
        return getDeviceROStates(device, vendor, type, version);
    }
    return {};
}
exports.protocol2ReadOnlyState = protocol2ReadOnlyState;
function protocol2WriteOnlyState(vendor, type, version) {
    const device = findSupportDevice(vendor, type, version);
    if (device) {
        return getDeviceWOStates(device, vendor, type, version);
    }
    return {};
}
exports.protocol2WriteOnlyState = protocol2WriteOnlyState;
