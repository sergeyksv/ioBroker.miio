<h1>
    <img src="admin/miio.png" width="64"/>
    ioBroker.miio
</h1>

![Number of Installations](http://iobroker.live/badges/miio-installed.svg) 
![Number of Installations](http://iobroker.live/badges/miio-stable.svg) 
[![NPM version](http://img.shields.io/npm/v/iobroker.miio.svg)](https://www.npmjs.com/package/iobroker.miio)
[![Downloads](https://img.shields.io/npm/dm/iobroker.miio.svg)](https://www.npmjs.com/package/iobroker.miio)
[![Dependency Status](https://img.shields.io/gh/dontobi/iobroker.miio.svg)](https://david-dm.org/dontobi/iobroker.miio)
[![Known Vulnerabilities](https://snyk.io/test/github/dontobi/ioBroker.miio/badge.svg)](https://snyk.io/test/github/dontobi/ioBroker.miio)

[![NPM](https://nodei.co/npm/iobroker.miio.png?downloads=true)](https://nodei.co/npm/iobroker.miio/)

**Tests:** Linux/Mac/Windows: [![Travis-CI](http://img.shields.io/travis/dontobi/ioBroker.miio/master.svg)](https://travis-ci.org/dontobi/ioBroker.miio)

## miio adapter for ioBroker

This adapter controls devices which followed miIO protocol.

## Current supported device type

| Name                        | Type        | Model                 | Tested |
|---|---|---|---|---|
| Fresh Air System            | airfresh    | zhimi-airfresh-va2    | ❌     |
| Air Purifier v1             | airpurifier | zhimi.airpurifier.v1  | ❌     |
| Air Purifier v2             | airpurifier | zhimi.airpurifier.v2  | ❌     |
| Air Purifier v3             | airpurifier | zhimi.airpurifier.v3  | ❌     |
| Air Purifier v5             | airpurifier | zhimi.airpurifier.v5  | ❌     |
| Air Purifier Pro            | airpurifier | zhimi.airpurifier.v6  | ❌     |
| Air Purifier Pro v7         | airpurifier | zhimi.airpurifier.v7  | ❌     |
| Air Purifier 2 (mini)       | airpurifier | zhimi.airpurifier.m1  | ❌     |
| Air Purifier (mini)         | airpurifier | zhimi.airpurifier.m2  | ❌     |
| Air Purifier 2s             | airpurifier | zhimi.airpurifier.mc1 | ❌     |
| Air Purifier 2h             | airpurifier | zhimi.airpurifier.mc2 | ✅     |
| Air Purifier 3              | airpurifier | zhimi.airpurifier.ma4 | ❌     |
| Air Purifier 3h             | airpurifier | zhimi.airpurifier.mb3 | ❌     |
| Air Purifier Super          | airpurifier | zhimi.airpurifier.sa2 | ❌     |
| Air Purifier Super 2        | airpurifier | zhimi.airpurifier.sa2 | ❌     |
| Pedestal Fan v2             | fan         | zhimi.fan.v2          | ✅     |
| Pedestal Fan v3             | fan         | zhimi.fan.v3          | ❌     |
| Pedestal Fan ZA4            | fan         | zhimi.fan.za4         | ❌     |
| Air Humidifier              | humidifier  | zhimi.humidifier.v1   | ❌     |
| Air Humidifier              | humidifier  | zhimi.humidifier.ca1  | ❌     |
| Air Humidifier Evaporator 2 | humidifier  | zhimi.humidifier.ca4  | ❌     |
| Desk Hot Water Dispenser    | kettle      | yunmi.kettle.r1       | ✅     |
| Philips Light Bulb          | light       | philips.light.bulb    | ✅     |
| Philips Eyecare Smart Lamp  | light       | philips.light.sread1  | ✅     |
| Yeelink Color Bulb          | light       | yeelink.light.color1  | ✅     |
| Yeelink Desk Lamp           | light       | yeelink.light.lamp1   | ✅     |
| Yeelink LED Bulb            | light       | yeelink.light.mono1   | ✅     |
| Yeelink LED Bulb v2         | light       | yeelink.light.mono2   | ❌     |
| Yeelink Light Strip         | light       | yeelink.light.strip1  | ✅     |
| Smart WiFi Socket           | plug        | chuangmi.plug.m1      | ❌     |
| Chuangmi Plug v1            | plug        | chuangmi.plug.v1      | ❌     |
| Chuangmi Plug v2            | plug        | chuangmi.plug.v2      | ❌     |
| Chuangmi Plug v3            | plug        | chuangmi.plug.v3      | ✅     |
| Smart Power Strip           | powerstrip  | qmi.powerstrip.v1     | ❌     |
| Smart Power Strip           | powerstrip  | zimi.powerstrip.v2    | ❌     |
| Water Purifier              | waterpuri   | yunmi.waterpuri.lx3   | ✅     |
| Water Purifier v2           | waterpuri   | yunmi.waterpuri.v2    | ✅     |

- If any device you have tested, please create a issue and tell me the result and the device model.


## Changelog
### 0.0.14 (2020-12-28)
* Added more devices (AirPurifiers)

### 0.0.13 (2019-09-19)
* Fix device can not control after adapter restart

### 0.0.12 (2019-09-14)
* Change channel object to device object

### 0.0.11 (2019-07-04)
* Remove unused function

### 0.0.10 (2019-07-02)
* Fix can not controll device issue

### 0.0.9 (2019-06-27)
* Fix delete device and discover devices issue

### 0.0.8 (2019-06-26)
* NEED UPLOAD MANUALLY！ use TS instead nodejs. Sync device ip based on token 

### 0.0.7 (2019-05-17)
* Add zhimi fan support

### 0.0.6 (2019-04-13)
* Add power load for chuangmi plug

### 0.0.5 (2019-04-04)
* Fix URL mis-match issue

### 0.0.4 (2019-03-31)
* Add yunmi water purifier support. Perfect unit test

### 0.0.3 (2019-03-17)
* Add value mapper function. Add CommandInPara command

### 0.0.2 (2019-03-15)
* Add new device support. Fix some TS lint error

### 0.0.1
* (SchumyHao) initial release

## License
MIT License

Copyright (c) 2020 Tobias S. <github@myhome.zone>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
