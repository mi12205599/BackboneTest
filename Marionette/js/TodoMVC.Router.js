
var  TodoMVC = TodoMVC || {};

(function() {
	"use strict";

	var filterChannel = Backbone.Radio.channel('filter');

	TodoMVC.Router = Marionette.AppRouter.extend({
		appRouter:{
			'*filter':'filterItems'
		}
	});

	//  Control the workflow and logic that  exists  at the application level
	TodoMVC.Controller = function() {
		this.todoList = new TodoMVC.TodoList();
	};

	_.extend(TodoMVC.Controller.prototype,{
		start:function() {
			this.showHeader(this.todoList);
			this.showFooter(this.todoList);
			this.showTodoList(this.todoList);

			this.todoList.on('all',updateHiddenElements,this);
			this.todoList.fetch();
		},

		showHeader:function(todoList) {
			var header = new TodoMVC.HeaderLayOut({
				collection:todoList
			});

			TodoMVC.App.root.showChildView('header',header);
		},

		showFooter: function(todoList) {
			var  footer =  new TodoMVC.FooterLayOut({
				collection:todoList
			});
			TodoMVC.App.root.showChildView('footer',footer);
		},

		showTodoList:function(todoList) {
			TodoMVC.App.root.showChildView('main', new TodoMVC.ListView({
				collection:todoList
			}));
		},

		updateHiddenElements:function() {
			$("#main","#footer").toggle( !! this.todoList.length);  //  ???
		},

		filterItems:function(filter) {
			var  newFilter = filter && filter.trim() || 'all';
			filterChannel.request('filterState').set('filter',newFilter);
		}
	});

	// Get the TodoMVC  up and running  by initializing the mediator
	// when the app is started, pull in all of the existing todo items and display them
	TodoMVC.addInitializer(function() {
		var controller =  new TodoMVC.Controller();
		new TodoMVC.Router({
			controller:controller
		});

		controller.start();

	});

};
