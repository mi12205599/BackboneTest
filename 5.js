

(function() {
	// 尝试读取或者保存实例到服务器的时候 调用，默认使用jQuery。ajax 发起restful json 请求，这里重写一遍使用一个不同的持久化策略，比如websockets，xml 或者local storage
	//  可以作用在collection，model粒度
	Backbone.sync = function(method,model,success,error) {
		// success();
		// 这里我们以后可以应用 local storage持久化
	};

	var Item = Backbone.Model.extend({
		// 为属性设置默认值
		defaults:{
			part1:'hello',
			part2:'world'
		}
	});	

	var ItemList = Backbone.Collection.extend({
		model:Item,
		// backbone 使用restful 预配置同步持久化策略
		url:'/book'
	});

	// 现在新特性固化在 每个Item里面，没有必要修改ListView,Subview
	var ItemView = Backbone.View.extend({
		tageName:'li',
		// 这个地方定义最初级 DOM事件 
		events:{
			'click span.swap':'swap',
			'click span.delete':'delete'
		},
		initialize:function() {
			// 这个地方定义Backbone 框架 View和model 事件
			// bindALl 方法参数指定的函数必须存在
			_.bindAll(this,'render','swap','unrender');
			// 所有在collection 中 model上触发的事件都会在集合上触发
			this.model.bind('change',this.render);
			this.model.bind('remove',this.unrender);
		},
		render:function() {
			$(this.el).html("<span>"+ this.model.get('part1') + " " + this.model.get('part2') + "</span>" + 
					"<span class='swap'> swap </span>" + "<span class='delete'> delete </span>" 
				);
			return this;
		},
		unrender:function() {
			$(this.el).remove();
		},
		swap:function() {
			//var item  = this.model;
			//var temp = item.get('part1');
			//item.set('part1', item.get('part2'));
			// item.set('part2', temp);
			// 下面这样写没有风险，一个A对象属性拷贝另一个B对象属性，修改该A对象，不会影响原B对象，等待在console 验证, 验证通过
			this.model.set({
				part1: this.model.get('part2'),
				part2: this.model.get('part1'),
			});
			// 之后会触发view.model的 change事件，重新渲染
		},
		delete:function() {
			// 我们不仅要移除 DOM，还要通知服务器移除对象(http delete method )，之后从collection中移除 model，这样内存才不会泄露
			// 触发sync事件，开始持久化进程，Backbone.sync发起delete方法，完成持久化策略之后，执行我们这里预设的回调函数success
			this.model.destroy({
				success:function() {
					console.log('delete  success.');
				}
			});
			// 之后会触发view.model的 remove事件，再次渲染
		}
	});

	var ListView = Backbone.View.extend({
		el:'body',
		events:{
			'click button#add':'addItem'
		},
		initialize:function(){
			_.bindAll(this,'render','addItem','appendItem');
			//  集合实例化
			this.collection = new ItemList();
			this.collection.add({ 
				part1:'hello 0', 
				part2:'world 0'
				}
			);
			this.count = 1;
			// 这个地方有几个知识点：
			//  Backbone Events 绑定事件用on，也有别名叫 bind，
			//  The backbone object itself mixed in events, backbone对象本身继承了Events对象
			//  collections also proxy throught all of the events that occurs to models within them，集合代理了其内部model 上引起的所有事件
			this.collection.on('add',this.appendItem);	// 集合是一组实例，当集合内部任意实例修改的时候 可以触发 集合绑定的change事件,一般监听add 和remove 事件
			this.render();
		},
		render:function(){
			$(this.el).append("<button id ='add'>"+ "try to click me ." +"</button>");
			$(this.el).append("<ul></ul>");
			var that = this;
			_.each(this.collection.models,function(item) {
				// $('ul').append("<span>"+ item.get('part1') +" " +  item.get('part2') +"</span>");   这个don没有通过backbone ItemView 管理
				that.appendItem(item);
			});
		},
		addItem:function(){ 
			var  tempItem = new Item();		// 默认值
			tempItem.set({
				'part1': tempItem.get('part1') + this.count,
				'part2': tempItem.get('part2') + this.count
			});
			// 不能直接添加 只包含两个默认属性的对象，而要添加Item对象
			this.collection.add(tempItem);
			this.count +=1;
		},
		// 将模型的渲染交给 独立的 模型视图
		appendItem:function(item) {
			var itemView = new ItemView({
				model: item
			});
		    $('ul').append(itemView.render().el);
		}
	});
	
	var listView = new ListView();
})(jQuery)