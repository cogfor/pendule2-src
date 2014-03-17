/*global Paperapp, Backbone, JST*/

Paperapp.Views = Paperapp.Views || {};

(function () {

    Paperapp.Views.SearchView = Backbone.View.extend({
		
		el : '#search-page',
		
        template: JST['app/scripts/templates/search.hbs'],
		
		events : {},
		
		initialize : function(options){
			var self = this;
			
			self.query = options.query;
			
			Paperapp.collections.searchDocuments = new Paperapp.Collections.DocumentsCollection({
				source : {
					"from" : 0,
					"size" : 10,
					"query" : {
						"query_string" : {
							"fields" : [
								"abstract^2",
								"title^5",
								"name",
								"topics^10"
							],
							"query": self.query,
							"use_dis_max" : true
						}
					}
				}
			});
			
			Paperapp.collections.searchDocuments.unbind('reset');
			Paperapp.collections.searchDocuments.bind('reset', function(){
				self.render();
				Paperapp.views.appView.settingsMenuHide();
				$.ui.loadContent('#search-page');
			});
		},
		
		render : function(){
			this.$el.html(this.template({
				results : Paperapp.collections.searchDocuments.toJSON()
			}));
		}
		
    });

})();
