// events 的用法

(function($) {
	// 我们截取的最小化 View功能
	var ListView = Backbone.View.extend({
		el:$('body'),
		// events 是作为object对象
		events:{
			'click button#add':'addItem'			// 为add按钮注册click事件监听器
		},
		initialize: function() {
			_.bindAll(this,'render');		// 将使用this-view作为执行上下文对象的 函数放在此处
			this.render();
			this.count = 1;
		},

		render:function() {
			$(this.el).append("<button id='add'>click to add a item!</button>");
			$(this.el).append("<ul></ul>");
		},
		addItem:function() {
			$('ul').append("<li>hello world!"+ this.count + " </li>");
			this.count +=1;
		},
	});
	
	// 实例化view
	var listView = new ListView();

})(jQuery);