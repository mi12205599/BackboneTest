// collection的用法

(function(){
var Item  = Backbone.Model.extend({
	// defaults散列或者函数 用于为模型指定默认属性
	defaults:{
		part1:'hello',
		part2:'world'
	}
});

var List = Backbone.Collection.extend({
	model:Item				// 重写model属性指定这个collection包含的model class
});

var ListView =Backbone.View.extend({
	el:$('body'),

	events: {
		'click button#add':'addItem'						// 绑定ui事件
	},

	initialize:function() {
		_.bindAll(this,'render','addItem','appendItem');		// 所有使用this作为执行上下文的函数放在这里，所以这里存在绑定和UI事件
		this.collection = new List();
		// 初始化添加一个model
		this.collection.add(new Item({
			 part1:'hello 0',
			 part2:'world 0'
		})
		);

		this.collection.bind('add',this.appendItem);		// 集合事件绑定器

		this.render();
		this.count=1;
	},

	render:function(){
		var self = this;
		$(this.el).append("<button id='add'>click to add a item!</button>");
		$(this.el).append("<ul></ul>");
		_(this.collection.models).each(function(item){   // 初始化集合是 empty
			self.appendItem(item);
		});
	},

	addItem:function() {
		var item  = new Item();		// 使用到defaults
		item.set({part2:item.get("part2")+this.count});
		this.collection.add(item);
		this.count +=1;
	},
	// 被collection add事件触发，处理视图更新
	appendItem:function(item){

		// backbone 属性取值是通过set/get,
		$('ul').append("<li>"+ item.get('part1') + " " + item.get('part2') +"</li>");
	},
});

var  listView = new ListView();

})(jQuery);
