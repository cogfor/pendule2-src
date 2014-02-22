/*global Paperapp, Backbone, JST*/

Paperapp.Views = Paperapp.Views || {};

(function () {
    //'use strict';

    Paperapp.Views.AppView = Backbone.View.extend({
		el : 'body',
        //template: JST['app/scripts/templates/app.hbs'],
		
		events : {
			'submit #signup-form' : 'signup',
			'submit #login-form' : 'login',
			'click #user-logout' : 'logout',
			'submit #changepass-form' : 'changepass',
			'submit #resetpass-form' : 'resetpass'
		},
		
		initialize : function(){
			var self = this;
			
			_.bindAll(this, 'signup', 'login', 'logout', 'changepass', 'resetpass');
			
			// starting user model
			Paperapp.models.userModel = new Paperapp.Models.UserModel();
			
			// init settings bar
			Paperapp.views.settingsView = new Paperapp.Views.SettingsView;
			
			// We override the back button text to always say "Back"
			$.ui.backButtonText = "Back";
			
			// silently login on app start
			if (localStorage.getItem('_username') && localStorage.getItem('_password')) {
				Paperapp.models.userModel.login({ username : localStorage.getItem('_username'), password : localStorage.getItem('_password') }, true, function(){
					window.setTimeout(function(){
						$.ui.launch();
					}, 100);
				});
			} else {
				Paperapp.views.settingsView.render();
				window.setTimeout(function(){
					$.ui.launch();
				}, 100);
			}
			
			// This function will get executed when $.ui.launch has completed
			$.ui.ready(function () {
				console.log('app framework launched');
				$.ui.removeFooterMenu();
			});
			
			// wire events
			// silently login with same credentials right after signup
			Paperapp.models.userModel.on('signupComplete', function(signupData){
				Paperapp.models.userModel.login({ username : signupData.username, password : signupData.password }, true);
			});
			
			/* 
			 * on login update user name on main page
			 * and save username and password in local storage to use it on later runs
			 * and re-render the settings nav
			 */
			Paperapp.models.userModel.on('loginComplete', function(loginData){
				self.updateUserName();
				
				localStorage.setItem('_username', loginData.username);
				localStorage.setItem('_password', loginData.password);
				
				Paperapp.views.settingsView.render();
			});
			
			// user logged out
			Paperapp.models.userModel.on('loggedOut', function(loginData){
				localStorage.removeItem('_username');
				localStorage.removeItem('_password');
				
				self.updateUserName();
				Paperapp.views.settingsView.render();
			});
		},
		
		signup : function(e){
			e.preventDefault();
			var form = $(e.currentTarget);
			Paperapp.models.userModel.signup(helpers.serializeFormToArray(form));
		},
		
		login : function(e){
			e.preventDefault();
			var form = $(e.currentTarget);
			Paperapp.models.userModel.login(helpers.serializeFormToArray(form));
		},
		
		logout : function(e){
			e.preventDefault();
			Paperapp.models.userModel.logout();
		},
		
		changepass : function(e){
			e.preventDefault();
			var form = $(e.currentTarget);
			Paperapp.models.userModel.changepass(helpers.serializeFormToArray(form));
		},
		
		resetpass : function(e){
			e.preventDefault();
			var form = $(e.currentTarget);
			Paperapp.models.userModel.resetpass(helpers.serializeFormToArray(form));
		},
		
		updateUserName : function(){
			$('#main .username').text(Paperapp.models.userModel.get('username'));
		},
		
		popup : function(title, message, goHome){
			$.ui.popup({
				title : title,
				message : message,
				doneText : "ok",
				cancelText : '',
				doneCallback: function(){
					if (goHome) {
						$.ui.loadContent('#main');
					}
				}
			});
		}
    });

})();