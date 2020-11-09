// ==UserScript==
// @author      Eccenux
// @name        IITC plugin: Import extras for Draw Tools
// @id          iitc-plugin-draw-tools-import-extras
// @category    Misc
// @namespace   pl.enux.iitc
// @version     0.0.1
// @description [0.0.1] Importing portal list (lat,lon list) to draw tools.
// @match       https://*.ingress.com/intel*
// @match       http://*.ingress.com/intel*
// @match       https://*.ingress.com/mission/*
// @match       http://*.ingress.com/mission/*
// @match       https://intel.ingress.com/*
// @match       https://intel.ingress.com/*
// @grant       none
// ==/UserScript==

class MyPlugin {
	constructor (codeName) {
		this.codeName = codeName;
	}

	setup() {
		console.log('MyPlugin setup', this.codeName);
	}
}



let myPlugin = new MyPlugin('drawToolsImportExtras');

if(typeof window.plugin !== 'function') window.plugin = function() {};

window.plugin.drawToolsImportExtras = myPlugin;


function wrapper(plugin_info) {


	function setup() {
		console.log('drawToolsImportExtras - init')
		window.plugin.drawToolsImportExtras.setup();
	}


	setup.info = plugin_info; 
	if(!window.bootPlugins) window.bootPlugins = [];
	window.bootPlugins.push(setup);
	if(window.iitcLoaded && typeof setup === 'function') setup();
}


var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);