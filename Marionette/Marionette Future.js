
var  TodoMvc = new Backbone.Marionette.Application();

TodoMvc.addRegions({
	header: '#header',
	main:'#main',
	footer:'#footer'
});

TodoMvc.on('start',function() {
	Backbone.history.start();
});
