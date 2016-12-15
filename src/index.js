'use strict';

// Convert strings into a formatted value.
// ---------------------------------------
// - True/False strings into Boolean
// - Null strings to null value
// - Number strings to Number
function _formatValues(val) {
	const
		numberVal = Number(val),
		valueMap = {
			'true': true,
			'false': false,
			'null': null
		};
	// Return mapped Value || formatted Number || existing string
	return valueMap.hasOwnProperty(val) ? valueMap[val] : !isNaN(numberVal) ? numberVal : val;
}

// Match regex not contined within square or curly brackets
// --------------------------------------------------------
// - Joins regex param with a negative lookahead assertion
function _matchOutsideBrackets(reg, negativeLookaheadForBrackets = /(?![^\[]*\]|[^\{]*\})/) {
	return new RegExp(reg.source + negativeLookaheadForBrackets.source);
}

// Parse an object literal from string
// -----------------------------------
// - Builds a js object manually to avoid using eval() on the server.
// - Used for JS objects that don't conform to JSON spec. i.e. keys that aren't wrapped in a double-quote.
module.exports = function parseStringData(str = '', initialValue) {
	let
		data = null;

	const
		dataMatch = str.match(_matchOutsideBrackets(/\{(.*)\}|\[(.*)\]/)) || [],
		isArray = (dataMatch[2] !== undefined),
		value = dataMatch[1] || dataMatch[2];

	if (value) {
		// Regex split on all commas that aren't contained within curly/square brackets.
		// Use Array.reduce to reduce array down to a single object literal.
		data = value.split(_matchOutsideBrackets(/\,/)).reduce( ( acc = (isArray ? [] : {}), item, i) => {

			let [ rawKey, rawVal = '' ] = Array.isArray(acc) ?
				// Assign values to current array index and value
				[i, item.trim()]
				// Split value on colons to get key:value pairs for objects
				: item.split(_matchOutsideBrackets(/\:/));

			const key = typeof rawKey === 'string' ? rawKey.trim() : rawKey;
			// Recursively check values for data or return a trimmed string
			const value = parseStringData(rawVal) || _formatValues( rawVal.trim() );

			acc[key] = value; // acc.push(parseDataFromString(val) || val);
			return acc;
		}, initialValue);
	}

	return data || initialValue || null;
};
