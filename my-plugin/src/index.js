/* eslint-disable no-undef */

// WARNING!!! Change `drawToolsImportExtras` to a unique code name of the plugin.

let myPlugin = new MyPlugin('drawToolsImportExtras');

// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//use own namespace for plugin
window.plugin.drawToolsImportExtras = myPlugin;

//////////////////////////////////////////////////////////////////////
//WRAPPER START //////////////////////////////////////////////////////

/**
 * IITC plugin wrapper.
 * 
 * Note! The `wrapper` is injected directly to the Ingress Intel web page.
 * That is why you need to use `window.plugin.drawToolsImportExtras` at least for hooks setup.
 */
function wrapper(plugin_info) {

	//////////////////////////////////////////////////////////////////////
	//PLUGIN START ///////////////////////////////////////////////////////

	/**
	 * Some setup (when iitc is ready)
	 * 
	 * See notes for the wrapper!
	 */
	function setup() {
		console.log('drawToolsImportExtras - init')
		window.plugin.drawToolsImportExtras.setup();
	}

	//PLUGIN END /////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////

	setup.info = plugin_info; //add the script info data to the function as a property
	if(!window.bootPlugins) window.bootPlugins = [];
	window.bootPlugins.push(setup);
	// if IITC has already booted, immediately run the 'setup' function
	if(window.iitcLoaded && typeof setup === 'function') setup();
}

//WRAPPER END ////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);