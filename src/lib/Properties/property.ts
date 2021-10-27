export interface MiioPropertyPara {
    type: ioBroker.CommonType;
    vtype?: ioBroker.CommonType;
    min?: number;
    max?: number;
    unit?: string;
    role?: string;
};

export interface MiioPropertyOpt {
    name: string;
    type: ioBroker.CommonType;
    desc?: string;
    vtype?: ioBroker.CommonType;
    min?: number;
    max?: number;
    unit?: string;
    role?: string;
    obj?: Record<string, number|string|boolean>;
    statePara?: MiioPropertyPara;
    enum?: (string|number)[];
    mapper?: (v:any) => any;
    cmd?: string;
};

export class MiioProperty {
    public prop: string;
    public name: string;
    public statePara: MiioPropertyPara;
    public desc?: string;
    public type: ioBroker.CommonType;
    public vtype?: ioBroker.CommonType;
    public min?: number;
    public max?: number;
    public unit?: string;
    public obj?: Record<string, number|string|boolean>;
    public mapper?: (v:any) => any;
    public cmd?: string;

    constructor(prop: string, opt: MiioPropertyOpt) {
        this.prop = prop;
        this.name = opt.name;
        this.desc = opt.desc || undefined;
        this.type = opt.type || "string";
        this.vtype = opt.vtype;
        this.min = opt.min;
        this.max = opt.max;
        this.unit = opt.unit;
        this.obj = opt.obj;
        this.mapper = opt.mapper;
        this.cmd = opt.cmd;
        if (opt.statePara) {
            this.statePara = opt.statePara;
        } else {
            this.statePara = {
                type: opt.vtype || opt.type
            };
            if (opt.min !== undefined) {
                this.statePara.min = opt.min;
            }
            if (opt.max !== undefined) {
                this.statePara.max = opt.max;
            }
            if (opt.unit !== undefined) {
                this.statePara.unit = opt.unit;
            }
            if (opt.role !== undefined) {
                this.statePara.role = opt.role;
            }
        }
    }
};

