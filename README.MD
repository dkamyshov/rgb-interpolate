# rgb-interpolate

## Introduction

A very simple, yet fast, library dedicated for linear interpolation (for use with colors, specifically).

## How to add the library

For NodeJS:

`var rgbinterpolate = require('path/to/rgb-interpolate.js')`

For web:

`<script src='path/to/rgb-interpolate.js'></script>`

## Usage

`rgbinterpolate` accepts an object or an array of the following format:

For objects:

```javascript
var pts = {
    [o1]: [ v1, v2, ..., vM ],
    [o2]: [ v1, v2, ..., vM ],
    // ...
    [oN]: [ v1, v2, ..., vM ]
};

var ip = rgbinterpolate(pts);
```

For arrays:

```javascript
var pts = [
    { offset: [o1], values: [v1, v2, ..., vM] },
    { offset: [o1], values: [v1, v2, ..., vM] },
    // ...
    { offset: [oN], values: [v1, v2, ..., vM] }
];

var ip = rgbinterpolate(pts);
```

Keep in mind that all entries should have the same amount of values and there must be at least 2 entries for the library to work properly.

## Notes

1. Library scans through your input and builds an array of precomputed intervals and a function to obtain the offset of each individual interval. That's why it's so fast!

2. You may also pass single numbers or RGB-HEX strings as input!

```javascript
{
    0: -10,
    1: 10
}

/* OR */

{
    0: '000000',
    1: 'FFFFFF'
}
```

## Reference

### ip.interpolate(x:Number)

Returns a raw array of values at x.

### ip.rgb(x:Number, scalar?:Number)

Returns a string of form `rgb(r,g,b)`. If scalar is specified, each component gets multiplied by it. By default `scalar = 255`.

### ip.hex(x:Number, scalar?:Number)

Returns a string of form `AABBCC`. If scalar is specified, each component gets multiplied by it. By default `scalar = 255`.

See `demo.html` for examples. [Live demo here.](http://all-site-2.nichost.ru/adel/demo.html)

## Contacts

danil.kamyshov@gmail.com
