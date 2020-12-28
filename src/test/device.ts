import * as miio from "miio-lite";
import { EventEmitter } from "events";

export class MiioTestDevice extends EventEmitter implements miio.Device {
    private _model: string;
    private _address = `192.168.${Math.floor(100 + Math.random() * 900)}.${Math.floor(100 + Math.random() * 900)}`;
    private _token = `${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    private _id = Math.floor(100000 + Math.random() * 900000);
    private _pollMS = 3000;
    private _property = []

    constructor(model: string) {
        super();
        this._model = model;
    };

    get management() {
        return {
            model: this._model,
            address: this._address,
            token: this._token,
        }
    };

    get id() {
        return `miio:${this._id}`;
    }

    destroy() {
        return;
    };

    updatePollDuration(ms: number) {
        this._pollMS = ms;
    };

    checkOk() {
        return;
    };

    defineProperty(prop: any, def?: any) {
        return;
    };

    propertyUpdated(p: string, v: any) {
        return;
    };

    call(command: string, paras?: (string|number)[]) {
        return ;
    };

    loadProperties(props: any) {
        return [];
    };
}