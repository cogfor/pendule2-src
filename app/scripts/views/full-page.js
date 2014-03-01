/*global Paperapp, Backbone, JST*/

Paperapp.Views = Paperapp.Views || {};

(function () {

    Paperapp.Views.FullPageView = Backbone.View.extend({
		className : 'full-page',
		tagName : 'div',
        
		events : {
			'click' : 'openURL',
			
			/* swipe direction events have to be attached to every element as they don't bubble up */
			'swipeDown' : 'close',
			'swipeDown .full-page_bg' : 'close',
			'swipeDown .full-page_content' : 'close',
			'swipeDown .full-page_title' : 'close',
			'swipeDown .full-page_author' : 'close',
			'swipeDown .full-page_text' : 'close',
		},
		
		template: JST['app/scripts/templates/full-page.hbs'],
		
		initialize : function(){
			var self = this;
			
			_.bindAll(this, 'open', 'close', 'openURL');
			
			self.pageId = self.$el.get().className + '-' + self.model.cid;
			
			self.render();
			
			// events need to be rewired here due to the addContentDiv function 
			//$.ui.addContentDiv(self.pageId, self.$el.html());
			
			setTimeout(function(){
				//$.ui.showModal('#' + self.pageId);
				//$.ui.loadContent('#' + self.pageId, false, false, 'pop');
			}, 0);
		},
		
		render : function(){
			this.$el.html(this.template(this.model.get('_source')));
			this.$el.appendTo('body');
		},
		
		open : function(){
			this.$el.addClass('m-visible');
		},
		
		close : function(){
			this.$el.removeClass('m-visible');
		},
		
		openURL : function(e){
			e.preventDefault();
			window.open(this.model.get('_source').url, '_blank', 'location=yes');
		}
		
    });

})();
