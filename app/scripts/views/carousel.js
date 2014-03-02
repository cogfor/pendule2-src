/*global Paperapp, Backbone, JST*/

Paperapp.Views = Paperapp.Views || {};

(function () {

    Paperapp.Views.CarouselView = Backbone.View.extend({
		el : '#carousel',
		
        template: JST['app/scripts/templates/carousel.hbs'],
		
		events : {},
		
		initialize : function(){
			var self = this;
			
			self.wrapper = self.$el.find('.carousel_container');
			
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
				
				// set strict width and margin to carousel images and then make container scrollable
				setTimeout(function(){
					var firstImg = self.$el.find('.carousel_slide').eq(0),
						width = firstImg.get(0).offsetWidth,
						margin = parseInt(firstImg.css('marginRight'), 10),
						totalWidth = 0;
					
					self.$el.find('.carousel_slide').css({
						width : width,
						marginRight : margin
					});
					
					totalWidth = self.$el.find('.carousel_slide').length * (width + margin);
					
					self.$el.addClass('m-visible');
					
					self.$el.find('.carousel_wrapper').css('width', totalWidth);
					
					
					//if (device && device.platform && device.platform === 'Android') {
					setTimeout(function(){	
						myScroll = new IScroll('#carousel', {
							eventPassthrough: true, 
							scrollX: true, 
							scrollY: false
						});
								
						//$.ui.addDivAndScroll($('#carousel').get());
						
					}, 100);
						
				}, 0);
				
			});
		},
		
		render : function(){
			var self = this;
				
			Paperapp.views.carouselSlides = [];
			
			Paperapp.collections.carouselDocuments.each(function(model, index){
				var view = new Paperapp.Views.CarouselSlideView({
					model : model
				});
				
				self.wrapper.append(view.$el);
				Paperapp.views.carouselSlides.push(view);
			});
		}
		
    });

})();
