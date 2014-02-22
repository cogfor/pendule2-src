/*global Paperapp, Backbone*/

Paperapp.Models = Paperapp.Models || {};

(function () {
    //'use strict';

    Paperapp.Models.UserModel = Backbone.Model.extend({

        initialize: function() {
			this.session;
        },

        defaults: {
			username : '',
			session : undefined
        },

        validate: function(attrs, options) {},

        parse: function(response, options)  {
            return response;
        },
		
		login: function(loginData, silently, callback){
			var self = this;
			
			$.ajax({
				url : APPCONF.URLS.LOGIN,
				type : 'POST',
				dataType : 'JSON',
				//contentType : 'application/json',
				beforeSend : function(xhr){
					xhr.setRequestHeader('X-BAASBOX-APPCODE', APPCONF.BAAS_APP_CODE);
					xhr.setRequestHeader("Authentication", "Basic " + Base64.encode(loginData.username + ':' + loginData.password));
				},
				data : $.extend(loginData, {
					appcode : APPCONF.BAAS_APP_CODE
				}),
				success : function(data){
					data = JSON.parse(data);
					
					self.set('session', data.data["X-BB-SESSION"]);
					self.set('username', loginData.username);
					self.set('password', loginData.password);
					
					if (! silently) {
						Paperapp.views.appView.popup('You have succesfully logged in', '', true);
					}
					
					self.trigger('loginComplete', loginData);
					if (callback) {
						callback();
					}
				},
				error : function(data){
					//console.log(data);
					if (callback) {
						callback();
					}
					Paperapp.views.appView.popup('Login error', '', false);
				}
			});
		},
		
		// performs signup on BaasBox platform
		signup: function(signupData){
			var self = this;
			
			$.ajax({
				url : APPCONF.URLS.SIGNUP,
				type : 'POST',
				dataType : 'JSON',
				contentType : 'application/json',
				beforeSend : function(xhr){
					xhr.setRequestHeader('X-BAASBOX-APPCODE', APPCONF.BAAS_APP_CODE);
					xhr.setRequestHeader("Authentication", "Basic " + Base64.encode(signupData.username + ':' + signupData.password));
				},
				
				data : JSON.stringify($.extend(signupData, {
					appcode : APPCONF.BAAS_APP_CODE
				})),
				
				success : function(data){
					//console.log(data);
					Paperapp.views.appView.popup('Signup successful', '', true);
					self.trigger('signupComplete', signupData);
				},
				
				error : function(xhr, type){
					var data;
					if (xhr.responseText.length) {
						//data = JSON.parse(xhr.responseText);
						Paperapp.views.appView.popup('Signup error', xhr.responseText, false);
					} else {
						Paperapp.views.appView.popup('Signup error', 'response is empty', false);
					}
					
					//console.log(data);
				}
			});
		},
		
		logout : function(){
			var self = this;
			
			$.ajax({
				url : APPCONF.URLS.LOGOUT,
				type : 'POST',
				//dataType : 'JSON',
				//contentType : 'application/json',
				beforeSend : function(xhr){
					xhr.setRequestHeader('X-BAASBOX-APPCODE', APPCONF.BAAS_APP_CODE);
					xhr.setRequestHeader('X-BB-SESSION', self.get('session'));
					//xhr.setRequestHeader("Authentication", "Basic " + Base64.encode(loginData.username + ':' + loginData.password));
				},
				/*data : $.extend(loginData, {
					appcode : APPCONF.BAAS_APP_CODE
				}),*/
				success : function(data){
					self.set('session', '');
					self.set('username', '');
					self.set('password', '');
					
					self.trigger('loggedOut', []);
					
					Paperapp.views.appView.popup('You have been logged out', '', true);
				},
				error : function(data){}
			});
		},
		
		changepass : function(changepassData){
			var self = this;
			
			$.ajax({
				url : APPCONF.URLS.CHANGEPASS,
				type : 'POST',
				dataType : 'JSON',
				contentType : 'application/json',
				beforeSend : function(xhr){
					xhr.setRequestHeader('X-BAASBOX-APPCODE', APPCONF.BAAS_APP_CODE);
					xhr.setRequestHeader('X-BB-SESSION', self.get('session'));
					xhr.setRequestHeader("Authentication", "Basic " + Base64.encode(self.get('username') + ':' + self.get('password')));
				},
				
				data : JSON.stringify(changepassData),
				
				success : function(){
					Paperapp.views.appView.popup('Your password changed', '', true);
					
					self.trigger('passwordUpdated', []);
				},
				
				error : function(xhr, type){
					Paperapp.views.appView.popup('Password change error', xhr.errorCode, false);
				}
			});
		},
		
		resetpass : function(resetpassData){
			var self = this,
				url = APPCONF.URLS.RESETPASS.replace(':username', resetpassData.username);
				
			$.ajax({
				url : url,
				type : 'GET',
				//dataType : 'JSON',
				//contentType : 'application/json',
				beforeSend : function(xhr){
					xhr.setRequestHeader('X-BAASBOX-APPCODE', APPCONF.BAAS_APP_CODE);
				},
				success : function(){
					Paperapp.views.appView.popup('Password reset request send, check your email.', '', true);
					
				},
				error : function(xhr){
					Paperapp.views.appView.popup('Password reset request error', xhr.responseText, false);
				}
			})
		}
    });

})();
