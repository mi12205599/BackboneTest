// 将模型的渲染 交给一个特定的视图

(function($){
	var Item  = Backbone.Model.extend({
		defaults: {
			part1:'hello',
			part2:'world'
		}
	});	

	var ItemView = Backbone.View.extend({
		tagName:'li',
		initialize:function(){
			_.bindAll(this,'render');
		},	
		render :function() {
			// this.el  是view上的DOM元素，能够从dom selector string 或者element中解析，否则会从 视图的tagName，id和attributes 中创建
			$(this.el).html("<span>"+ this.model.get('part1') + " " + this.model.get('part2') + "</span>" );
			return this;
		},
	});

	var List = Backbone.Collection.extend({
		model:Item
	});
 	
	var ListView = Backbone.View.extend({
		el:'body',
		events: {
			'click button#add':'addItem'
		},
		initialize:function() {
			_.bindAll(this,'addItem','appendItem');
			this.count =1;
			this.collection = new List({
				part1:'hello 0',
				part2:'world 0'
			});
			// 集合是模型的有序组合，可以绑定 add，remove,change 等事件，所有在collection 模型中触发的事件都会在collection上触发
			this.collection.bind('add',this.appendItem);		// 集合事件绑定器
			this.render();
		},
		render:function() {
			
			// this.el 能从dom selector string 或者Element中解析
			$(this.el).append("<button id='add'>  try to click me !</button>");
			$(this.el).append("<ul></ul>");
			// 以下只在初次渲染的时候有用
			var  that = this;
			_(this.collection.models).each(function(item) {
				that.appendItem(item);
			});
		},
		addItem:function(){
			// 使用默认值
			var item  = new Item();
			item.set('part1',item.get('part1') + this.count );
			item.set('part2',item.get('part2') + this.count );
			this.collection.add(item);
			this.count +=1;
		},
		// appendItem 不再负责呈现个别的Item，现在委托给每个Item的 ItemView 渲染。
		appendItem:function(item) {
			// $('ul').append("<li>"+ item.get('part1') +" "+ item.get('part2') +"</li>");
			var  itemView = new ItemView({
				model:item
			});
			// jquery append api 可以添加 html string，jquery object，或者dom
			$('ul').append(itemView.render().el);
		}

	});
	var listView = new ListView();

})(jQuery)