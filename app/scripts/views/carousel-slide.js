/*global Paperapp, Backbone, JST*/

Paperapp.Views = Paperapp.Views || {};

(function () {
    'use strict';

    Paperapp.Views.CarouselSlideView = Backbone.View.extend({
		
		className : 'carousel_slide',
		
		tagName : 'div',
		
        template: JST['app/scripts/templates/carousel-slide.hbs'],
		
		fullPageView : undefined,
		
		events : {
			'swipeUp' : 'expand'
		},
		
		initialize : function(){
			this.render();
			_.bindAll(this, 'expand');
			
			Paperapp.views.fullPages = [];
		},
		
		render : function(){
			this.$el.html(this.template({
				
			}));
		},
		
		expand : function(e){
			var self = this;
			
			if (self.fullPageView) {
				self.fullPageView.open();
				return;
			}
			
			Paperapp.views.fullPages.push(self.fullPageView);
			
			self.fullPageView = new Paperapp.Views.FullPageView({
				model : this.model
			});
			
			self.fullPageView.$el.css({
				top : this.$el.offset().top,
				left : this.$el.offset().left
			});
			
			setTimeout(function(){
				self.fullPageView.open();
			}, 0);
		}

    });

})();
