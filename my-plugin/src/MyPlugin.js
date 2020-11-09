/* global dialog DrawToolsHelper */

var importHtml = `
	<p>Paste portal locations list here (latgitude,longitude). One portal per line.</p>
	<textarea style="width:100%;box-sizing: border-box;" rows="5"></textarea>
`;

/**
 * Main plugin class.
 */
// eslint-disable-next-line no-unused-vars
class MyPlugin {
	constructor(codeName) {
		this.codeName = codeName;
		this.helper = new DrawToolsHelper();
	}

	/**
	 * Main setup (after iitc was init).
	 */
	setup() {
		console.log('MyPlugin setup', this.codeName);

		// add menu/options button
		const toolbox = document.getElementById('toolbox');
		if (!toolbox) {
			console.error(this.codeName, 'Toolbox not ready');
		} else {
			this.setupImport(toolbox)
		}
	}

	/**
	 * Setup import button.
	 * @param {Element} toolbox Toolboc element (typically in portal details).
	 */
	setupImport(toolbox) {
		const importButton = document.createElement('a');
		importButton.textContent = 'DrawTools Import';
		importButton.addEventListener('click', () => {
			this.openImport();
		});
		toolbox.appendChild(importButton);
	}

	/**
	 * Open import dialog.
	 */
	openImport() {
		const $dialog = dialog({
			html: importHtml,
			width: 600,
			dialogClass: `ui-dialog-${this.codeName}-import`,
			title: 'Draw Tools Import',
			buttons: {
				'OK': () => {
					let dialogElement = $dialog[0];
					const positionsField = dialogElement.querySelector('textarea');
					if (this.importUserData(positionsField.value)) {
						$dialog.dialog('close');
					} else {
						alert('Import failed!');
					}
				}
			},
		});
	}

	/**
	 * Import data.
	 * @param {String} userText 
	 */
	importUserData(userText) {
		try {
			let drawData = this.prepareLocList(userText);
			window.plugin.drawTools.drawnItems.clearLayers();
			window.plugin.drawTools.import(drawData);
			console.log(this.codeName, 'reset and import items', drawData);
			alert('Import Successful.');
			// to write back the data to localStorage
			window.plugin.drawTools.save();
		} catch (error) {
			console.error(this.codeName, error);
			return false;
		}
		return true;
	}

	/**
	 * Prepare user entered location list.
	 * @param {String} userText 
	 */
	prepareLocList(userText) {
		let positionsCsv = userText
			.trim()
			.replace(/\s*\n\s*/g, '\n')
			.split('\n');
		let drawData = this.helper.summary(positionsCsv);
		return drawData;
	}
}