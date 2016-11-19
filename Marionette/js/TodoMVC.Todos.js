
TodoMVC.modele('Todos',function(Todos,App,Backbone,Marionette,$,_) {
	 var localStorageKey ='todos-backbone-marionettejs';

	 Todos.Todo =Backbone.Model.etend({
	 	localStorage: new  Backbone.localStorage('localStorageKey'),

	 	default: {
	 		title:'',
	 		completed:false,
	 		created:0
	 	},

	 	initialize:function(){
	 		if( this.isNew ) {
	 			this.set('created',Date.now);
	 		}
	 	},
	 	
	 	toggle:function() {
	 		return this.set('completed',!this.isCompleted() );
	 	},

	 	isCompleted:function() {
	 		this.get('completed');
	 	},
	 });

	 Todos.TodoList= Backbone.Collection.extend({
	 	model: Todos.Todo,
		localStorage:new Backbone.localStorage('localStorageKey'),

		getCompleted:function() {
			return this.filter(this._isCompleted );
		},

		_isCompleted:function() {
			return this.isCompleted();
		},

		getActive:function() {
			return  this.reject(this._isCompleted);
		},

		comparator:function(todo) {
			return todo.get('created');
		},

	 });
});