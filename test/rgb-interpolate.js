var assert = require('assert');
var ib = require('../rgb-interpolate.js');

describe("rgb-interpolate", function() {
    it("raw objects", function() {
        var pts = {
            0: [0,0,0],
            1: [1,1,1]
        };

        var ip = ib(pts);

        assert.deepEqual(ip.interpolate(0.5), [0.5, 0.5, 0.5]);
        assert.deepEqual(ip.interpolate(0.3), [0.3, 0.3, 0.3]);
    });

    it("raw arrays", function() {
        var pts = [
            { offset: 0, values: [0,0,0] },
            { offset: 1, values: [1,1,1] },
        ];

        var ip = ib(pts);

        assert.deepEqual(ip.interpolate(0.5), [0.5, 0.5, 0.5]);
        assert.deepEqual(ip.interpolate(0.3), [0.3, 0.3, 0.3]);
    });

    it("hex objects", function() {
        var pts = {
            0: '000000',
            1: 'FFFFFF'
        };

        var ip = ib(pts);

        assert.deepEqual(ip.interpolate(0.5), [0.5, 0.5, 0.5]);
        assert.deepEqual(ip.interpolate(0.3), [0.3, 0.3, 0.3]);
    });

    it("hex arrays", function() {
        var pts = [
            { offset: 0, values: '000000' },
            { offset: 1, values: 'FFFFFF' },
        ];

        var ip = ib(pts);

        assert.deepEqual(ip.interpolate(0.5), [0.5, 0.5, 0.5]);
        assert.deepEqual(ip.interpolate(0.3), [0.3, 0.3, 0.3]);
    });

    it("unordered + number objects", function() {
        var pts = {
            1: 10,
            0: -10
        };

        var ip = ib(pts);

        assert.deepEqual(ip.interpolate(0.5), [0]);
        assert.deepEqual(ip.interpolate(1), [10]);
    });

    it("hex and rgb interpolation", function() {
        var pts = {
            0: [0,0,0],
            '0.5': [0.5,0.5,0.5],
            1: [1,1,1]
        };

        var ip = ib(pts);

        assert.equal(ip.hex(0), '000000');
        assert.equal(ip.hex(0.5), '7F7F7F');
        assert.equal(ip.hex(1), 'FFFFFF');

        assert.equal(ip.rgb(0), 'rgb(0,0,0)');
        assert.equal(ip.rgb(0.5), 'rgb(127,127,127)');
        assert.equal(ip.rgb(1), 'rgb(255,255,255)');
    })
});
