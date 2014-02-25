window.helpers = {
	serializeFormToArray : function(form){
		var result = {};
		
		form.find('input[name], textarea[name]').each(function(i, e){
			var el = $(e);
			result[el.attr('name')] = el.val();
		});
		return result;
	}
}

Handlebars.registerHelper('ifEquals', function(v1, v2, options) {
	if(v1 == v2) {
		return options.fn(this);
	}
	return options.inverse(this);
});

Handlebars.registerHelper('ifObjProp', function(object, prop, options) {
	if (object && object[prop]) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});

Handlebars.registerHelper('ifExceedLength', function(str, length, options) {
	if(str.length >= length) {
		return options.fn(this);
	}
	return options.inverse(this);
});