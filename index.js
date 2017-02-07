
function isDefined(variable){
	return typeof variable !== 'undefined';
}

function appendStrings(appendee, appender, position, key){
	appendee = isDefined(appendee) ? appendee : {};

	if (isDefined(appendee[key]) && !isDefined(appender[key])) {
		appender[key] = appendee[key];

	} else if (isDefined(appender[key]) && !isDefined(appendee[key])) {
		appendee[key] = appender[key];

	} else if (typeof appendee[key] === 'object' && !Array.isArray(appendee[key])){
		for (var subKey in appendee[key]){
			appendStrings(appendee[key], appender[key], position, subKey);
		}

	} else {
		appendee[key] = isDefined(appendee[key]) ? appendee[key] : '';
		var appendResult = appendee[key] + '' + appender[key];
		var prependResult = appender[key] + '' + appendee[key];
		appendee[key] = position === 'after' ? appendResult : prependResult;
	}

	return appendee;
}

module.exports = function(appendee, appender, position){
	position = isDefined(position) ? position : 'after';

	for (var key in appender){
		appendStrings(appendee, appender, position, key);
	}

	return appendee;
}