
TodoMVC.module('TodoList',function(TodoList,App,Backbone,Marionette,$,_) {

	// hander router  to show the active  vs completed todo items
	TodoList.Router = Marionette.AppRouter.extend({
		appRouter:{
			'*filter':'filterItems'
		}
	});

	//  Control the workflow and logic that  exists  at the application level
	TodoList.Controller = function() {
		this.todoList = new App.Todos.TodoList();
	};

	_.extend(TodoList.Controller.prototype,{
		start:function() {
			this.showHeader(this.todoList);
			this.showFooter(this.todoList);
			this.showTodoList(this.todoList);

			App.bindTo(this.todoList,'reset add remove',this.toggleFooter,this);
			this.todoList.fetch();
		},

		showHeader:function(TodoList) {
			var header = new App.LayOut.Header({
				collection:todoList
			});

			App.header.show(header);
		},

		showFooter: function(todoList) {
			var  footer =  new App.LayOut.Footer({
				collection:todoList
			});
			App.footer.show(footer);
		},

		showTodoList:function(TodoList) {
			App.main.show( new TodoList.Views.ListView({
				collection:todoList
			}));
		},

		toggleFooter:function() {
			App.footer.$el.toggle(this.todoList.length);
		},

		filterItems:function(filter) {
			App.vent.trigger('todoList:filter',filter.trim() || '' );
		}
	});

	// Get the TodoList  up and running  by initializing the mediator
	// when the app is started, pull in all of the existing todo items and display them
	TodoList.addInitializer(function() {
		var controller =  new TodoList.Controller();
		new TodoList.Router({
			controller:controller
		});

		controller.start();

	});
});