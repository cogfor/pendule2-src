pendule2-src
============

This is the source for the Pendulum app.
App is managed with grunt and bower, to build app simply run "grunt build" in project root (assuming you have it installed). 
App will be compiled into ./dist folder, where another repo can be setup and then used on Phonegap build service.

App dependencies:
- Intel App Framework (bower install intel-appframework)
- Backbone and Underscore
- Handlebars

More Grunt and Yeoman commands:
- grunt handlebars - compiles all templates, this command should be run after each template change (commented out from grunt build, but can be restored)
- yo backbone:view/model/collection "name" - creates new view/model/collection and automatically wires them into index.html file