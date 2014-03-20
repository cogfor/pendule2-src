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
					var firstSlide = self.$el.find('.carousel_slide').eq(0),
						slideWidth = firstSlide.get().offsetWidth,
						margin = parseInt(firstSlide.css('marginRight'), 10),
						//totalWidth = self.$el.find('.carousel_slide').length * (slideWidth + margin);
						totalWidth = self.el.offsetWidth;
					
					self.$el.find('.carousel_slide').css({
						width : totalWidth
						//marginRight : margin
					});
					
					self.$el.addClass('m-visible');
					
					self.$el.css('width', totalWidth);
					
					//if (device && device.platform && device.platform === 'Android') {
					setTimeout(function(){
						
						//$('#carousel, ,carousel_wrapper').unbind();
						
						/*myScroll = new IScroll('#carousel', {
							eventPassthrough: false,
							scrollX: true, 
							scrollY: false
						});*/
								
						//$.ui.addDivAndScroll($('#carousel').get());
						
						var mySwiper = new Swiper('#' + self.el.id, {
							//mode:'horizontal',
							freeMode: true,
							freeModeFluid: true
						}); 
						
					}, 100);
						
				}, 0);
				
			});
		},
		
		render : function(){
			var self = this,
				wrapperTmpl = $('<div class="carousel_slide swiper-slide" />'),
				wrapper;
				
			Paperapp.views.carouselSlides = [];
			
			Paperapp.collections.carouselDocuments.each(function(model, index){
				var view = new Paperapp.Views.CarouselSlideView({
					model : model,
					isLast : ((index + 1) % 3 == 0)
				});
				Paperapp.views.carouselSlides.push(view);
				
				if ((index + 1) % 3 == 1) {
					wrapper = wrapperTmpl.clone();
				}
				
				wrapper.append(view.$el);
				
				if ((index + 1) % 3 == 0 || (index + 1) == Paperapp.collections.carouselDocuments.length) {
					self.wrapper.append(wrapper);
				}
			});
		}
		
    });

})();
