

(function($){

	var ViewAPP = Backbone.View.extend({
		el:$('body'),
		initialize:function(option){
			// 以下,集合创建的时候，将会调用Collection的initialize函数
			this.friends = new Friends({view:this });
		},
		// 采用jQuery的on函数来为视图内的DOM事件提供函数回调声明
		events: {
			'click #add—Friend':'showPrompt',
		},
		showPrompt:function(){
			var username = $('input[name=username]').val() || "";
			if(!username){
				alert('please input the username. ');
				return;
			}
			//var model = new Friend({
			//	name : username
			//});
			// 向集合中增加一个模型[或者模型数组]，触发add事件
			this.friends.add({ name: username});
			//this.friends.add(model);
			$('input[name=username]').val("") ;
		},
		addFriendList: function(model) {
			$('#friends_list').append("<li>" + model.get('name') +"</li>");
		}
	});

	// 要创建自己的Model类，可以扩展自己的Backnobe.Model类 并提供实例property属性，以及可选的注册到构造函数的classProperty类属性
	Friend = Backbone.Model.extend({
		name : null
	});

	// 通过扩展Backbone.Collection 创建一个Collection类，实例属性properties和类属性classProperties会被直接注册到集合的构造参数中 
	Friends = Backbone.Collection.extend({
		model:Friend,
		// 如果定义了initialize函数，会在集合创建时候被调用
		initialize :function(options){
			// 当Collection有变动时候，则呼叫View里面的addFriendList 函数
			this.bind('add',options.view.addFriendList);
		}
	});

	var app = new ViewAPP();

})(jQuery);


<!--  总结，backbone.js 在View里面 收集UI操作，初始化View的时候，产生Model的Collection，收集好UI操作，对Model操作，将会触发Collection上面绑定的回调函数-->