// Amalgamatr - Takes a list of colors, and blends them together based on a percent
(function ($) {
	var priv = {
		// borrowed getColorValues from http://snipplr.com/view.php?codeview&id=60570
		GetColorValues: function(color) {
			var values = { red: null, green: null, blue: null, alpha: null };
			if (typeof color == 'string') {
				var pars;
				/* hex */
				if (color.indexOf('#') === 0) {
					color = color.substr(1);
					if (color.length == 3)
						values = {
							red: parseInt(color[0] + color[0], 16),
							green: parseInt(color[1] + color[1], 16),
							blue: parseInt(color[2] + color[2], 16),
							alpha: 1
						}
					else
						values = {
							red: parseInt(color.substr(0, 2), 16),
							green: parseInt(color.substr(2, 2), 16),
							blue: parseInt(color.substr(4, 2), 16),
							alpha: 1
						}
					/* rgb */
				} else if (color.indexOf('rgb(') === 0) {
					pars = color.indexOf(',');
					values = {
						red: parseInt(color.substr(4, pars)),
						green: parseInt(color.substr(pars + 1, color.indexOf(',', pars))),
						blue: parseInt(color.substr(color.indexOf(',', pars + 1) + 1, color.indexOf(')'))),
						alpha: 1
					}
					/* rgba */
				} else if (color.indexOf('rgba(') === 0) {
					pars = color.indexOf(',');
					var repars = color.indexOf(',', pars + 1);
					values = {
						red: parseInt(color.substr(5, pars)),
						green: parseInt(color.substr(pars + 1, repars)),
						blue: parseInt(color.substr(color.indexOf(',', pars + 1) + 1, color.indexOf(',', repars))),
						alpha: parseFloat(color.substr(color.indexOf(',', repars + 1) + 1, color.indexOf(')')))
					}
					/* verbous */
				} else {
					var stdCol = {
						acqua: '#0ff', teal: '#008080', blue: '#00f', navy: '#000080',
						yellow: '#ff0', olive: '#808000', lime: '#0f0', green: '#008000',
						fuchsia: '#f0f', purple: '#800080', red: '#f00', maroon: '#800000',
						white: '#fff', gray: '#808080', silver: '#c0c0c0', black: '#000'
					};
					if (stdCol[color] != undefined)
						values = getColorValues(stdCol[color]);
				}
			}
			return values;
		},
		// Builds the cache key
		GetCacheKey: function(colorList) {
			var key = "";
			$.each(colorList, function(i, value) { key = key + value + ';' });
			return key;
		},
		Blend: function(val1, val2, percent) {
			return Math.round(val1 + (val2 - val1) * percent);
		},
		PadLeft: function(nr, n, str) {
			return Array(n-String(nr).length+1).join(str||'0')+nr;
		},
		GradientCache: {}
	};

	jQuery.extend(jQuery, {
		ColorFromGradient: function (colorList, percent) {
			// Check the gradient cache and see if we've already processed this combo
			var cacheKey = priv.GetCacheKey(colorList);
			var colors = priv.GradientCache[cacheKey]
				      || (priv.GradientCache[cacheKey] = $.map(colorList, function (value) { return priv.GetColorValues(value); }));

			var partialIndex = percent * (colors.length - 1);
			var firstColorIndex = Math.floor(partialIndex);
			var secondColorIndex = Math.ceil(partialIndex);
			var midColorPercent = partialIndex - firstColorIndex;

			// If indexes are the same, just return that color
			if (firstColorIndex == secondColorIndex) return colors[firstColorIndex];
			if (firstColorIndex < 0 || firstColorIndex > (colors.length - 1) || secondColorIndex < 0 || secondColorIndex > (colors.length - 1))
				throw "Amalgamatr: percent is out of bounds of the color list (" + percent + ")";

			var color1 = colors[firstColorIndex];
			var color2 = colors[secondColorIndex];

			// Blend the two color indexes together
			return 'rgba(' + priv.Blend(color1.red, color2.red, midColorPercent).toString() + ','
					   + priv.Blend(color1.green, color2.green, midColorPercent).toString() + ','
					   + priv.Blend(color1.blue, color2.blue, midColorPercent).toString() + ','
					   + (1.0 - (priv.Blend(color1.alpha, color2.alpha, midColorPercent) / 255)).toString() + ')';
		}
	});
})(jQuery);
