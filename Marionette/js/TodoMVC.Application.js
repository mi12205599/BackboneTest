
// TodoMVC  作为命名空间，window.TodoMVC
var  TodoMVC = TodoMVC  || {};

// js项目app
(function() {
	"use strict";

	var  TodoApp = Backbone.Marionette.Application.extend({
		setRootLayout:function() {
			this.root= new TodoMVC.RootLayout();
		},
	});

	TodoMVC.App = new TodoApp();

	TodoMVC.App.on('before:start', function () {
		TodoMVC.App.setRootLayout();
	});
	
})();