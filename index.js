module.exports = function(appendee, appender, position){
	position = typeof position !== 'undefined' ? position : 'after';
	appendee = typeof appendee !== 'undefined' ? appendee : {};

	for (var key in appender){
		appendee[key] = typeof appendee[key] !== 'undefined' ? appendee[key] : '';
		appendee[key] = position === 'after' ? appendee[key] + '' + appender[key] : appender[key] + '' + appendee[key];
	}

	return appendee;
}