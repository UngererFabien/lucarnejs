(function(){
	var w = window,
		n = window.navigator;

	var lucarne = {

		get screen () {
			// clone window.screen object
			var _screen = JSON.parse(JSON.stringify(w.screen));
			if(w.devicePixelRatio) _screen.devicePixelRatio = w.devicePixelRatio;

			return _screen;
		},

		get JSONscreen () {
			return JSON.stringify(this.screen);
		},

		get device () {
			var _device = {
				maxTouchPoints: n.maxTouchPoints
			}

			return _device;
		},

		get JSONdevice () {
			return JSON.stringify(this.device);
		},

		get navigator () {
			var plugins = [];
			for (var i = 0, l = n.plugins.length; i<l; i++) {
				plugins.push({
					name: n.plugins[i].name,
					description: n.plugins[i].description
				});
			}

			var _navigator = {
				languages: n.languages,
				plugins: plugins,
				userAgent: n.userAgent
			}

			return _navigator;
		},

		get JSONnavigator () {
			return JSON.stringify(this.navigator);
		},

		get identity () {
			var attrs = [this.screen, this.device, this.navigator],
				identity = {};

			for (var i = 0; i < attrs.length; i++) {
				for (var attr in attrs[i]) {
					identity[attr] = attrs[i][attr];
				} 
			}

			return identity;
		},

		get JSONidentity () {
			return JSON.stringify(this.identity);
		},

		equal: function (identity, identityType) {
			if (typeof(identity) === 'object') identity = JSON.stringify(identity);

			return this.JSONidentity === identity;
		},

		diff: function (identity, identityType) {
			var diff = {};

			if (typeof(identity) === 'string') {
				identity = JSON.parse(identity);
			}

			for (var attr in this.identity) {
				if(JSON.stringify(this.identity[attr]) != JSON.stringify(identity[attr])) {
					diff[attr] = {
						_this: this.identity[attr],
						_identity: identity[attr]
					};
				}
			}

			return diff;
		}
	}

	if (typeof define === 'function' && define.amd) {
	    define('lucarnejs', function() {
	      	return lucarne;
	    });
  	} else window.lucarne = lucarne;
})();