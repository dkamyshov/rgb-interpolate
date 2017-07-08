(function(context) {
  var $isArray = Array.isArray || function(v) {
    return Object.prototype.toString.call(v) == '[object Array]';
  };

  function rgbinterpolate(points) {
    var pa = [];

    if($isArray(points)) {
      pa = points;
    } else {
      for(var i in points) {
        if(points.hasOwnProperty(i)) {
          pa.push({
            offset: parseFloat(i),
            values: points[i]
          });
        }
      }
    }

    if(pa.length < 2) {
      throw new Error('rgb-interpolate: Nothing to interpolate!');
    }

    for(var i = 0; i < pa.length; ++i) {
      var v = pa[i].values;
      if(!$isArray(v)) {
        if(typeof v == 'string' && v.length == 6) {
          pa[i].values = [
            parseInt(v.substring(0, 2), 16)/255.0,
            parseInt(v.substring(2, 4), 16)/255.0,
            parseInt(v.substring(4, 6), 16)/255.0
          ];
        } else if(typeof v == 'number') {
          pa[i].values = [v];
        } else {
          throw new Error('rgb-interpolate: Unsuitable data!');
        }
      }
    }

    for(var i = 0, l = pa[0].values.length; i < pa.length; ++i) {
      if(pa[i].values.length != l) {
        throw new Error('rgb-interpolate: Inconsistent data. All entries'+
          ' should countain the same amount of values.');
      }
    }

    pa = pa.sort(function(a, b) { return a.offset - b.offset; });

    var precomputedIntervals = [],
        body = "";

    for(var i = 1; i < pa.length; ++i) {
      var pp = pa[i-1],
          cp = pa[i],
          slopes = [];

      for(var j = 0; j < pp.values.length; ++j) {
        slopes[j] = (cp.values[j] - pp.values[j])/(cp.offset-pp.offset);
      }

      precomputedIntervals.push({
        x: pp.offset,
        initial: pp.values,
        slopes: slopes
      });

      body += 'if('+pp.offset+'<=x&&x<='+cp.offset+')return '+(i-1)+';';
    }

    var iFunction = new Function('x', body + 'return -1;');

    function interpolate(x) {
      var intervalId = iFunction(x);
      if(intervalId != -1) {
        var interval = precomputedIntervals[intervalId];
        var result = [];

        for(var i = 0; i < interval.initial.length; ++i) {
          result[i] = interval.initial[i] + interval.slopes[i] * (x - interval.x);
        }

        return result;
      } else {
        throw new Error('rgb-interpolate: No suitable interval found.');
      }
    }

    return {
      interpolate: interpolate,
      rgb: function(x, scalar) {
        var values = interpolate(x);
        scalar = typeof scalar === 'undefined' ? 255 : scalar;

        var r = Math.floor(values[0]*scalar),
            g = Math.floor(values[1]*scalar),
            b = Math.floor(values[2]*scalar);

        return 'rgb('+r+','+g+','+b+')';
      },
      hex: function(x, scalar) {
        var values = interpolate(x);
        scalar = scalar = typeof scalar === 'undefined' ? 255 : scalar;

        var r = Math.floor(values[0]*scalar),
            r16 = r.toString(16),
            g = Math.floor(values[1]*scalar),
            g16 = g.toString(16),
            b = Math.floor(values[2]*scalar),
            b16 = b.toString(16);

        return (
          (r == 0 ? '00' : (r < 16) ? '0'+r16 : r16) +
          (g == 0 ? '00' : (g < 16) ? '0'+g16 : g16) +
          (b == 0 ? '00' : (b < 16) ? '0'+b16 : b16)
        ).toUpperCase();
      }
    };
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = rgbinterpolate;
    }
    exports.interpolate = rgbinterpolate;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return rgbinterpolate;
    });
  } else {
    context.rgbinterpolate = rgbinterpolate;
  }
})(this);
