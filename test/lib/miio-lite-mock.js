const EventEmitter = require("events");
const network = require("./network-mock");

class Browser extends EventEmitter {
    static get type() {
        return "miio";
    }

    constructor(options) {
        super();

        this.manualTokens = options.tokens || {};
        this.tryAdd = this.tryAdd.bind(this);

        setImmediate(() => {
            this.start();
        });
    }

    _manualToken(id) {
        return this.manualTokens[id] || null;
    }

    start() {
        this.handle = network.ref();
        network.on("device", this.tryAdd);
        network.search();
    }

    stop() {
        network.removeListener("device", this.tryAdd);
        this.handle && this.handle.release();
    }

    tryAdd(device) {
        const service = {
            id: device.id,
            address: device.address,
            port: device.port,
            token: device.token || this._manualToken(device.id),
            autoToken: device.autoToken
        };
        this.emit("available", service);
    }
}

module.exports.browse = function (options) {
    return new Browser(options || {});
};

module.exports.device = function (options) {
    // Connecting to a device via IP, ask the network if it knows about it
    return network.findDeviceViaAddress(options)
};