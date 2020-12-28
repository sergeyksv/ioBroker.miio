import { MiioAdapterRWState, MiioAdapterROState } from "../device";
import * as WaterPuri from "../Type/waterpuri";
import { Device } from "miio-lite";
import { objectExtend } from "../../tools";
import {
    FCFD,
    FCFP,
    FTDS,
    PFD,
    PFP,
    RCFD,
    RCFP,
    RFD,
    RFP,
    TTDS
} from "../../Properties/property";

export class DeviceClass extends WaterPuri.DeviceClass {
    public get deviceName() {
        return "yunmi.waterpuri";
    }

    public get deviceType() {
        return "VendorTypeDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return objectExtend(super.rwState, {
            power: {
                delete: true
            }
        });
    }

    public get roState(): Record<string, MiioAdapterROState> {
        return objectExtend(super.roState, {
            FrontActiveCarbonFilter: {
                property: new FCFD(),
            },
            FrontActiveCarbonFilterDay: {
                property: new FCFP(),
            },
            FilteredWaterTDS: {
                property: new FTDS(),
            },
            PPCottonFilter: {
                property: new PFD(),
            },
            PPCottonFilterDay: {
                property: new PFP(),
            },
            RearActiveCarbonFilter: {
                property: new RCFD(),
            },
            RearActiveCarbonFilterDay: {
                property: new RCFP(),
            },
            ROFilter: {
                property: new RFD(),
            },
            ROFilterDay: {
                property: new RFP(),
            },
            TapWaterTDS: {
                property: new TTDS(),
            },
            TDS: {
                delete: true
            },
            filter1Life: {
                delete: true
            },
            filter1State: {
                delete: true
            },
            filterLife: {
                delete: true
            },
            filterState: {
                delete: true
            },
            life: {
                delete: true
            },
            state: {
                delete: true
            },
            level: {
                delete: true
            },
            volume: {
                delete: true
            },
            Filter: {
                delete: true
            },
            usage: {
                delete: true
            },
            temperature: {
                delete: true
            },
            uvLife: {
                delete: true
            },
            uvState: {
                delete: true
            },
            elecvalState: {
                delete: true
            }
        });
    }

    public constructor(miioDev: Device) {
        super(miioDev);
        // WARNING: Hack miio lib
        this.miioDevice.loadProperties = this.loadProperties.bind(this);
    }

    /**
     * 
     */
    loadProperties() {
        // Call get_prop to map everything
        return this.miioDevice.call("get_prop", []).then((result: number[]) => {
            const obj = {};
            // @ts-ignore
            this.miioDev._pushProperty(obj, "ttds", result[0]);
            // @ts-ignore
            this.miioDev._pushProperty(obj, "ftds", result[1]);

            const pfd = (result[11] - result[3]) / 24;
            // @ts-ignore
            this.miioDev._pushProperty(obj, "pfp", Math.floor(pfd));
            // @ts-ignore
            this.miioDev._pushProperty(obj, "pfd", Math.floor(pfd * 24 * 100 / result[11]));

            const fcfd = (result[13] - result[5]) / 24;
            // @ts-ignore
            this.miioDev._pushProperty(obj, "fcfp", Math.floor(fcfd));
            // @ts-ignore
            this.miioDev._pushProperty(obj, "fcfd", Math.floor(fcfd * 24 * 100 / result[13]));

            const rfd = (result[15] - result[7]) / 24;
            // @ts-ignore
            this.miioDev._pushProperty(obj, "rfp", Math.floor(rfd));
            // @ts-ignore
            this.miioDev._pushProperty(obj, "rfd", Math.floor(rfd * 24 * 100 / result[15]));

            const rcfd = (result[17] - result[9]) / 24;
            // @ts-ignore
            this.miioDev._pushProperty(obj, "rcfp", Math.floor(rcfd));
            // @ts-ignore
            this.miioDev._pushProperty(obj, "rcfd", Math.floor(rcfd * 24 * 100 / result[17]));

            return obj;
        });
    }
};