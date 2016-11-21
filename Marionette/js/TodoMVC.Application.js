
// TodoMVC  作为命名空间，window.TodoMVC
var  TodoMVC = TodoMVC  || {};

(function() {
	"use strict";

	var  TodoApp = Backbone.Marionette.Application.extend({
		setRootLayout:function() {
			root: new TodoMVC.RootLayout();
		},
	});

	TodoMVC.App = new TodoApp();

	TodoMVC.App.on('before:start', function () {
		TodoMVC.App.setRootLayout();
	});
	
})();