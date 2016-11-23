var  TodoMVC = TodoMVC || {};

(function() {
	'use strict';

	// Todo model
	TodoMVC.Todo = Backbone.Model.extend({
	 	defaults: {
	 		title:'',
	 		completed :false,
	 		created:0
	 	},

	 	initialize:function(){
	 		if( this.isNew()) {		//isNew 是原生方法
	 			this.set('created',Date.now);
	 		}
	 	},
	 	
	 	toggle:function() {
	 		return this.set('completed',!this.isCompleted() );
	 	},

	 	isCompleted:function() {
	 		this.get('completed');
	 	},

	 	matchesFilter: function (filter) {
			if (filter === 'all') {
				return true;
			}

			if (filter === 'active') {
				return !this.isCompleted();
			}
			return this.isCompleted();
		}
	 });

	 // Todo collection
	TodoMVC.TodoList = Backbone.Collection.extend({
	 	model: TodoMVC.Todo,
		
		localStorage: new Backbone.LocalStorage('todos-backbone-marionette'),

		comparator:'created',

		getCompleted:function() {
			return this.filter(this._isCompleted );
		},

		getActive:function() {
			return  this.reject(this._isCompleted);
		},

		_isCompleted:function(todo) {
			return todo.isCompleted();
		}

	 });

})();
