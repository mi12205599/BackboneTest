
TodoMVC.module('Layout',function(LayOut,App,Backbone,$,_) {

	Layout.Header = Backbone.Marionette.ItemView.extend({
		template:'#template-header',

		ui:{
			input: '#new-todo'
		},

		//  鼠标离开或者按下空格键都触发 创建Todo
		events :{
			'keypress #new-todo':'onInputKeypress',
			'blur #new-todo':'onTodoBlur'
		},

		onTodoBlur:function(todo){
			var  todoText = this.ui.input.val().trim();
			this.createTodo(todoText);
		},

		createTodo: function(todoText){
			if(todoText ==="" )  return;
			this.collection.create('title',todoText);
			completeAdd();
		},

		completeAdd: function() {
			this.ui.input.val("");
		},

		onInputKeypress:function() {
			var ENTER_KEY =13;
			var todoText = this.ui.input.val().trim();
			if( ENTER_KEY === e.which && !todoText ) {
				this.createTodo(todoText);
			}
		},
	});

	// Layout  Footer View 
	Layout.Footer = Backbone.Marionette.ItemView.extend({
		template:'#template-footer',

		ui:{
			toodCount: '#todo-count .count',
			todoCountlabel:'#todo-count .label',
			clearCount:'#clear-completed .count',
			filters:'#filter a'
		},

		events:{
			'click #clear-completed':'onClearCompleted'
		},

		initialize:function() {
			 this.bind(App.vent,'todoList:filter',this.updateFilterSection,this);
			 this.bind(this.collection,'all',this.updateCount,this);
		},

 		onRender: function () {
 			this.updateCount();
 		},

 		updateCount:function(){
 			var activeCount = this.collection.getActive().length;
 			var completedCount = this.collection.getCompleted().length;
 			this.ui.todoCount.html( activeCount);

 			this.ui.todoCountlabel.html( activeCount === 1 ?'Item':'Items');

 			this.ui.clearCount.html( completedCount === 0?'':'('+ completedCount +')');

 		},
		onClearCompleted:function() {
			var  completed =  this.collection.getCompleted();
			completed.forEach(function destory(todo) {
				todo.destory();
			});
		},

		updateFilterSection : function(filter){
			this.ui.filter.removeClass('selected')
				.filter('[href="#' + filter+'"]')
				.addClass('selected');
		},
	});
});