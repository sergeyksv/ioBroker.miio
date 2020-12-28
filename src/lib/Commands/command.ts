export interface MiioAdapterCommandPara {
    type: ioBroker.CommonType;
    vtype?: ioBroker.CommonType;
    max?: number;
    min?: number;
    unit?: string;
    enum?: (number | string)[];
    obj?: Record<string, number | string | MiioCommand>;
    default?: string | number;
    role?: string;
}

export interface MiioCommandOpt {
    name: string;
    desc?: string;
    para?: MiioAdapterCommandPara[];
    returnType?: string;
    statePara?: MiioAdapterCommandPara;
};

export class MiioCommand {
    public command: string;
    public name: string;
    public statePara?: MiioAdapterCommandPara;
    public desc?: string;
    public para?: MiioAdapterCommandPara[];
    public returnType?: string;

    constructor(command: string, opt: MiioCommandOpt) {
        this.command = command;
        this.name = opt.name;
        this.desc = opt.desc || undefined;
        this.para = opt.para || [];
        this.returnType = opt.returnType || undefined;
        if (this.para.length) {
            if (opt.statePara) {
                this.statePara = opt.statePara;
            } else {
                this.statePara = {
                    type: this.para[0].type
                };
                if (this.para[0].min !== undefined) {
                    this.statePara.min = this.para[0].min;
                }
                if (this.para[0].max !== undefined) {
                    this.statePara.max = this.para[0].max;
                }
                if (this.para[0].unit !== undefined) {
                    this.statePara.unit = this.para[0].unit;
                }
                if (this.para[0].role !== undefined) {
                    this.statePara.role = this.para[0].role;
                }
            }
        }
    }
};

/*************************** Supported Commands *******************************/
export class SetPower extends MiioCommand {
    constructor() {
        super("set_power", {
            name: "set power",
            desc: "Set power on/off",
            para: [{
                type: "boolean",
                vtype: "string",
                obj: {
                    true: "on",
                    false: "off"
                },
                role: "switch"
            }]
        });
    }
};

export class SetMove extends MiioCommand {
    constructor() {
        super("set_move", {
            name: "set move",
            desc: "Set move right/left",
            para: [{
                type: "string",
                enum: ["right", "left"]
            }]
        });
    }
};

export class SetMode extends MiioCommand {
    constructor() {
        super("set_mode", {
            name: "set mode",
            desc: "Set mode",
            para: [{
                type: "string",
                enum: ["auto", "silent", "favorite", "idle", "medium", "high", "strong"]
            }]
        });
    }
};

export class SetLed extends MiioCommand {
    constructor() {
        super("set_led", {
            name: "set led",
            desc: "Turn led on/off",
            para: [{
                type: "boolean",
                vtype: "string",
                obj: {
                    true: "on",
                    false: "off"
                }
            }]
        });
    }
};

export class SetChildLock extends MiioCommand {
    constructor() {
        super("set_child_lock", {
            name: "set child lock",
            desc: "Set child lock on/off",
            para: [{
                type: "boolean",
                vtype: "string",
                obj: {
                    true: "on",
                    false: "off"
                }
            }]
        });
    }
};

export class SetBuzzer extends MiioCommand {
    constructor() {
        super("set_buzzer", {
            name: "set buzzer",
            desc: "Set buzzer on/off",
            para: [{
                type: "boolean",
                vtype: "string",
                obj: {
                    true: "on",
                    false: "off"
                }
            }]
        });
    }
};

export class SetLevelFavorite extends MiioCommand {
    constructor() {
        super("set_level_favorite", {
            name: "set level favorite",
            desc: "Set favorite level",
            para: [{
                min: 0,
                max: 17,
                type: "number"
            }]
        });
    }
};

export class SetTimeState extends MiioCommand {
    constructor() {
        super("set_time_state", {
            name: "set time state",
            desc: "Enable/disable displaying a clock instead the AQI",
            para: [{
                type: "boolean",
                vtype: "string",
                obj: {
                    true: "on",
                    false: "off"
                }
            }]
        });
    }
};

export class SetNightState extends MiioCommand {
    constructor() {
        super("set_night_state", {
            name: "set night state",
            desc: "Decrease the brightness of the display",
            para: [{
                type: "boolean",
                vtype: "string",
                obj: {
                    true: "on",
                    false: "off"
                }
            }]
        });
    }
};

