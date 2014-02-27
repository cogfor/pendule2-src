/*global Paperapp, Backbone, JST*/

Paperapp.Views = Paperapp.Views || {};

(function () {

    Paperapp.Views.CarouselView = Backbone.View.extend({
		el : '#carousel',
		
        template: JST['app/scripts/templates/carousel.hbs'],
		
		events : {},
		
		initialize : function(){
			var self = this;
			
			Paperapp.collections.carouselDocuments = new Paperapp.Collections.DocumentsCollection({
				source : { 					
					"query" : {
						"query_string" : {
							"query" : "*:*"
						}
					},
					"from" : 0,
					"size" : 9,
					"sort" : { 
						"_script" : { 
							"script" : "Math.random()", 
							"type" : "number", 
							"params" : {},
							"order" : "asc"
						}
					}
				}
			});
			
			Paperapp.collections.carouselDocuments.bind('reset', function(){
				self.render();
			});
		},
		
		render : function(){
			var self = this;
			
			self.$el.html(self.template({
				slides : Paperapp.collections.carouselDocuments.toJSON()
			}));
			
			setTimeout(function(){
				self.wrapper = self.$el.find('.carousel_wrapper');
				console.log(self.$el.html());
				
				self.wrapper.carousel({
					//pagingDiv : 'slider-nav',
					//pagingCssName : 'slider-nav_link',
					//pagingCssNameSelected : 'slider-nav_link m-active'
				});
			}, 0);
		}

    });

})();
