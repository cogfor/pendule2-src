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