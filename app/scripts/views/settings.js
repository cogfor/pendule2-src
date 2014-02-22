/*global Paperapp, Backbone, JST*/

Paperapp.Views = Paperapp.Views || {};

(function () {
    'use strict';

    Paperapp.Views.SettingsView = Backbone.View.extend({
	
        template: JST['app/scripts/templates/settings.hbs'],
	
		el : '#settings',
		
		initialize : function(){
			//this.render();
		},
		
		render : function(){
			this.$el.html(this.template({
				loggedIn : Paperapp.models.userModel.get('session') ? true : false
			}));
		}
    });

})();
