/*global Paperapp, Backbone*/

Paperapp.Collections = Paperapp.Collections || {};

(function () {

    Paperapp.Collections.DocumentsCollection = Backbone.Collection.extend({

		model: Paperapp.Models.DocumentModel,
		
		url : APPCONF.URLS.DOCUMENTS,
		
		initialize : function(params){
			this.source = params.source;
			this.url = this.url + '?source=' + JSON.stringify(params.source);
			this.fetch({ reset : true });
		},
		
		parse : function(data){
			return data.hits.hits;
		}
    });
	
})();