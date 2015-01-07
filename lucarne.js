(function(){

	var Lucarne = function(){

	}

	window.lucarne = new Lucarne();

	if (typeof define === 'function' && define.amd) {
	    define('lucarnejs', function() {
	      	return lucarne;
	    });
  	}
})