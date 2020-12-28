const EventEmitter = require("events");
const debug = require("debug");
const definedDevices = require("./devices/devices-mock");


class Network extends EventEmitter {
    constructor() {
        super();

        this.addresses = new Map();
        this.devices = new Map();

        this.references = 0;
        this.debug = debug("miio:network");
    }

    search() {
        for (let i = 0; i < definedDevices.devices.length; i++) {
            const dev = definedDevices.devices[i];
            this.devices.set(dev.id, dev);
            this.addresses.set(dev.address, dev);
            this.emit("device", dev);
        }
    }

    findDeviceViaAddress(options) {
        const device = this.addresses.get(options.address);

        // Set the model if provided
        if (!device.model && options.model) {
            device.model = options.model;
        }

        return device.handshake()
            .catch(err => {
                if (err.code === 'missing-token') {
                    // Supress missing tokens - enrich should take care of that
                    return;
                }

                throw err;
            })
            .then(() => {
                if (!this.devices.has(device.id)) {
                    // This is a new device, keep track of it
                    this.devices.set(device.id, device);

                    return device;
                } else {
                    // Sanity, make sure that the device in the map is returned
                    return this.devices.get(device.id);
                }
            })
            .then(() => device);
    }

    list() {
        return this.devices.values();
    }

    ref() {
        this.debug("Grabbing reference to network");
        this.references++;
        this.updateSocket();

        let released = false;
        const self = this;
        return {
            release() {
                if (released) return;

                self.debug("Releasing reference to network");

                released = true;
                self.references--;

                self.updateSocket();
            }
        };
    }

    updateSocket() {
        this.debug("Mock network, no socket need to be create or release. Ref = " + this.references);
    }

    get socket() {
        if (!this._socket) {
            throw new Error('Network communication is unavailable, device might be destroyed');
        }

        return this._socket;
    }
}

module.exports = new Network();