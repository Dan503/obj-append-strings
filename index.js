function appendStrings(appendee, appender, position, key){
	appendee = typeof appendee !== 'undefined' ? appendee : {};

	if (typeof appendee[key] === 'object' && !Array.isArray(appendee[key])){
		for (var subKey in appendee[key]){
			appendStrings(appendee[key], appender[key], position, subKey);
		}
	} else {
		appendee[key] = typeof appendee[key] !== 'undefined' ? appendee[key] : '';
		var appendResult = appendee[key] + '' + appender[key];
		var prependResult = appender[key] + '' + appendee[key];
		appendee[key] = position === 'after' ? appendResult : prependResult;
	}

	return appendee;
}

module.exports = function(appendee, appender, position){
	position = typeof position !== 'undefined' ? position : 'after';

	for (var key in appender){
		appendStrings(appendee, appender, position, key);
	}

	return appendee;
}