/*************************** Supported Properties *****************************/
export class Power extends MiioProperty {
    constructor() {
        super("power", {
            name: "power",
            desc: "Current device power state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
};
    
export class Move extends MiioProperty {
    constructor() {
        super("move", {
            name: "move",
            desc: "Current device move state",
            type: "string",
            enum: ["left", "right"]
        });
    }
};

export class Aqi extends MiioProperty {
    constructor() {
        super("aqi", {
            name: "aqi",
            desc: "Air quality index value",
            unit: "μg/m³",
            type: "number"
        });
    }
};

export class AverageAqi extends MiioProperty {
    constructor() {
        super("average_aqi", {
            name: "average aqi",
            desc: "Average of the air quality index",
            unit: "μg/m³",
            type: "number"
        });
    }
};

export class Mode extends MiioProperty {
    constructor() {
        super("mode", {
            name: "mode",
            desc: "Current operation mode",
            type: "string",
            enum: ["auto", "silent", "favorite", "idle", "medium", "high", "strong"]
        });
    }
};

export class FilterLife extends MiioProperty {
    constructor() {
        super("filter_life", {
            name: "filter life",
            desc: "Time until the filter should be changed",
            unit: "days",
            type: "number"
        });
    }
};

export class F1HourUsed extends MiioProperty {
    constructor() {
        super("f1_hour_used", {
            name: "f1 hour used",
            desc: "How long the filter has been in use",
            unit: "hours",
            type: "number"
        });
    }
};

export class Motor1Speed extends MiioProperty {
    constructor() {
        super("motor1_speed", {
            name: "motor1 speed",
            desc: "Speed of the motor",
            type: "number"
        });
    }
};

export class Led extends MiioProperty {
    constructor() {
        super("led", {
            name: "led",
            desc: "Current LED stste",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
};

export class ChildLock extends MiioProperty {
    constructor() {
        super("child_lock", {
            name: "child lock",
            desc: "Current child lock state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
};

export class Buzzer extends MiioProperty {
    constructor() {
        super("buzzer", {
            name: "buzzer",
            desc: "Current buzzer state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
};

export class TempDec extends MiioProperty {
    constructor() {
        super("temp_dec", {
            name: "temp dec",
            desc: "Current temperature. Need divided by 10",
            unit: "°C",
            type: "number",
            role: "temperature",
            mapper: v => v/10,
        });
    }
};

export class Humidity extends MiioProperty {
    constructor() {
        super("humidity", {
            name: "humidity",
            desc: "Current humidity",
            unit: "%",
            type: "number",
            role: "humidity"
        });
    }
};

export class UseTime extends MiioProperty {
    constructor() {
        super("use_time", {
            name: "use time",
            desc: "How long the device has been active in seconds",
            unit: "secs",
            type: "number"
        });
    }
};

export class FavoriteLevel extends MiioProperty {
    constructor() {
        super("favorite_level", {
            name: "favorite level",
            desc: "Thw level which is used for favorite mode",
            min: 0,
            max: 17,
            type: "number"
        });
    }
};

export class Co2 extends MiioProperty {
    constructor() {
        super("co2", {
            name: "co2",
            desc: "Carbon dioxide",
            unit: "ppm",
            type: "number"
        });
    }
};

export class Pm25 extends MiioProperty {
    constructor() {
        super("pm25", {
            name: "pm25",
            desc: "Particulate Matter 2.5 (PM25)",
            unit: "ug/m3",
            type: "number"
        });
    }
};

export class Tvoc extends MiioProperty {
    constructor() {
        super("tvoc", {
            name: "tvoc",
            desc: "Total volatile organic compounds",
            unit: "mg/m3",
            type: "number",
            mapper: v => v*0.001
        });
    }
};

export class LedLevel extends MiioProperty {
    constructor() {
        super("led_level", {
            name: "led level",
            desc: "Brightness of the LED",
            type: "number"
        });
    }
};

export class Battery extends MiioProperty {
    constructor() {
        super("battery", {
            name: "battery",
            desc: "Current battery level",
            unit: "%",
            type: "number"
        });
    }
};

export class UsbState extends MiioProperty {
    constructor() {
        super("usb_state", {
            name: "usb state",
            desc: "Device's usb connection state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
};

export class TimeState extends MiioProperty {
    constructor() {
        super("time_state", {
            name: "time state",
            desc: "Display a clock instead the AQI",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
};

export class NightState extends MiioProperty {
    constructor() {
        super("night_state", {
            name: "night state",
            desc: "Device current night mode state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
};

export class Filter1Life extends MiioProperty {
    constructor() {
        super("filter1_life", {
            name: "filter1 life",
            desc: "Time until the filter should be changed",
            unit: "days",
            type: "number"
        });
    }
};

export class Bright extends MiioProperty {
    constructor() {
        super("bright", {
            name: "bright",
            desc: "Current brightness",
            min: 0,
            max: 100,
            unit: "%",
            type: "number"
        });
    }
};

export class LedB extends MiioProperty {
    constructor() {
        super("led_b", {
            name: "led b",
            desc: "LED brightness",
            min: 0,
            max: 2,
            type: "number"
        });
    }
};

export class Angle extends MiioProperty {
    constructor() {
        super("angle", {
            name: "angle",
            desc: "Current angle",
            type: "number"
        });
    }
};

export class NaturalLevel extends MiioProperty {
    constructor() {
        super("natural_level", {
            name: "natural level",
            desc: "Set natural level",
            min: 0,
            max: 100,
            unit: "%",
            type: "number"
        });
    }
};

export class SpeedLevel extends MiioProperty {
    constructor() {
        super("speed_level", {
            name: "speed level",
            desc: "Set speed level",
            min: 0,
            max: 100,
            unit: "%",
            type: "number"
        });
    }
};

export class AngleEnable extends MiioProperty {
    constructor() {
        super("angle_enable", {
            name: "angle enable",
            desc: "Oscillation state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
};

export class Speed extends MiioProperty {
    constructor() {
        super("speed", {
            name: "speed",
            desc: "Current fan speed",
            type: "number"
        });
    }
};

export class AcPower extends MiioProperty {
    constructor() {
        super("ac_power", {
            name: "ac power",
            desc: "Powered by AC",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
};

export class PoweroffTime extends MiioProperty {
    constructor() {
        super("poweroff_time", {
            name: "poweroff time",
            desc: "Countdown until turning off in seconds",
            unit: "secs",
            type: "number"
        });
    }
};

export class HwVersion extends MiioProperty {
    constructor() {
        super("hw_version", {
            name: "hw version",
            desc: "The hardware version",
            type: "number"
        });
    }
};

export class LimitHum extends MiioProperty {
    constructor() {
        super("limit_hum", {
            name: "limit hum",
            desc: "Target humidity",
            type: "number",
            unit: "%",
            enum: [30, 40, 50, 60, 70, 80]
        });
    }
};

export class Tds extends MiioProperty {
    constructor() {
        super("tds", {
            name: "tds",
            desc: "Water TDS",
            unit: "mg/L",
            type: "number"
        });
    }
};

export class WaterRemainTime extends MiioProperty {
    constructor() {
        super("water_remain_time", {
            name: "water remain time",
            desc: "Water Storage Time",
            unit: "Hours",
            type: "number"
        });
    }
};

export class CurrTempe extends MiioProperty {
    constructor() {
        super("curr_tempe", {
            name: "curr tempe",
            desc: "Current input water temperature.",
            unit: "°C",
            type: "number"
        });
    }
};

export class SetupTempe extends MiioProperty {
    constructor() {
        super("setup_tempe", {
            name: "setup tempe",
            desc: "Output water temperature",
            unit: "°C",
            type: "number"
        });
    }
};

export class MinSetTempe extends MiioProperty {
    constructor() {
        super("min_set_tempe", {
            name: "min set tempe",
            desc: "Minmum setup temperature can be set",
            unit: "°C",
            type: "number"
        });
    }
};

export class DrinkRemind extends MiioProperty {
    constructor() {
        super("drink_remind", {
            name: "drink remind",
            desc: "Enable drink reminder",
            type: "number",
            vtype: "boolean",
            obj: {
                1: true,
                0: false
            }
        });
    }
};

export class DrinkRemindTime extends MiioProperty {
    constructor() {
        super("drink_remind_time", {
            name: "drink remind time",
            desc: "Drink reminder time duration",
            unit: "hours",
            type: "number"
        });
    }
};

export class WorkMode extends MiioProperty {
    constructor() {
        super("work_mode", {
            name: "work mode",
            desc: "Current work mode",
            type: "number",
            vtype: "string",
            obj: {
                0: "cold water",
                1: "warm water",
                2: "boil water",
            }
        });
    }
};

export class DrinkTimeCount extends MiioProperty {
    constructor() {
        super("drink_time_count", {
            name: "drink time count",
            desc: "Last drink time count",
            unit: "hours",
            type: "number"
        });
    }
};

export class Temperature extends MiioProperty {
    constructor() {
        super("temperature", {
            name: "temperature",
            desc: "Current temperature.",
            unit: "°C",
            type: "number",
            role: "temperature"
        });
    }
};

export class Current extends MiioProperty {
    constructor() {
        super("current", {
            name: "current",
            desc: "Current value",
            unit: "A",
            type: "number"
        });
    }
};

export class PowerstripMode extends MiioProperty {
    constructor() {
        super("mode", {
            name: "mode",
            desc: "Current powerstrip mode",
            type: "string",
            enum: ["green", "normal"]
        });
    }
};

export class PowerConsumeRate extends MiioProperty {
    constructor() {
        super("power_consume_rate", {
            name: "power consume rate",
            desc: "Current power load",
            unit: "kW",
            type: "number"
        });
    }
};

export class Filter1State extends MiioProperty {
    constructor() {
        super("filter1_state", {
            name: "filter1 state",
            desc: "",
            type: "string"
        });
    }
};

export class FilterState extends MiioProperty {
    constructor() {
        super("filter_state", {
            name: "filter state",
            desc: "",
            type: "string"
        });
    }
};

export class Life extends MiioProperty {
    constructor() {
        super("life", {
            name: "life",
            desc: "",
            unit: "days",
            type: "number"
        });
    }
};

export class State extends MiioProperty {
    constructor() {
        super("state", {
            name: "state",
            desc: "",
            type: "string"
        });
    }
};

export class Level extends MiioProperty {
    constructor() {
        super("level", {
            name: "level",
            desc: "",
            type: "number"
        });
    }
};

export class Volume extends MiioProperty {
    constructor() {
        super("volume", {
            name: "volume",
            desc: "Volume of sound notifications",
            min: 0,
            max: 100,
            unit: "%",
            type: "number"
        });
    }
};

export class Filter extends MiioProperty {
    constructor() {
        super("filter", {
            name: "filter",
            desc: "",
            type: "string"
        });
    }
};

export class Usage extends MiioProperty {
    constructor() {
        super("usage", {
            name: "usage",
            desc: "",
            type: "string"
        });
    }
};

export class UvLife extends MiioProperty {
    constructor() {
        super("uv_life", {
            name: "uv life",
            desc: "",
            unit: "days",
            type: "number"
        });
    }
};

export class UvState extends MiioProperty {
    constructor() {
        super("uv_state", {
            name: "uv state",
            desc: "",
            type: "string"
        });
    }
};

export class ElecvalState extends MiioProperty {
    constructor() {
        super("elecval_state", {
            name: "elecval state",
            desc: "Current valve state",
            type: "string"
        });
    }
};

export class Cct extends MiioProperty {
    constructor() {
        super("cct", {
            name: "cct",
            desc: "Current color temperature",
            type: "number",
            min: 1,
            max: 100,
            unit: "%"
        });
    }
};

export class Voltage extends MiioProperty {
    constructor() {
        super("voltage", {
            name: "voltage",
            desc: "The voltage",
            unit: "V",
            type: "number"
        });
    }
};

export class PowerFactor extends MiioProperty {
    constructor() {
        super("power_factor", {
            name: "power factor",
            desc: "The power factor",
            type: "number"
        });
    }
};

export class ElecLeakage extends MiioProperty {
    constructor() {
        super("elec_leakage", {
            name: "elec leakage",
            desc: "The leakage current",
            type: "number"
        });
    }
};

export class Ct extends MiioProperty {
    constructor() {
        super("ct", {
            name: "ct",
            desc: "Current color temperature",
            type: "number",
            min: 1700,
            max: 6500,
            unit: "K"
        });
    }
};

export class Rgb extends MiioProperty {
    constructor() {
        super("rgb", {
            name: "rgb",
            desc: "color in RGB",
            type: "string"
        });
    }
};

export class SaveState extends MiioProperty {
    constructor() {
        super("save_state", {
            name: "save state",
            desc: "Return whether the bulb state is saved on change",
            type: "string",
            vtype: "boolean",
            obj: {
                "1": true,
                "0": false
            }
        });
    }
};

export class FCFD extends MiioProperty {
    constructor() {
        super("fcfd", {
            name: "Front active carbon filter",
            desc: "Front active carbon filter",
            unit: "%",
            type: "number"
        });
    }
};

export class FCFP extends MiioProperty {
    constructor() {
        super("fcfp", {
            name: "Front active carbon filter day",
            desc: "Front active carbon filter day",
            unit: "days",
            type: "number"
        });
    }
};

export class FTDS extends MiioProperty {
    constructor() {
        super("ftds", {
            name: "Filtered water",
            desc: "Filtered water",
            unit: "TDS",
            type: "number"
        });
    }
};

export class PFD extends MiioProperty {
    constructor() {
        super("pfd", {
            name: "PP cotton filter",
            desc: "PP cotton filter",
            unit: "%",
            type: "number"
        });
    }
};

export class PFP extends MiioProperty {
    constructor() {
        super("pfp", {
            name: "PP cotton filter day",
            desc: "PP cotton filter day",
            unit: "days",
            type: "number"
        });
    }
};

export class RCFD extends MiioProperty {
    constructor() {
        super("rcfd", {
            name: "Rear active carbon filter",
            desc: "Rear active carbon filter",
            unit: "%",
            type: "number"
        });
    }
};

export class RCFP extends MiioProperty {
    constructor() {
        super("rcfp", {
            name: "Rear active carbon filter day",
            desc: "Rear active carbon filter day",
            unit: "days",
            type: "number"
        });
    }
};

export class RFD extends MiioProperty {
    constructor() {
        super("rfd", {
            name: "RO filter",
            desc: "RO filter",
            unit: "%",
            type: "number"
        });
    }
};

export class RFP extends MiioProperty {
    constructor() {
        super("rfp", {
            name: "RO filter day",
            desc: "RO filter day",
            unit: "days",
            type: "number"
        });
    }
};

export class TTDS extends MiioProperty {
    constructor() {
        super("ttds", {
            name: "Tap water",
            desc: "Tap water",
            unit: "TDS",
            type: "number"
        });
    }
};

export class PowerPrice extends MiioProperty {
    constructor() {
        super("power_price", {
            name: "power price",
            desc: "The stored power price",
            min: 0,
            max: 999,
            unit: "/kwh",
            type: "number"
        });
    }
};

export class WifiLed extends MiioProperty {
    constructor() {
        super("wifi_led", {
            name: "wifi led",
            desc: "Current device WiFi LED state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
};

export class On extends MiioProperty {
    constructor() {
        super("on", {
            name: "on",
            desc: "True if device is on",
            type: "boolean"
        });
    }
};

export class UsbOn extends MiioProperty {
    constructor() {
        super("usb_on", {
            name: "usb on",
            desc: "True if device USB power is on",
            type: "boolean"
        });
    }
};

export class GetPower extends MiioProperty {
    constructor() {
        super("get_power", {
            name: "get power",
            desc: "Get plug power",
            unit: "W",
            type: "number",
            mapper: v => v*0.01,
            cmd: "get_power"
        });
    }
};

export class Pow extends MiioProperty {
    constructor() {
        super("pow", {
            name: "pow",
            desc: "Current device power state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
};

export class Bri extends MiioProperty {
    constructor() {
        super("bri", {
            name: "bri",
            desc: "Current brightness",
            min: 0,
            max: 100,
            unit: "%",
            type: "number",
            role: "level.brightness"
        });
    }
};

export class AmbStatus extends MiioProperty {
    constructor() {
        super("ambstatus", {
            name: "ambstatus",
            desc: "Ambient light state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
};

export class AmbValue extends MiioProperty {
    constructor() {
        super("ambvalue", {
            name: "ambvalue",
            desc: "Brightness of the ambient light",
            min: 1,
            max: 100,
            unit: "%",
            type: "number"
        });
    }
};

export class EyeCare extends MiioProperty {
    constructor() {
        super("eyecare", {
            name: "eyecare",
            desc: "Current eyecare mode",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
};

export class PurifyVolume extends MiioProperty {
    constructor() {
        super("purify_volume", {
            name: "purify volume",
            desc: "The volume of purified air in cubic meter",
            unit: "m³",
            type: "number"
        });
    }
};

export class ActSleep extends MiioProperty {
    constructor() {
        super("act_sleep", {
            name: "act sleep",
            desc: "Learn mode state",
            type: "string",
            vtype: "boolean",
            obj: {
                single: true,
                close: false
            }
        });
    }
};

export class Motor2Speed extends MiioProperty {
    constructor() {
        super("motor2_speed", {
            name: "motor2 speed",
            desc: "Speed of the 2nd motor",
            type: "number"
        });
    }
};

export class BatCharge extends MiioProperty {
    constructor() {
        super("bat_charge", {
            name: "bat charge",
            desc: "State of the battery charger",
            type: "string"
        });
    }
};

export class ButtonPressed extends MiioProperty {
    constructor() {
        super("button_pressed", {
            name: "button pressed",
            desc: "Last pressed button",
            type: "string"
        });
    }
};

export class BatState extends MiioProperty {
    constructor() {
        super("bat_state", {
            name: "bat state",
            desc: "State of the battery",
            type: "string"
        });
    }
};

export class Depth extends MiioProperty {
    constructor() {
        super("depth", {
            name: "depth",
            desc: "The remaining amount of water in percent",
            min: 0,
            max: 100,
            mapper: v => v/1.2,
            unit: "%",
            type: "number"
        });
    }
};

export class Dry extends MiioProperty {
    constructor() {
        super("dry", {
            name: "dry",
            desc: "Dry mode: The amount of water is not enough to continue to work for about 8 hours.",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
};
