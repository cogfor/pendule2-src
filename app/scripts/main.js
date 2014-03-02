/*global Paperapp, $*/


window.Paperapp = {
    Models: {},
	models: {},
	
    Collections: {},
	collections: {},
    
	Views: {},
	views : {}, //instantiated
	
    init: function () {    
		// starting app view
		Paperapp.views.appView = new Paperapp.Views.AppView();
    }
};

// Bootstrapping
(function(){
	var domLoadedDef,
		phonegapLoadedDef,
		browserScript,
		browserScriptTag;

		
	// using deffereds to correctly determine when both phonegap and dom are loaded
	domLoadedDef = _.Deferred();
	phonegapLoadedDef = _.Deferred();
		
	// include browser plugin from App Framework
	if (!((window.DocumentTouch && document instanceof DocumentTouch) || 'ontouchstart' in window)) {
		
		/*browserScript = document.createElement("script");
		browserScript.src = "bower_components/intel-appframework/plugins/af.desktopBrowsers.js";
		browserScriptTag = $("head").append(browserScript);*/
		
		$.os.android = true;
		$.os.desktop = true;
		
		//emulate phonegap platform property
		window.device = { platform : 'Android' };
		
		// phonegap device ready won't fire in browser, so we have to do it manually
		phonegapLoadedDef.resolve();
	}
	 
	// By default, it is set to true and you're app will run right away.  We set it to false to show a splashscreen
	$.ui.autoLaunch = false;

	document.addEventListener("deviceready", phonegapLoadedDef.resolve, true);
	document.addEventListener("DOMContentLoaded", domLoadedDef.resolve, false);
	
	_.when([phonegapLoadedDef, domLoadedDef]).then(function(){
		window.Paperapp.init();
	});
}());