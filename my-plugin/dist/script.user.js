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

class DrawToolsHelper {
	constructor() {
		this.defaultColor = "#a24ac3";
	}

	summary(positionsCsv, color) {
		let positions = positionsCsv.map(ll=>this.llToDrawTools(ll));

		let summary = positions.map(latLng=>this.marker(latLng, color));
		let lines = this.polyline(positions, color);
		summary.push(lines);

		return summary;
	}

	llToDrawTools(ll) {
		let split = ll.split(',');
		return {
			"lat": split[0],
			"lng": split[1],
		};
	}
	marker(latLng, color) {
		if (typeof color !== 'string') {
			color = this.defaultColor;
		}
		return {
			"type": "marker",
			"latLng": latLng,
			"color": color,
		};
	}
	polyline(positions, color) {
		if (typeof color !== 'string') {
			color = this.defaultColor;
		}
		return {
			"type": "polyline",
			"latLngs": positions,
			"color": color,
		};
	}
}

export {DrawToolsHelper}


var importHtml = `
	<p>Paste portal locations list here (latgitude,longitude). One portal per line.</p>
	<textarea style="width:100%;box-sizing: border-box;" rows="5"></textarea>
`;

class MyPlugin {
	constructor(codeName) {
		this.codeName = codeName;
	}

	setup() {
		console.log('MyPlugin setup', this.codeName);

		const toolbox = document.getElementById('toolbox');
		if (!toolbox) {
			console.error(this.codeName, 'Toolbox not ready');
		} else {
			this.setupImport(toolbox)
		}
	}

	setupImport(toolbox) {
		const importButton = document.createElement('a');
		importButton.textContent = 'DrawTools Import';
		importButton.addEventListener('click', ()=>{
			this.openImport();
		});
		toolbox.appendChild(importButton);
	}

	openImport() {
		const dialogElement = dialog({
			html: importHtml,
			width: 600,
			dialogClass: `ui-dialog-${this.codeName}-import`,
			title: 'Draw Tools Import',
			buttons: {
				'OK': function () {
					alert('todo');
					console.log(this.codeName, dialogElement);
					dialogElement.dialog('close');
				}
			},
		});
	}

	importUserData(userText) {
	}
	prepareLocList(userText) {
		let positionsCsv = userText
			.trim()
			.replace(/\s*\n\s*/g, '\n')
			.split('\n')
		;		
		let summary = drawToolsHelper.summary(positionsCsv, color);
		return summary;
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