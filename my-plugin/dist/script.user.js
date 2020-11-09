// ==UserScript==
// @author      Eccenux
// @name        IITC plugin: Nux termplate
// @id          iitc-plugin--nux-termplate
// @category    Misc
// @namespace   pl.enux.iitc
// @version     0.0.1
// @description [0.0.1] Nux template
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



let myPlugin = new MyPlugin('examplePluginCodeName');

if(typeof window.plugin !== 'function') window.plugin = function() {};

window.plugin.examplePluginCodeName = myPlugin;


function wrapper(plugin_info) {


	function setup() {
		console.log('examplePluginCodeName - init')
		window.plugin.examplePluginCodeName.setup();
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