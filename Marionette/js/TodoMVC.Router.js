
var  TodoMVC = TodoMVC || {};

(function() {
	"use strict";

	var filterChannel = Backbone.Radio.channel('filter');

	// Tdodo Router
	TodoMVC.Router = Marionette.AppRouter.extend({
		appRouters:{
			'*filter':'filterItems'
		}
	});

	//  Todo Controller
	//  Control the workflow and logic that  exists  at the application level
	TodoMVC.Controller = Backbone.Marionette.Object.extend({
		initialize:function() {
			this.todoList = new TodoMVC.TodoList();
		},

		start:function() {
			this.showHeader(this.todoList);
			this.showFooter(this.todoList);
			this.showTodoList(this.todoList);

			this.todoList.on('all',this.updateHiddenElements,this);
			this.todoList.fetch();
		},

		showHeader:function(todoList) {
			var header = new TodoMVC.HeaderLayout({
				collection:todoList
			});

			TodoMVC.App.root.showChildView('header',header);
		},

		showFooter: function(todoList) {
			var  footer =  new TodoMVC.FooterLayout({
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
})();
