(function(){
	var win = window,
		doc = win.document,
		nav = win.navigator,
		scr = win.screen,
		canvas = document.createElement('canvas');

	var isIE = function () {
		if(nav.appName === 'Microsoft Internet Explorer' ||
		(nav.appName === 'Netscape' && /Trident/.test(navigator.userAgent))) {
			return true;
		}

		return false;
	}();

	var lucarne = {
		get UA () {
			return nav.userAgent;
		},

		get language () {
			return nav.language;
		},

		get languages () {
			return nav.languages || [];
		},

		get colorDepth () {
			return scr.colorDepth
		},

		get screenRes () {
			return scr.width+'x'+scr.height;
		},

		get screenAvailRes () {
			return scr.availWidth+'x'+scr.availHeight;
		},

		get pixelDepth () {
			return scr.pixelDepth;
		},

		get pixelRatio () {
			return win.devicePixelRatio;
		},

		get timeZoneOffset () {
			return new Date().getTimezoneOffset();	
		},

		get hasSessionStorage () {
			try {
				return !!win.sessionStorage;
			} catch (e) {
				return true; // SecurityError when referencing it means it exists
			}
		},

		get hasLocalStorage () {
			try {
				return !!win.localStorage;
			} catch (e) {
				return true; // SecurityError when referencing it means it exists
			}
		},

		get hasIndexedDB () {
			return !!win.indexedDB;
		},

		// IE specific
		get hasAddBehavior () {
			try {
				return !!doc.body.addBehavior;
			} catch (e) {
				return false; // if no body
			}
		},

		get hasOpenDatabase () {
			return !!win.openDatabase;
		},

		get cpuClass () {
			return nav.cpuClass || 'undefined';
		},

		get oscpu () {
			return nav.oscpu || 'undefined';
		},

		get platform () {
			return nav.platform || 'undefined';
		},

		get doNotTrack () {
			return nav.doNotTrack || 'undefined';
		},

		get canvasSupported () {
      		return !!(canvas.getContext && canvas.getContext('2d'));
		},

		get canvasFP () {
			if (this.canvasSupported) {
				var ctx = canvas.getContext('2d');
				ctx.textBaseline = 'top';
				ctx.font = '14px Arial';
				ctx.textBaseline = 'alphabetic';
				ctx.fillStyle = '#f60';
				ctx.fillRect(125, 1, 62, 20);
				ctx.fillStyle = '#069';
				ctx.fillText('This is sparta my very dear Theo Kurcmerf', 2, 15);
				ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
				// ctx.font = '15px Arial';
				ctx.fillText('This is sparta my very dear Theo Kurcmerf', 4, 17);

				return canvas.toDataURL();
			} else return 'undefined';
		},

		get adBlock () {
			var ads = document.createElement('div');
			ads.setAttribute('id', 'ads');
			document.body.appendChild(ads);
			return !document.getElementById('ads');
		},

		get plugins () {
			var plugins = [];

			if (isIE) {
				if(window.ActiveXObject){
					var names = [
						'AcroPDF.PDF', // Adobe PDF reader 7+
						'Adodb.Stream',
						'AgControl.AgControl', // Silverlight
						'DevalVRXCtrl.DevalVRXCtrl.1',
						'MacromediaFlashPaper.MacromediaFlashPaper',
						'Msxml2.DOMDocument',
						'Msxml2.XMLHTTP',
						'PDF.PdfCtrl', // Adobe PDF reader 6 and earlier, brrr
						'QuickTime.QuickTime', // QuickTime
						'QuickTimeCheckObject.QuickTimeCheck.1',
						'RealPlayer',
						'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
						'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
						'Scripting.Dictionary',
						'SWCtl.SWCtl', // ShockWave player
						'Shell.UIHelper',
						'ShockwaveFlash.ShockwaveFlash', //flash plugin
						'Skype.Detection',
						'TDCCtl.TDCCtl',
						'WMPlayer.OCX', // Windows media player
						'rmocx.RealPlayer G2 Control',
						'rmocx.RealPlayer G2 Control.1'
					];

					for (var i = names.length - 1; i >= 0; i--) {
						try {
							new ActiveXObject(names[i]);
							plugins.push(names[i]);
						} catch (e) {
							// No plugin
						}
					};
				}
			} else {
				for (var i = nav.plugins.length - 1; i >= 0; i--) {
					plugins.push(nav.plugins[i].name);
				};
			}

			return plugins.sort();
		},

		get maxTouchPoints () {
			return nav.maxTouchPoints || nav.msMaxTouchPoints || 0;
		},

		get touchEventSupport () {
			try {
				document.createEvent('TouchEvent');
				return true;
			} catch (e) {
				return false;
			}
		},

		get touchStartSupport () {
			return 'ontouchstart' in win;
		}
	}

	if (typeof define === 'function' && define.amd) {
	    define('lucarnejs', function() {
	      	return lucarne;
	    });
  	} else window.lucarne = lucarne;
})();