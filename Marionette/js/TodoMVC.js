/*global Backbone, TodoMVC:true, $ */
var TodoMVC = TodoMVC || {};

// 页面加载完毕，启动App，整个js项目的命名空间是 TodoMVC
$(function () {
	'use strict';

	// After we initialize the app, we want to kick off the router
	// and controller, which will handle initializing our Views，  初始化app之后，我们需要启动 router和controller，这些内容初始化我们的视图
	TodoMVC.App.on('start', function () {
		var controller = new TodoMVC.Controller();
		controller.router = new TodoMVC.Router({
			controller: controller
		});

		controller.start();
		Backbone.history.start();
	});

	// start the TodoMVC app (defined in js/TodoMVC.js)
	TodoMVC.App.start();
});