export class SetLedB extends MiioCommand {
    constructor() {
        super("set_led_b", {
            name: "set led b",
            desc: "Set led brightness",
            para: [{
                min: 0,
                max: 2,
                type: "number",
            }]
        });
    }
};

export class SetAngle extends MiioCommand {
    constructor() {
        super("set_angle", {
            name: "set angle",
            desc: "Set the oscillation angle",
            para: [{
                min: 0,
                max: 120,
                type: "number"
            }]
        });
    }
};

export class SetNaturalLevel extends MiioCommand {
    constructor() {
        super("set_natural_level", {
            name: "set natural level",
            desc: "Set natural level",
            para: [{
                min: 0,
                max: 100,
                type: "number"
            }]
        });
    }
};

export class SetSpeedLevel extends MiioCommand {
    constructor() {
        super("set_speed_level", {
            name: "set speed level",
            desc: "Set speed of the direct mode",
            para: [{
                min: 0,
                max: 100,
                type: "number"
            }]
        });
    }
};

export class SetAngleEnable extends MiioCommand {
    constructor() {
        super("set_angle_enable", {
            name: "set angle enable",
            desc: "Set oscillate on/off",
            para: [{
                type: "boolean",
                vtype: "string",
                obj: {
                    true: "on",
                    false: "off"
                }
            }]
        });
    }
};

export class SetPoweroffTime extends MiioCommand {
    constructor() {
        super("set_poweroff_time", {
            name: "set poweroff time",
            desc: "Set delay off seconds",
            para: [{
                min: 1,
                unit: "secs",
                type: "number"
            }]
        });
    }
};

export class SetLimitHum extends MiioCommand {
    constructor() {
        super("set_limit_hum", {
            name: "set limit hum",
            desc: "Set the target humidity",
            para: [{
                type: "number",
                enum: [30, 40, 50, 60, 70, 80]
            }]
        });
    }
};

export class SetTempeSetup extends MiioCommand {
    constructor() {
        super("set_tempe_setup", {
            name: "set tempe setup",
            desc: "Set setup temperature",
            para: [{
                min: 1,
                max: 100,
                unit: "°C",
                type: "number",
                role: "level"
            }]
        });
    }
};

export class SetDrinkRemindEnable extends MiioCommand {
    constructor() {
        super("set_drink_remind_enable", {
            name: "set drink remind enable",
            desc: "Set setup drink reminder",
            para: [{
                type: "boolean",
                vtype: "number",
                obj: {
                    true: 1,
                    false: 0
                }
            }]
        });
    }
};

export class SetDrinkRemindTime extends MiioCommand {
    constructor() {
        super("set_drink_remind_time", {
            name: "set drink remind time",
            desc: "Set setup drink reminder time",
            para: [{
                //hours
                unit: "hours",
                enum: [0, 1, 2, 3, 4, 6, 8, 10, 12],
                type: "number"
            }]
        });
    }
};

export class SetBright extends MiioCommand {
    constructor() {
        super("set_bright", {
            name: "set bright",
            desc: "Set brightness level",
            para: [{
                min: 0,
                max: 100,
                type: "number",
                role: "level.brightness"
            }]
        });
    }
};

export class SetCct extends MiioCommand {
    constructor() {
        super("set_cct", {
            name: "set cct",
            desc: "Set Correlated Color Temperature",
            para: [{
                min: 1,
                max: 100,
                type: "number"
            }]
        });
    }
};

export class SetCtAbx extends MiioCommand {
    constructor() {
        super("set_ct_abx", {
            name: "set ct abx",
            desc: "Set color temp in kelvin",
            para: [{
                //kelvin
                min: 1700,
                max: 6500,
                type: "number",
                role: "level.color.temperature"
            }, {
                //mode
                type: "string",
                enum: [
                    "smooth",
                    "sudden"
                ],
                default: "smooth"
            }, {
                //transition
                min: 0,
                type: "number",
                default: 500
            }]
        });
    }
};

export class SetRgb extends MiioCommand {
    constructor() {
        super("set_rgb", {
            name: "set rgb",
            desc: "Set color in RGB",
            para: [{
                type: "string",
                role: "level.color.rgb"
            }]
        });
    }
};

