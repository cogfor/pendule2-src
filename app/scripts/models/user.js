/*global Paperapp, Backbone*/

Paperapp.Models = Paperapp.Models || {};

(function () {
    'use strict';

    Paperapp.Models.UserModel = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
