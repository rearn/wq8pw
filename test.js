"use strict";
exports.__esModule = true;
var des_js_1 = require("des.js");
var encrypt = function (key, data) {
    var b = des_js_1.DES.create({ type: 'encrypt', key: Buffer.from(key) });
    return Buffer.from(b.update((Buffer.from(('0000000000000000' + data.toString(16)).substr(-16), 'hex'))));
};
var decrypt = function (key, data) {
    var b = des_js_1.DES.create({ type: 'dencrypt', key: Buffer.from(key) });
    return parseInt(Buffer.from(b.update(data)).toString('hex'), 16);
};
['abcdefgh', '12345678'].forEach(function (key) {
    for (var i = 0; i < 0xffff; i++) {
        var a = encrypt(key, i);
        var b = decrypt(key, a);
        if (i !== b) {
            console.log(i, b);
        }
    }
});
