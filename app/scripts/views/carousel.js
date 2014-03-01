/*global Paperapp, Backbone, JST*/

Paperapp.Views = Paperapp.Views || {};

(function () {

    Paperapp.Views.CarouselView = Backbone.View.extend({
		el : '#carousel',
		
        template: JST['app/scripts/templates/carousel.hbs'],
		
		events : {},
		
		initialize : function(){
			var self = this;
			
			self.wrapper = self.$el.find('.carousel_wrapper');
			
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
					var firstImg = self.$el.find('.carousel_slide').eq(0);
					
					self.$el.find('.carousel_slide').css({
						width : firstImg.get(0).offsetWidth,
						marginRight : firstImg.css('marginRight')
					});
					
					self.$el.addClass('m-visible');
					
					if (device && device.platform && device.platform === 'Android') {
						
						document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
						myScroll = new IScroll('#carousel', {
							scrollX : true,
							scrollY : false,
							keyBindings : true
						});
					}
					
					/*self.wrapper.carousel({
						//pagingDiv : 'slider-nav',
						//pagingCssName : 'slider-nav_link',
						//pagingCssNameSelected : 'slider-nav_link m-active'
					});*/
					
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
			
			/*self.$el.html(self.template({
				slides : Paperapp.collections.carouselDocuments.toJSON()
			}));*/
		}
		
    });

})();
