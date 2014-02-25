window.APPCONF = {
	BAAS_APP_CODE : '1234567890',
	URLS : {
		// BAASBOX BACKEND CALLS
		SIGNUP : 'http://baasbox-cog4.rhcloud.com/user',
		LOGIN : 'http://baasbox-cog4.rhcloud.com/login',
		CHANGEPASS : 'http://baasbox-cog4.rhcloud.com/me/password',
		LOGOUT : 'http://baasbox-cog4.rhcloud.com/logout',
		RESETPASS: 'http://baasbox-cog4.rhcloud.com/user/:username/password/reset',
		
		// ELASTIC SEARCH CALLS
		DOCUMENTS : 'http://search2.cogfor.com:9200/hhs/_search'
	}
}