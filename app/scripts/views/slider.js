/*global Paperapp, Backbone, JST*/

Paperapp.Views = Paperapp.Views || {};

(function () {

    Paperapp.Views.SliderView = Backbone.View.extend({
		el : '#slider', 
		
        template: JST['app/scripts/templates/slider.hbs'],
		
		events : {},
		
		initialize : function(){
			var self = this;
			
			Paperapp.collections.sliderDocuments = new Paperapp.Collections.DocumentsCollection({
				source : { 
					"from" : 0,
					"size" : 10,
					"sort": [{
						"date": { 
							"order": "desc"
						}
					}]
				}
			});
			
			Paperapp.collections.sliderDocuments.bind('reset', function(){
				self.render();
			});
		},
		
		render : function(){
			var self = this;
			
			self.$el.html(self.template({
				slides : Paperapp.collections.sliderDocuments.toJSON()
			}));
			
			setTimeout(function(){
				self.wrapper = self.$el.find('.slider_wrapper');
				self.wrapper.css('width', $(window).width());
				self.wrapper.css('height', $(window).height());
				
				self.wrapper.carousel({
					pagingDiv : 'slider-nav',
					pagingCssName : 'slider-nav_link',
					pagingCssNameSelected : 'slider-nav_link m-active'
				});
			}, 0);
		}
    });

})();
