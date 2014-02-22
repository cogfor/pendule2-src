/* jquery.fn.lurk placeholder text for inputs */
(function($){
    $.fn.lurk = function(value, options){
		
		var opts = $.extend({
			submitRemove : true
		}, options);
		
		return this.each(function(){
			var $$ = $(this),
				lurkValue,
				type = $$.attr('type'),
				placeholder;
			
			if (! value) {
				lurkValue = $$.data('placeholder');
			} else {
				lurkValue = value;
			}
		
			if (lurkValue === undefined) {
				return;
			}
			
			$$.attr('autocomplete',	'off');
					
			function add() {
				if ($$.val().length == 0 || $$.hasClass('lurk')) {
	
					if (type == 'password') {
						$$.get(0).type = 'text';
						$$.data('type', 'password');
					}
					$$.val(lurkValue).addClass("lurk");
						
				}
			}

			function remove() {
				if ($$.val() == lurkValue) {

					if ($$.data('type') == 'password') {
						$$.get(0).type = 'password';
					}
					$$.val('').removeClass("lurk");
					
				} 
			}

			$$.bind('mouseup', remove)
			.bind('focus', remove)
			.bind('blur', add);
			
			!$$.is(':focus') && add();

			$$.parents("form").submit(function() {
				if (opts.submitRemove) {
					remove();
				}
				return true;
			});
		});
	}
})($);
