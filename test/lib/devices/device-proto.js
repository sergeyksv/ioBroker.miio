const EventEmitter = require("events");

class MiioTestDevice extends EventEmitter {
    constructor(model) {
        super();
        this._model = model;
        this._address = `192.168.${Math.floor(100 + Math.random() * 900)}.${Math.floor(100 + Math.random() * 900)}`;
        this._token = `${Math.floor(100000000000 + Math.random() * 900000000000)}`;
        this._id = Math.floor(100000 + Math.random() * 900000);
        this._pollMS = 3000;
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

    get deviceId() {
        return `${this._id}`;
    }

    get rinfo() {
        return {
            address: this._address,
            port: 54321
        };
    }

    get address() {
        return this._address;
    }

    get port() {
        return 54321;
    }

    get token() {
        return this._token;
    }

    handshake() {
        return Promise.resolve(this.token);
    }

    destroy() {
        return;
    };

    updatePollDuration(ms) {
        this._pollMS = ms;
    };

    checkOk() {
        return;
    };

    defineProperty(prop, def) {
        return;
    };

    propertyUpdated(p, v) {
        return;
    };

    call(command, paras) {
        return ;
    };

    loadProperties(props) {
        return [];
    };
}

module.exports = MiioTestDevice;