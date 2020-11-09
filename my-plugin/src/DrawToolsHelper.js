/**
 * DrawTools Data Helper.
 */
// eslint-disable-next-line no-unused-vars
class DrawToolsHelper {
	constructor() {
		this.defaultColor = "#a24ac3";
	}

	/**
	 * Generate summary.
	 * @param {Array} positions Array of lat-long combo (CSV).
	 * @param {String} color Hex color.
	 */
	summary(positionsCsv, color) {
		let positions = positionsCsv.map(ll=>this.llToDrawTools(ll));

		let summary = positions.map(latLng=>this.marker(latLng, color));
		let lines = this.polyline(positions, color);
		summary.push(lines);

		return summary;
	}

	/**
	 * @private
	 * @param {String} ll Lat-long combo.
	 * @returns Draw tools latLng object.
	 */
	llToDrawTools(ll) {
		let split = ll.split(',');
		return {
			"lat": split[0],
			"lng": split[1],
		};
	}
	/**
	 * Generate marker data.
	 * 
	 * @private
	 * @param {Object} latLng Draw tools latLng object.
	 * @returns {Object} Draw tools object.
	 */
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
	/**
	 * Generate marker data.
	 * 
	 * @private
	 * @param {Array} latLng Array of draw tools latLng objects.
	 * @returns {Object} Draw tools object.
	 */
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

//export {DrawToolsHelper}