export class SetPs extends MiioCommand {
    constructor() {
        super("set_ps", {
            name: "set ps",
            desc: "Turn more function on/off",
            para: [{
                type: "string",
                enum: [
                    "cfg_lan_ctrl",     //developer mode
                    "cfg_save_state"    //saving the state on changes
                ],
                default: "cfg_save_state"
            }, {
                type: "boolean",
                vtype: "string",
                obj: {
                    true: "1",
                    false: "0"
                }
            }],
            statePara: {
                type: "boolean"
            }
        });
    }
};

export class SetPowerPrice extends MiioCommand {
    constructor() {
        super("set_power_price", {
            name: "set power price",
            desc: "Set the power price",
            para: [{
                min: 0,
                max: 999,
                type: "number"
            }]
        });
    }
};

export class SetWifiLed extends MiioCommand {
    constructor() {
        super("set_wifi_led", {
            name: "set wifi led",
            desc: "Set the wifi led on/off",
            para: [{
                type: "boolean",
                vtype: "string",
                obj: {
                    true: "on",
                    false: "off"
                },
                role: "switch"
            }]
        });
    }
};

class SetOn extends MiioCommand {
    constructor() {
        super("set_on", {
            name: "set on",
            desc: "Power on"
        });
    }
};

class SetOff extends MiioCommand {
    constructor() {
        super("set_off", {
            name: "set off",
            desc: "Power off"
        });
    }
};

export class SetPowerChuangmiPlugV3 extends MiioCommand {
    constructor() {
        super("CommandInPara", {
            name: "set power for chuangmi.plug.v3",
            desc: "set power for chuangmi.plug.v3",
            para: [{
                type: "boolean",
                obj: {
                    true: new SetOn(),
                    false: new SetOff()
                },
                role: "switch"
            }]
        });
    }
};

class SetUsbOn extends MiioCommand {
    constructor() {
        super("set_usb_on", {
            name: "set usb on",
            desc: "USB Power on"
        });
    }
};

class SetUsbOff extends MiioCommand {
    constructor() {
        super("set_usb_off", {
            name: "set usb off",
            desc: "USB Power off"
        });
    }
};

export class SetUsbPowerChuangmiPlugV3 extends MiioCommand {
    constructor() {
        super("CommandInPara", {
            name: "set usb power for chuangmi.plug.v3",
            desc: "set usb power for chuangmi.plug.v3",
            para: [{
                type: "boolean",
                obj: {
                    true: new SetUsbOn(),
                    false: new SetUsbOff()
                },
                role: "switch"
            }]
        });
    }
};

export class EnableAmb extends MiioCommand {
    constructor() {
        super("enable_amb", {
            name: "enable amb",
            desc: "Set ambient light",
            para: [{
                type: "boolean",
                vtype: "string",
                obj: {
                    true: "on",
                    false: "off"
                },
                role: "switch"
            }]
        });
    }
};

export class SetAmbBright extends MiioCommand {
    constructor() {
        super("set_amb_bright", {
            name: "set amb bright",
            desc: "Set the brightness of the ambient light",
            para: [{
                min: 1,
                max: 100,
                type: "number",
                role: "level.brightness"
            }]
        });
    }
};

export class SetEyeCare extends MiioCommand {
    constructor() {
        super("set_eyecare", {
            name: "set eyecare",
            desc: "Set eyecare mode on/off",
            para: [{
                type: "boolean",
                vtype: "string",
                obj: {
                    true: "on",
                    false: "off"
                },
                role: "switch"
            }]
        });
    }
};

export class SetActSleep extends MiioCommand {
    constructor() {
        super("set_act_sleep", {
            name: "set act sleep",
            desc: "Set the Learn Mode on/off",
            para: [{
                type: "boolean",
                vtype: "string",
                obj: {
                    true: "single",
                    false: "close"
                }
            }]
        });
    }
};

export class SetVolume extends MiioCommand {
    constructor() {
        super("set_volume", {
            name: "set volume",
            desc: "Set volume of sound notifications",
            para: [{
                min: 0,
                max: 100,
                type: "number"
            }]
        });
    }
};

export class SetDry extends MiioCommand {
    constructor() {
        super("set_dry", {
            name: "set dry",
            desc: "Set dry mode on/off",
            para: [{
                type: "boolean",
                vtype: "string",
                obj: {
                    true: "on",
                    false: "off"
                }
            }]
        });
    }
};
